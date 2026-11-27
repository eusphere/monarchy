# Player colors

`PlayerColors.scala` is the palette source of truth for signup and the web picker.
It contains eight families of eight hex colors without names.
Each family's fourth shade is its representative.

After editing the Scala palette, regenerate the client file from the repository
root:

```sh
bazel run //shared:generate-player-colors
```

Commit both `shared/PlayerColors.scala` and the generated
`clients/web/src/views/Profile/playerColors.ts`. No palette fetch or runtime
cross-language parsing is needed.

To verify that the checked-in client data matches Scala:

```sh
bazel run //shared:generate-player-colors -- --check
bazel test //shared/test:test
```

An optional output path can be supplied after `--`. Relative paths are resolved
against the repository root, including when the command is run from a subfolder.

Profile updates validate hex syntax, not palette membership, so older clients and
existing saved colors remain usable as the curated palette evolves.
