# Coding conventions

## Scala

Wrap nullable values returned by Java APIs in `Option` immediately. Use the
resulting `Option` rather than comparing directly with `null`.

Keep imports at the top of the file instead of using fully qualified class
names inside method bodies.

Use local-development values for configuration defaults; production values
should be supplied through the environment.
