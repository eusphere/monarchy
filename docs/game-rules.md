# Game rules and combat

This document transcribes and structures the rules notes from the [Monarchy: Game Design](https://docs.google.com/document/d/1jtw84yX44Z7j0a4KkBdhkfYPcdcicf-B26QvLXJsqjM/edit). For implementation details, see [`server/src/game`](../server/src/game), especially [`Game.scala`](../server/src/game/Game.scala), [`Turn.scala`](../server/src/game/Turn.scala), and [`PieceConf.scala`](../server/src/game/PieceConf.scala).

## Turns

The current design supports two-player games. A player is selected randomly to go first, then turns alternate. A player can receive control without having a legal action, for example when all of that player's units are waiting.

A turn has these phases:

1. Move.
2. Attack.
3. Turning.
4. End.

Move and attack may be performed in either order, and each is optional. Turning is always the final unit action. Once a unit has explicitly turned to face a direction, it cannot move or attack during that turn. A player may end the turn at any time. At most one unit performs actions during a turn, so the unit that moves, attacks, and turns must be the same unit.

The server also exposes an initial selection phase before the action phases. The authoritative phase rules are implemented by [`Turn.scala`](../server/src/game/Turn.scala) and [`Phase.scala`](../server/src/game/Phase.scala); the transition tests are in [`TurnSpec.scala`](../server/src/game/test/TurnSpec.scala) and [`GameSpec.scala`](../server/src/game/test/GameSpec.scala).

## Movement

Each unit has a movement range. Units may normally move through friendly units but not enemy units, subject to unit-specific behavior. Reachability is calculated by breadth-first search in [`Movement.scala`](../server/src/game/Movement.scala), using board occupancy from [`Board.scala`](../server/src/game/Board.scala). Movement behavior is covered by [`MovementSpec.scala`](../server/src/game/test/MovementSpec.scala).

Teleporting units are not governed by normal pathing. They may move to any empty tile within their movement range. The implementation models teleportation as `PieceConf.teleports`, which is consumed by [`Movement.scala`](../server/src/game/Movement.scala).

## Attacks and effects

Attacking is the primary way units damage one another. Friendly fire is possible. Unit actions can also produce non-damaging effects such as healing, paralysis, or creating plants. The effect types are defined in [`Effect.scala`](../server/src/game/Effect.scala), while unit-specific attack patterns and effect areas live in [`PieceConf.scala`](../server/src/game/PieceConf.scala).

### Blockable attacks

Blockable attacks are the common physical-style attack. They generally deal less damage and have shorter recovery times, and their result is modified by the defender's blocking probability and facing direction. Damage and blocking are resolved in [`Game.scala`](../server/src/game/Game.scala); focused regression cases are in [`GameSpec.scala`](../server/src/game/test/GameSpec.scala).

### Unblockable attacks

Unblockable attacks ignore blocking. The design notes describe them as reliably hitting for now, often being more magical, having longer recovery, and dealing more damage. The server marks these attacks with `blockable = false` in [`PieceConf.scala`](../server/src/game/PieceConf.scala); the attack resolution path is in [`Game.scala`](../server/src/game/Game.scala).

### Line of sight

Ranged blockable attacks can require a clear line of sight to the target. Because the board is tiled, the server defines which tiles interfere with a line between the origin and target. The relevant configuration is `attackAlongLos` in [`PieceConf.scala`](../server/src/game/PieceConf.scala); tile trajectories and facing snaps are in [`EffectGeometry.scala`](../server/src/game/EffectGeometry.scala), and line-of-sight adjustment is applied by [`EffectHandler.scala`](../server/src/game/EffectHandler.scala). The geometry has dedicated tests in [`EffectGeometrySpec.scala`](../server/src/game/test/EffectGeometrySpec.scala).

### Area of effect

Some attacks affect multiple tiles. These are technically ranged effects. The design notes associate larger area-of-effect damage with mages and describe it as powerful but expensive to recover from. The reusable area implementation is [`Effect.scala`](../server/src/game/Effect.scala), with attack patterns represented by [`AttackPatterns.scala`](../server/src/game/AttackPatterns.scala) and tile deltas by [`Deltas.scala`](../server/src/game/Deltas.scala).

### Armor

Armor is a percentage reduction to incoming damage. The design notes state that armor applies to both blockable and unblockable damage, except that it does not affect healing, paralysis, or other future state-based effects. The current damage calculation and separate healing/paralysis branches are in [`Game.scala`](../server/src/game/Game.scala).

## Blocking and facing

Blocking is the probability that a unit blocks a blockable attack from the front. The implementation computes the directional snap and probabilistic result in [`Game.scala`](../server/src/game/Game.scala), with vector geometry in [`Vec.scala`](../server/src/game/Vec.scala) and [`EffectGeometry.scala`](../server/src/game/EffectGeometry.scala). For example, with an 80% blocking rate:

- A frontal arrow has a 20% chance to hit.
- A side attack has a `1 - (0.8 / 2) = 0.6` chance to hit.
- An attack from behind has a 100% chance to hit.

The design notes define the frontal area as the 45-degree cone in front of the unit; analogous logic defines the sides and rear. Facing is selected during the turning phase and affects blocking from the next relevant direction. Direction selection and attacker/defender facing updates are handled in [`Game.scala`](../server/src/game/Game.scala).

## End phase and waits

The end phase requires no player action. It maintains board state in [`Game.scala`](../server/src/game/Game.scala):

- Units that acted receive their wait time.
- A unit that moved receives `floor(maxWait / 2)` wait.
- A unit that attacked receives `ceil(maxWait / 2)` wait.
- A unit that both moved and attacked receives the sum of those waits.
- Units controlled by the current player have their waits decremented by one.
- Blocking modifiers decay by multiplying them by `0.9`.

The wait calculations are implemented as `moveWait` and `attackWait` in [`PieceConf.scala`](../server/src/game/PieceConf.scala). Piece readiness, paralysis, and current blocking are represented by [`Piece.scala`](../server/src/game/Piece.scala). End-turn behavior is tested in [`GameSpec.scala`](../server/src/game/test/GameSpec.scala).

## Board and game lifecycle

The standard board is an 11-by-11 tapered board defined by [`Board.scala`](../server/src/game/Board.scala). Initial formations, player rotation, first-turn waits, and deterministic seeding are assembled by [`GameBuilder.scala`](../server/src/game/GameBuilder.scala). A game ends through forfeit, repeated passes, or board elimination in [`Completion.scala`](../server/src/game/Completion.scala), with coverage in [`CompletionSpec.scala`](../server/src/game/test/CompletionSpec.scala).
