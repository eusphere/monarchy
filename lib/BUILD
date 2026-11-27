load('@io_bazel_rules_scala//scala:scala.bzl', 'scala_binary', 'scala_library')

scala_library(
  name='player-colors',
  srcs=['Colors.scala'],
  visibility=['//visibility:public'],
)

scala_library(
  name='player-colors-typescript',
  srcs=['PlayerColorTypescript.scala'],
  deps=[':player-colors'],
  visibility=['//lib/test:__pkg__'],
)

scala_binary(
  name='generate-player-colors',
  srcs=['GeneratePlayerColors.scala'],
  main_class='monarchy.lib.GeneratePlayerColors',
  deps=[':player-colors-typescript'],
)
