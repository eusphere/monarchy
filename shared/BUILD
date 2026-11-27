load('@io_bazel_rules_scala//scala:scala.bzl', 'scala_library')

scala_library(
  name='player-colors',
  srcs=['PlayerColors.scala'],
  resources=['player-colors.json'],
  resource_strip_prefix='shared',
  visibility=['//visibility:public'],
  deps=['//server/src/util'],
)
