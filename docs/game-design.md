# Game design

This document captures the game-design notes from the [Monarchy: Game Design](https://docs.google.com/document/d/1jtw84yX44Z7j0a4KkBdhkfYPcdcicf-B26QvLXJsqjM/edit) Google Doc. The game domain model is primarily under [`server/src/game`](../server/src/game/).

## High-level concept

Monarchy is a turn-based strategy game. Players summon a roster of spirits and compete by eliminating the opponent's spirits. The classical format has two players, with each player selecting and arranging ten spirits.

The current game state is represented by [`Game`](../server/src/game/Game.scala), players by [`Player`](../server/src/game/Player.scala), and board units by [`Piece`](../server/src/game/Piece.scala) plus [`PieceConf`](../server/src/game/PieceConf.scala). Completion is evaluated by [`Completion`](../server/src/game/Completion.scala).

The game is intended to combine tactical intelligence and wit with collection and customization. Winning games awards a mana-like currency that can be spent to build affinity with spirits. The strongest players are recognized by the Order and receive domains each season.

## Universe and lore

The world is enchanted, although most humans cannot perceive its magic. To ordinary people it resembles the modern world, with phones, buildings, paint, and concrete. Some people can perceive the spirits present in grass, water, and even manufactured materials; fewer can speak with those spirits and borrow their power.

Only a tiny number of people can wield magic in the conventional fantasy sense. The weaker mages can perform simple levitation, while the most powerful pursue mastery through summoning.

The Order recognizes magical masters and tasks them with safely passing good spirits between worlds while rejecting evil spirits. In exchange, masters receive political power and domains in both worlds. The Order also acts as the game's facilitator or game-master organization.

Spirits may manifest from the past, present, or future and may span different ages, cultures, and universes. Spirits are divided into classes. Members of a class share abilities, but can differ in form and flavor; for example, an archer and a sniper can fill the same class role while originating from different timelines. Flavor and power should remain believable within each class. In code, the class-like configuration is the set of [`PieceConf`](../server/src/game/PieceConf.scala) implementations.

## Assets and concept art

The source design notes refer to:

- Concept art from the first iteration.
- A royal bowman or archer archetype.
- The repository used to store assets.
- The project concept-art site: https://monarchy1.com/

The links above are references from the design document; the repository does not currently include a formal asset catalog.

## Player profile and rewards

Players should be able to customize their profile with items such as:

- Profile image.
- Banner.
- A short game-related message, such as “Blitz-lover”, “Playing since 2003”, or “Sweaty optimizer”.

In-game currency earned from matches can unlock messages, titles, profile images, unit skins, map skins, and win/loss fanfare.

## Planned expansion ideas

The original notes list the following possible expansions:

- Terrain with positive, negative, or neutral effects.
  - Water could prevent units from acting.
  - Elevation could increase blocking when defending from low ground.
- A Standard mode with longer timed matches and larger unit counts, where running out of time is defeat.
- A Blitz mode with short one-to-five-minute matches.
- A mode where each player chooses a smaller handful of units.
- Additional movement methods such as flying and teleportation.
- Displacement effects such as pushing, pulling, and swapping locations.

These items are proposals, not a statement that the current implementation supports them.
