load('@bazel_tools//tools/build_defs/repo:http.bzl', 'http_archive')

http_archive(
  name = 'bazel_skylib',
  sha256 = 'b8a1527901774180afc798aeb28c4634bdccf19c4d98e7bdd1ce79d1fe9aaad7',
  urls = [
  'https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/1.4.1/bazel-skylib-1.4.1.tar.gz',
  'https://github.com/bazelbuild/bazel-skylib/releases/download/1.4.1/bazel-skylib-1.4.1.tar.gz',
  ],
)

# See https://github.com/bazelbuild/rules_scala/releases for up to date version information.
http_archive(
  name = 'io_bazel_rules_scala',
  sha256 = '71324bef9bc5a885097e2960d5b8effed63399b55572219919d25f43f468c716',
  strip_prefix = 'rules_scala-6.2.1',
  url = 'https://github.com/bazelbuild/rules_scala/releases/download/v6.2.1/rules_scala-v6.2.1.tar.gz',
)

load('@io_bazel_rules_scala//:scala_config.bzl', 'scala_config')
scala_config(scala_version = '2.13.12')

# loads other rules Rules Scala depends on
load('@io_bazel_rules_scala//scala:scala.bzl', 'rules_scala_setup')
rules_scala_setup()

# Loads Maven deps like Scala compiler and standard libs. On production projects you should consider
# defining a custom deps toolchains to use your project libs instead
load('@io_bazel_rules_scala//scala:scala.bzl', 'rules_scala_toolchain_deps_repositories')
rules_scala_toolchain_deps_repositories(fetch_sources = True)

load('@rules_proto//proto:repositories.bzl', 'rules_proto_dependencies', 'rules_proto_toolchains')
rules_proto_dependencies()
rules_proto_toolchains()

load('@io_bazel_rules_scala//scala:toolchains.bzl', 'scala_register_toolchains')
scala_register_toolchains()

# optional: setup ScalaTest toolchain and dependencies
load('@io_bazel_rules_scala//testing:scalatest.bzl', 'scalatest_repositories', 'scalatest_toolchain')
scalatest_repositories()
scalatest_toolchain()

# Containerization
# See: https://github.com/bazel-contrib/rules_oci/blob/main/docs/scala.md
# See: https://github.com/bazel-contrib/rules_oci/blob/main/docs/push.md
http_archive(
  name = 'aspect_bazel_lib',
  sha256 = '6d758a8f646ecee7a3e294fbe4386daafbe0e5966723009c290d493f227c390b',
  strip_prefix = 'bazel-lib-2.7.7',
  url = 'https://github.com/aspect-build/bazel-lib/releases/download/v2.7.7/bazel-lib-v2.7.7.tar.gz',
)

load('@aspect_bazel_lib//lib:repositories.bzl', 'aspect_bazel_lib_dependencies', 'aspect_bazel_lib_register_toolchains')
aspect_bazel_lib_dependencies()
aspect_bazel_lib_register_toolchains()

http_archive(
  name = 'rules_oci',
  sha256 = '647f4c6fd092dc7a86a7f79892d4b1b7f1de288bdb4829ca38f74fd430fcd2fe',
  strip_prefix = 'rules_oci-1.7.6',
  url = 'https://github.com/bazel-contrib/rules_oci/releases/download/v1.7.6/rules_oci-v1.7.6.tar.gz',
)

load('@rules_oci//oci:dependencies.bzl', 'rules_oci_dependencies')
rules_oci_dependencies()

load('@rules_oci//oci:repositories.bzl', 'LATEST_CRANE_VERSION', 'oci_register_toolchains')
oci_register_toolchains(name = 'oci', crane_version = LATEST_CRANE_VERSION)

load('@rules_oci//oci:pull.bzl', 'oci_pull')
oci_pull(
  name = 'distroless_java',
  digest = 'sha256:161a1d97d592b3f1919801578c3a47c8e932071168a96267698f4b669c24c76d',
  image = 'gcr.io/distroless/java17',
)

# External dependencies
RULES_JVM_EXTERNAL_TAG = '4.5'
RULES_JVM_EXTERNAL_SHA = 'b17d7388feb9bfa7f2fa09031b32707df529f26c91ab9e5d909eb1676badd9a6'

http_archive(
  name = 'rules_jvm_external',
  strip_prefix = 'rules_jvm_external-%s' % RULES_JVM_EXTERNAL_TAG,
  sha256 = RULES_JVM_EXTERNAL_SHA,
  url = 'https://github.com/bazelbuild/rules_jvm_external/archive/%s.zip' % RULES_JVM_EXTERNAL_TAG,
)

load('@rules_jvm_external//:repositories.bzl', 'rules_jvm_external_deps')
rules_jvm_external_deps()

load('@rules_jvm_external//:setup.bzl', 'rules_jvm_external_setup')
rules_jvm_external_setup()

load('@rules_jvm_external//:defs.bzl', 'maven_install')
maven_install(
  artifacts = [
  'com.fasterxml.jackson.core:jackson-annotations:2.14.2',
  'com.fasterxml.jackson.core:jackson-core:2.14.2',
  'com.fasterxml.jackson.core:jackson-databind:2.14.2',
  'com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.14.2',
  'com.fasterxml.jackson.module:jackson-module-scala_2.13:2.14.2',
  'com.github.etaty:rediscala_2.13:1.9.0',
  'com.github.tminglei:slick-pg_2.13:0.22.2',
  'com.github.tminglei:slick-pg_core_2.13:0.22.2',
  'com.typesafe.akka:akka-actor_2.13:2.7.0',
  'com.typesafe.akka:akka-http-core_2.13:10.4.0',
  'com.typesafe.akka:akka-http_2.13:10.4.0',
  'com.typesafe.akka:akka-slf4j_2.13:2.7.0',
  'com.typesafe.akka:akka-stream_2.13:2.7.0',
  'com.typesafe.scala-logging:scala-logging_2.13:3.9.2',
  'com.typesafe.slick:slick-hikaricp_2.13:3.5.2',
  'com.typesafe.slick:slick_2.13:3.3.3',
  'com.typesafe:config:1.4.2',
  'com.zaxxer:HikariCP:4.0.3',
  'io.jsonwebtoken:jjwt-api:0.11.5',
  'io.jsonwebtoken:jjwt-impl:0.11.5',
  'io.jsonwebtoken:jjwt-jackson:0.11.5',
  'org.parboiled:parboiled_2.13:2.4.1',
  'org.reactivestreams:reactive-streams:1.0.4',
  'org.sangria-graphql:sangria-marshalling-api_2.13:1.1.3',
  'org.sangria-graphql:sangria_2.13:2.0.1',
  'org.scala-lang.modules:scala-collection-compat_2.13:2.4.3',
  'org.scalactic:scalactic_2.13:3.1.0',
  'org.scalatest:scalatest_2.13:3.1.0',
  'org.slf4j:slf4j-api:1.7.26',
  ],
  repositories = [
  'https://repo.maven.apache.org/maven2',
  ],
)
