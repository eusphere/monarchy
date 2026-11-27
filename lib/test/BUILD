load('@io_bazel_rules_scala//scala:scala.bzl', 'scala_test')

scala_test(
  name='test',
  srcs=['ColorsSpec.scala'],
  size='small',
  deps=[
    '@maven//:org_scalatest_scalatest_2_13',
    '//lib:player-colors',
    '//lib:player-colors-typescript',
  ],
)
