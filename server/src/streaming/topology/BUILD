load('@io_bazel_rules_scala//scala:scala.bzl', 'scala_library')
scala_library(
  name='topology',
  srcs=glob(['*.scala']),
  visibility=['//visibility:public'],
  deps=[
    '//server/src/auth',
    '//server/src/dal',
    '//server/src/streaming/core',
    '//server/src/streaming/format',
    '//server/src/streaming/process',
    '//server/src/util',
    '@maven//:com_github_etaty_rediscala_2_13',
    '@maven//:com_typesafe_akka_akka_actor_2_13',
    '@maven//:com_typesafe_akka_akka_http_core_2_13',
    '@maven//:com_typesafe_akka_akka_stream_2_13',
    '@maven//:org_reactivestreams_reactive_streams',
  ]
)
