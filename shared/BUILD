load('@io_bazel_rules_scala//scala:scala.bzl', 'scala_binary', 'scala_library')

scala_library(
  name='player-colors',
  srcs=['PlayerColors.scala'],
  visibility=['//visibility:public'],
)

scala_library(
  name='player-colors-typescript',
  srcs=['PlayerColorTypescript.scala'],
  deps=[':player-colors'],
  visibility=['//shared/test:__pkg__'],
)

scala_binary(
  name='generate-player-colors',
  srcs=['GeneratePlayerColors.scala'],
  main_class='monarchy.shared.GeneratePlayerColors',
  deps=[':player-colors-typescript'],
)
