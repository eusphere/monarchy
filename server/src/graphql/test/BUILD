load('@io_bazel_rules_scala//scala:scala.bzl', 'scala_test')

scala_test(
  name='test',
  srcs=glob(['*.scala']),
  size='small',
  deps=[
    '@maven//:org_scalatest_scalatest_2_13',
    '@maven//:org_sangria_graphql_sangria_2_13',
    '@maven//:org_sangria_graphql_sangria_marshalling_api_2_13',
    '//server/src/graphql',
    '//server/src/util',
  ],
)
