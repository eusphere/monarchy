# Units and spirit roster

This document records the draft unit notes from the [Monarchy – general information](https://docs.google.com/document/d/1dKd-oQT54Hr6W7bcQvCnLhEnzZkMP9pobSxSk3ld4hw/edit) Google Doc and relates them to the current server configuration.

## Unit configuration

The server's authoritative unit definitions are in [`PieceConf.scala`](../server/src/game/PieceConf.scala). A runtime unit combines one of those configurations with mutable state in [`Piece.scala`](../server/src/game/Piece.scala), and is constructed by [`PieceBuilder`](../server/src/game/Piece.scala). The table below uses current implementation values and names; the older Google Doc names are retained in the notes where they are useful for provenance.

| Implementation type | Current name | Health | Wait | Power | Armor | Blocking | Movement | Special behavior |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `Assassin` | Royal Spearman | 35 | 1 | 18 | 12% | 70% | 4 | Adjacent attack affecting adjacent tiles |
| `Knight` | Royal Guard | 50 | 1 | 22 | 25% | 80% | 3 | Adjacent blockable attack |
| `Scout` | Royal Hunter | 40 | 2 | 18 | 8% | 60% | 4 | Six-tile range; requires line of sight |
| `Witch` | Shadow Bender | 28 | 3 | 24 | 0% | 20% | 3 | Unblockable attack along a direction, up to four tiles |
| `Pyromancer` | Burning Priestess | 30 | 3 | 16 | 0% | 30% | 3 | Unblockable three-range attack with one-tile area effect |
| `MudGolem` | Gloom Sentinel | 60 | 2 | 20 | 0% | 0% | 5 | Teleports; adjacent attack |
| `Furgon` | Grove Sentinel | 48 | 1 | 0 | 0% | 50% | 3 | Creates shrubs in a one-tile area |
| `Cleric` | High Cleric | 24 | 5 | 12 | 0% | 0% | 3 | Heals all allied units; unblockable/non-damaging |
| `FrostGolem` | Frost Sentinel | 60 | 2 | 0 | 0% | 0% | 2 | Requires focus; applies paralysis at range |
| `Shrub` | Banyan | 1 | 0 | 0 | 0% | 0% | 0 | Stationary summoned plant |

Armor and blocking are represented as decimal fractions in Scala, so `0.25` means 25%.

Attack geometry is factored into [`AttackPatterns.scala`](../server/src/game/AttackPatterns.scala) and [`Deltas.scala`](../server/src/game/Deltas.scala). Effects such as attacks, healing, paralysis, and plant growth are modeled in [`Effect.scala`](../server/src/game/Effect.scala), and the unit-specific effect areas are defined beside each configuration in [`PieceConf.scala`](../server/src/game/PieceConf.scala).

## Draft names and descriptions from the source notes

The Google Doc used earlier names and descriptions for several pieces:

- Knight: “Divine Blade”; a sturdy sword attacker.
- Assassin: “Divine Shadow”; a smaller, faster, darker-themed unit.
- Scout: “Divine Arrow”; a light, fast, long-range unit.
- Cleric: “High Priestess”; a divine or deity-like healer with no attack damage.
- Furgon: “Grove Sentinel”; a forest-themed unit that summons flora onto board tiles.

The implementation has since diverged in several names and values. Treat the Scala configuration as authoritative for current behavior and this section as historical design context. Unit behavior is exercised by [`KnightSpec.scala`](../server/src/game/test/KnightSpec.scala), [`WitchSpec.scala`](../server/src/game/test/WitchSpec.scala), and the broader [`GameSpec.scala`](../server/src/game/test/GameSpec.scala).

## External references

The general-information document also links to:

- Repository: https://github.com/abhandaru/monarchy1/
- A non-multiplayer classic demo: https://tactics.taorankings.com/classic.html
- A third-party unit wiki: https://strategywiki.org/wiki/Tactics_Arena_Online/Units
- Fate/Zero as character-design inspiration.
- Scryfall references for possible character or piece inspiration:
  - https://scryfall.com/card/cm2/231/wurmcoil-engine
  - https://scryfall.com/card/ima/18/elesh-norn-grand-cenobite
- A visual reference for the Grove Sentinel concept: https://i.pinimg.com/originals/0c/05/1e/0c051e69b85a3c6c94bbdbc2294be2aa.png

These are inspiration and reference links, not runtime dependencies.
