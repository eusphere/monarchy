load('@io_bazel_rules_scala//scala:scala.bzl', 'scala_test')

scala_test(
  name='test',
  srcs=glob(['*.scala']),
  size='small',
  deps=[
    '@maven//:org_scalatest_scalatest_2_13',
    '@maven//:com_typesafe_akka_akka_http_core_2_13',
    '//server/src/controllers',
  ],
)
