# Do not edit. bazel-deps autogenerates this file from dependencies.yaml.
def _jar_artifact_impl(ctx):
    jar_name = "%s.jar" % ctx.name
    ctx.download(
        output=ctx.path("jar/%s" % jar_name),
        url=ctx.attr.urls,
        sha256=ctx.attr.sha256,
        executable=False
    )
    src_name="%s-sources.jar" % ctx.name
    srcjar_attr=""
    has_sources = len(ctx.attr.src_urls) != 0
    if has_sources:
        ctx.download(
            output=ctx.path("jar/%s" % src_name),
            url=ctx.attr.src_urls,
            sha256=ctx.attr.src_sha256,
            executable=False
        )
        srcjar_attr ='\n    srcjar = ":%s",' % src_name

    build_file_contents = """
package(default_visibility = ['//visibility:public'])
java_import(
    name = 'jar',
    tags = ['maven_coordinates={artifact}'],
    jars = ['{jar_name}'],{srcjar_attr}
)
filegroup(
    name = 'file',
    srcs = [
        '{jar_name}',
        '{src_name}'
    ],
    visibility = ['//visibility:public']
)\n""".format(artifact = ctx.attr.artifact, jar_name = jar_name, src_name = src_name, srcjar_attr = srcjar_attr)
    ctx.file(ctx.path("jar/BUILD"), build_file_contents, False)
    return None

jar_artifact = repository_rule(
    attrs = {
        "artifact": attr.string(mandatory = True),
        "sha256": attr.string(mandatory = True),
        "urls": attr.string_list(mandatory = True),
        "src_sha256": attr.string(mandatory = False, default=""),
        "src_urls": attr.string_list(mandatory = False, default=[]),
    },
    implementation = _jar_artifact_impl
)

def jar_artifact_callback(hash):
    src_urls = []
    src_sha256 = ""
    source=hash.get("source", None)
    if source != None:
        src_urls = [source["url"]]
        src_sha256 = source["sha256"]
    jar_artifact(
        artifact = hash["artifact"],
        name = hash["name"],
        urls = [hash["url"]],
        sha256 = hash["sha256"],
        src_urls = src_urls,
        src_sha256 = src_sha256
    )
    native.bind(name = hash["bind"], actual = hash["actual"])


def list_dependencies():
    return [
    {"artifact": "com.chuusai:shapeless_2.12:2.3.3", "lang": "java", "sha1": "6041e2c4871650c556a9c6842e43c04ed462b11f", "sha256": "312e301432375132ab49592bd8d22b9cd42a338a6300c6157fb4eafd1e3d5033", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/chuusai/shapeless_2.12/2.3.3/shapeless_2.12-2.3.3.jar", "source": {"sha1": "02511271188a92962fcf31a9a217b8122f75453a", "sha256": "2d53fea1b1ab224a4a731d99245747a640deaa6ef3912c253666aa61287f3d63", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/chuusai/shapeless_2.12/2.3.3/shapeless_2.12-2.3.3-sources.jar"} , "name": "com_chuusai_shapeless_2_12", "actual": "@com_chuusai_shapeless_2_12//jar", "bind": "jar/com/chuusai/shapeless_2_12"},
    {"artifact": "com.github.julien-truffaut:monocle-core_2.12:1.4.0", "lang": "java", "sha1": "219da9cc75878a75c888e38ad883fe4d30a7651d", "sha256": "09800913d3355ea4cd90ce3ad5642152f4dca78b3ece6b4e604abde653483189", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/github/julien-truffaut/monocle-core_2.12/1.4.0/monocle-core_2.12-1.4.0.jar", "source": {"sha1": "37d333798ca15a03f5dfbb02f133d5b6b8e57b8c", "sha256": "76e6f28e3c33404ea92e2a5027d03f2f5ab569b9910d4e29424e00efaaaa41b2", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/github/julien-truffaut/monocle-core_2.12/1.4.0/monocle-core_2.12-1.4.0-sources.jar"} , "name": "com_github_julien_truffaut_monocle_core_2_12", "actual": "@com_github_julien_truffaut_monocle_core_2_12//jar", "bind": "jar/com/github/julien_truffaut/monocle_core_2_12"},
    {"artifact": "com.github.tminglei:slick-pg_2.12:0.17.2", "lang": "scala", "sha1": "bacb5ce2f30119ab05f6978f465df25de7a4740e", "sha256": "07db77921e1fe38683f31941bb02facad5452d5d8be905ec802cc14b93fa9734", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/github/tminglei/slick-pg_2.12/0.17.2/slick-pg_2.12-0.17.2.jar", "source": {"sha1": "1cdd52abaa7befaf4f813f4b5dacf75e52215084", "sha256": "61f850074df7a066e41564f0d7e656aa6a1fb89d742a6899cbf56125c33e578a", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/github/tminglei/slick-pg_2.12/0.17.2/slick-pg_2.12-0.17.2-sources.jar"} , "name": "com_github_tminglei_slick_pg_2_12", "actual": "@com_github_tminglei_slick_pg_2_12//jar:file", "bind": "jar/com/github/tminglei/slick_pg_2_12"},
    {"artifact": "com.github.tminglei:slick-pg_core_2.12:0.17.2", "lang": "scala", "sha1": "5549fc922b400f6aa2a303cff4d7374edacfe68f", "sha256": "d4de8e84356ee12227d40400201e9577e4060ae79a14b949b87a814356959e5a", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/github/tminglei/slick-pg_core_2.12/0.17.2/slick-pg_core_2.12-0.17.2.jar", "source": {"sha1": "1c69cda85ae5bbb77cca7693115080447e4ebb34", "sha256": "9c98577401995876c3e5e3b2402d8917c4a2df49c9c5be753a4b0523f0bf9d74", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/github/tminglei/slick-pg_core_2.12/0.17.2/slick-pg_core_2.12-0.17.2-sources.jar"} , "name": "com_github_tminglei_slick_pg_core_2_12", "actual": "@com_github_tminglei_slick_pg_core_2_12//jar:file", "bind": "jar/com/github/tminglei/slick_pg_core_2_12"},
    {"artifact": "com.typesafe.akka:akka-actor_2.12:2.5.19", "lang": "scala", "sha1": "24707fdb38b1d8e74ccfe816f9fa145cf8c097e3", "sha256": "33b5eef9db3766a7e7a307457995fde116967ead482c88377b2466475d8f703b", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/akka/akka-actor_2.12/2.5.19/akka-actor_2.12-2.5.19.jar", "source": {"sha1": "c082477c7efba8de52d95ccdc7cedb6c680bf3af", "sha256": "5f4a9a2b8e8f258de65c7b7beeaf5814e7b946e2a82d947c2de3ef9f15f55ea5", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/akka/akka-actor_2.12/2.5.19/akka-actor_2.12-2.5.19-sources.jar"} , "name": "com_typesafe_akka_akka_actor_2_12", "actual": "@com_typesafe_akka_akka_actor_2_12//jar:file", "bind": "jar/com/typesafe/akka/akka_actor_2_12"},
    {"artifact": "com.typesafe.akka:akka-http-core_2.12:10.1.8", "lang": "scala", "sha1": "824947965b76cfd3024b9cba41632c5f67768701", "sha256": "d456d457613db43fe10c1bfd0e5046672061eba2af802c81970a470ec397014f", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/akka/akka-http-core_2.12/10.1.8/akka-http-core_2.12-10.1.8.jar", "source": {"sha1": "dbeaae3816245edfab1bbad2be5f523f112da3b6", "sha256": "c1bb96f732bc07e5c7a52f785de2212ae33eaa3cf25a3796743b3c77046bf668", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/akka/akka-http-core_2.12/10.1.8/akka-http-core_2.12-10.1.8-sources.jar"} , "name": "com_typesafe_akka_akka_http_core_2_12", "actual": "@com_typesafe_akka_akka_http_core_2_12//jar:file", "bind": "jar/com/typesafe/akka/akka_http_core_2_12"},
    {"artifact": "com.typesafe.akka:akka-http_2.12:10.1.8", "lang": "scala", "sha1": "666012460071d248f77018586dc6c22468a39a15", "sha256": "40f8457b6011dda35edcd30911c55d086800d0dad065e3d91c9b4190522aa824", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/akka/akka-http_2.12/10.1.8/akka-http_2.12-10.1.8.jar", "source": {"sha1": "88a7d039921da654a563e26ad76ec8b0e61480d8", "sha256": "d43839b0b69d801cdbd2bd1637ae01b7bd853fac6d75108af8a61ec2359c2424", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/akka/akka-http_2.12/10.1.8/akka-http_2.12-10.1.8-sources.jar"} , "name": "com_typesafe_akka_akka_http_2_12", "actual": "@com_typesafe_akka_akka_http_2_12//jar:file", "bind": "jar/com/typesafe/akka/akka_http_2_12"},
    {"artifact": "com.typesafe.akka:akka-parsing_2.12:10.1.8", "lang": "java", "sha1": "f719744e99a5c6a629e0560ef4e5f2d513caa302", "sha256": "ef104a616c9acf498e80cc643a73bde4cd67821ec12f48676ad4aec017201174", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/akka/akka-parsing_2.12/10.1.8/akka-parsing_2.12-10.1.8.jar", "source": {"sha1": "6d14a2f9a035e8f1adec20566968cf1c55ad79dd", "sha256": "a833b50687cac32ba4fdba19a5146df04b7a8f95d325fc1229a6960d5a81e274", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/akka/akka-parsing_2.12/10.1.8/akka-parsing_2.12-10.1.8-sources.jar"} , "name": "com_typesafe_akka_akka_parsing_2_12", "actual": "@com_typesafe_akka_akka_parsing_2_12//jar", "bind": "jar/com/typesafe/akka/akka_parsing_2_12"},
    {"artifact": "com.typesafe.akka:akka-protobuf_2.12:2.5.19", "lang": "java", "sha1": "c96077a5f90e97609368b2bfb6916dd1d7d30ef7", "sha256": "148401ab94c9b95efb4ac9f9bba3915b53c72bb0a05e26b3d5b00bb3dcf80cee", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/akka/akka-protobuf_2.12/2.5.19/akka-protobuf_2.12-2.5.19.jar", "source": {"sha1": "08ccc4548b3be68443025e760beef87cb5d229db", "sha256": "f283b548f63613e034a0841e2eaf347c45d8b1c59bddceac6dd27f346e62f1fd", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/akka/akka-protobuf_2.12/2.5.19/akka-protobuf_2.12-2.5.19-sources.jar"} , "name": "com_typesafe_akka_akka_protobuf_2_12", "actual": "@com_typesafe_akka_akka_protobuf_2_12//jar", "bind": "jar/com/typesafe/akka/akka_protobuf_2_12"},
    {"artifact": "com.typesafe.akka:akka-stream_2.12:2.5.19", "lang": "scala", "sha1": "e5bc9a2299748ea16e9f649ffc22aa6e86245dd1", "sha256": "eb254be1e088716139e05d9f6d46ab5e6c41ee0771b08789990267ef7b82b309", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/akka/akka-stream_2.12/2.5.19/akka-stream_2.12-2.5.19.jar", "source": {"sha1": "66e9363d9e15a614d05b91f2ce0a3b1891955528", "sha256": "4b4721ef336b06b05238ed13ef772bee2dbc06d3de2622cf5776b1d6382ec3cb", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/akka/akka-stream_2.12/2.5.19/akka-stream_2.12-2.5.19-sources.jar"} , "name": "com_typesafe_akka_akka_stream_2_12", "actual": "@com_typesafe_akka_akka_stream_2_12//jar:file", "bind": "jar/com/typesafe/akka/akka_stream_2_12"},
    {"artifact": "com.typesafe.slick:slick_2.12:3.3.0", "lang": "scala", "sha1": "93b7cbc1c090dfc53a3d09d118f756c0f323a8d6", "sha256": "5c4dee7032eb3d3a9ba0f5fbbeb71658f1b601404c9adc7abf98806f1d3786c5", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/slick/slick_2.12/3.3.0/slick_2.12-3.3.0.jar", "source": {"sha1": "b36d35defd61fdda71f2a240cfb5fcb99345b9f1", "sha256": "635ce75720e6679672c66624c31bd32225709e275a81f1a541910978686f49af", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/slick/slick_2.12/3.3.0/slick_2.12-3.3.0-sources.jar"} , "name": "com_typesafe_slick_slick_2_12", "actual": "@com_typesafe_slick_slick_2_12//jar:file", "bind": "jar/com/typesafe/slick/slick_2_12"},
# duplicates in com.typesafe:config fixed to 1.3.4
# - com.typesafe.akka:akka-actor_2.12:2.5.19 wanted version 1.3.3
# - com.typesafe.slick:slick_2.12:3.3.0 wanted version 1.3.2
# - com.typesafe:ssl-config-core_2.12:0.3.6 wanted version 1.3.3
    {"artifact": "com.typesafe:config:1.3.4", "lang": "java", "sha1": "d0b3799b8e3a65c7b58c2aab9963603e687e2f91", "sha256": "8aa8931d8143154f86d393d4a85cfa207a884f16469cdf314dc8d6abba3f1438", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/config/1.3.4/config-1.3.4.jar", "source": {"sha1": "92987ecc1f26527345e8436d37804babdf640288", "sha256": "fad62d6f8ac7d04a6ed896c6fd8ff5d1ce7a5e608cd3c4b66f187e05ff08af0a", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/config/1.3.4/config-1.3.4-sources.jar"} , "name": "com_typesafe_config", "actual": "@com_typesafe_config//jar", "bind": "jar/com/typesafe/config"},
    {"artifact": "com.typesafe:ssl-config-core_2.12:0.3.6", "lang": "java", "sha1": "09f1d652e6be462324e359eaa9a42ad4fbe0956c", "sha256": "ee78abc0773e1044a141631c08f9a8396a77034e69ad0524394ec99597cdc193", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/ssl-config-core_2.12/0.3.6/ssl-config-core_2.12-0.3.6.jar", "source": {"sha1": "2deb2e6cd0165bb94af04c84c716a4ee11a6f8eb", "sha256": "1357ac5d5bdbac879eaa8c29136d570789670634e6635634e84c51e32d71801f", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/com/typesafe/ssl-config-core_2.12/0.3.6/ssl-config-core_2.12-0.3.6-sources.jar"} , "name": "com_typesafe_ssl_config_core_2_12", "actual": "@com_typesafe_ssl_config_core_2_12//jar", "bind": "jar/com/typesafe/ssl_config_core_2_12"},
# duplicates in io.circe:circe-core_2.12 fixed to 0.9.3
# - io.circe:circe-jawn_2.12:0.9.3 wanted version 0.9.3
# - io.circe:circe-optics_2.12:0.9.3 wanted version 0.9.3
# - io.circe:circe-parser_2.12:0.9.3 wanted version 0.9.3
# - org.sangria-graphql:sangria-circe_2.12:1.2.1 wanted version 0.9.1
    {"artifact": "io.circe:circe-core_2.12:0.9.3", "lang": "scala", "sha1": "f4f8674788f571d840ed98fabf3237f72c86d1f0", "sha256": "256527a2ce81b91db1d3cc27f44dc920a8cb33ff32c1d6e6d9813799df774e20", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/io/circe/circe-core_2.12/0.9.3/circe-core_2.12-0.9.3.jar", "source": {"sha1": "e8d75320f4b9ea89cae59129c4acd2f328b161bb", "sha256": "a84c0f7651d1a1ef2c4fb7df802965b572680f88e6128f09f137be19759e9e78", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/io/circe/circe-core_2.12/0.9.3/circe-core_2.12-0.9.3-sources.jar"} , "name": "io_circe_circe_core_2_12", "actual": "@io_circe_circe_core_2_12//jar:file", "bind": "jar/io/circe/circe_core_2_12"},
    {"artifact": "io.circe:circe-jawn_2.12:0.9.3", "lang": "scala", "sha1": "8462d202404f578f09cc9b89d7dca57dd94b09e5", "sha256": "0f3b99235b0180482a1a00dcfc2fe7604a42c027923dc4c1b5e99f7ffc507d9d", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/io/circe/circe-jawn_2.12/0.9.3/circe-jawn_2.12-0.9.3.jar", "source": {"sha1": "950197dda0fbe37b216a7d11e3be4b4b8861ef52", "sha256": "a2f0e0fb26bb000426af13fa0e6389642f06feb9f1b4e9620aa8c6e584ccdfd8", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/io/circe/circe-jawn_2.12/0.9.3/circe-jawn_2.12-0.9.3-sources.jar"} , "name": "io_circe_circe_jawn_2_12", "actual": "@io_circe_circe_jawn_2_12//jar:file", "bind": "jar/io/circe/circe_jawn_2_12"},
    {"artifact": "io.circe:circe-numbers_2.12:0.9.3", "lang": "java", "sha1": "e8b931a2a2438d9ba84ff5ecbfb2a4ac7249b0d8", "sha256": "49cd74886f74659b239b6a85f3ba8e24f212a9e6b299fb9a793e092905bc8fa3", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/io/circe/circe-numbers_2.12/0.9.3/circe-numbers_2.12-0.9.3.jar", "source": {"sha1": "dadf859faeee2572b50cf9f5e4cbe0d5dd0f29e0", "sha256": "562f7bc8dab9917b5e903cd8931a52cfce22d6a2fa53df1919ad5088580b8eb2", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/io/circe/circe-numbers_2.12/0.9.3/circe-numbers_2.12-0.9.3-sources.jar"} , "name": "io_circe_circe_numbers_2_12", "actual": "@io_circe_circe_numbers_2_12//jar", "bind": "jar/io/circe/circe_numbers_2_12"},
    {"artifact": "io.circe:circe-optics_2.12:0.9.3", "lang": "scala", "sha1": "9bfe14e1beaa3434ff323e8ff1456fb01d56bc2f", "sha256": "114f69eed78ec328b006e6d703733568bb09f7103c6419218cf62a583ab33464", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/io/circe/circe-optics_2.12/0.9.3/circe-optics_2.12-0.9.3.jar", "source": {"sha1": "cad285d97d08ef6c04430d5afaa892caf5c02f69", "sha256": "87ac376b4b1a6b8511eb75d58d27c6cfc64324535ea60aa72aa77bbab02d792e", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/io/circe/circe-optics_2.12/0.9.3/circe-optics_2.12-0.9.3-sources.jar"} , "name": "io_circe_circe_optics_2_12", "actual": "@io_circe_circe_optics_2_12//jar:file", "bind": "jar/io/circe/circe_optics_2_12"},
    {"artifact": "io.circe:circe-parser_2.12:0.9.3", "lang": "scala", "sha1": "9af9ad5e8a2027a7d93a2b21578f727f73f55d79", "sha256": "35613794c8881186487beaf5a620cd0f6f128cffd4e7a2c777ef034cb4bd1f75", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/io/circe/circe-parser_2.12/0.9.3/circe-parser_2.12-0.9.3.jar", "source": {"sha1": "0b0ee1069326c38ca7c0ced5c2b1337774c72876", "sha256": "08e1cdf76c77951b8771f2485756f6e9137de6473bfbaaabd86c9f568827b0a1", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/io/circe/circe-parser_2.12/0.9.3/circe-parser_2.12-0.9.3-sources.jar"} , "name": "io_circe_circe_parser_2_12", "actual": "@io_circe_circe_parser_2_12//jar:file", "bind": "jar/io/circe/circe_parser_2_12"},
    {"artifact": "org.parboiled:parboiled_2.12:2.1.6", "lang": "scala", "sha1": "d5c55364a6aac91c4a331531af1f00944e18d565", "sha256": "be3493e6c5e10ee3483bbe53c329f8a8c53fa4112e42a043d9696db2857383c3", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/parboiled/parboiled_2.12/2.1.6/parboiled_2.12-2.1.6.jar", "source": {"sha1": "14d2aedc9f4d57ae921339558d5d4503f39866f5", "sha256": "112c758e4a2e2acde98bc5a41a3a569d815c0bfcbd0bf14676c5aca8c780adb7", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/parboiled/parboiled_2.12/2.1.6/parboiled_2.12-2.1.6-sources.jar"} , "name": "org_parboiled_parboiled_2_12", "actual": "@org_parboiled_parboiled_2_12//jar:file", "bind": "jar/org/parboiled/parboiled_2_12"},
    {"artifact": "org.postgresql:postgresql:42.2.5", "lang": "java", "sha1": "951b7eda125f3137538a94e2cbdcf744088ad4c2", "sha256": "7ffa46f8c619377cdebcd17721b6b21ecf6659850179f96fec3d1035cf5a0cdc", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/postgresql/postgresql/42.2.5/postgresql-42.2.5.jar", "source": {"sha1": "038646ec680de3cdaad06738686a3bc454022345", "sha256": "3a6892a9d7a95a9fb31db0241bca2f511817f6eea557f5a743197bbe243f6b46", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/postgresql/postgresql/42.2.5/postgresql-42.2.5-sources.jar"} , "name": "org_postgresql_postgresql", "actual": "@org_postgresql_postgresql//jar", "bind": "jar/org/postgresql/postgresql"},
    {"artifact": "org.reactivestreams:reactive-streams:1.0.2", "lang": "java", "sha1": "323964c36556eb0e6209f65c1cef72b53b461ab8", "sha256": "cc09ab0b140e0d0496c2165d4b32ce24f4d6446c0a26c5dc77b06bdf99ee8fae", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/reactivestreams/reactive-streams/1.0.2/reactive-streams-1.0.2.jar", "source": {"sha1": "fb592a3d57b11e71eb7a6211dd12ba824c5dd037", "sha256": "963a6480f46a64013d0f144ba41c6c6e63c4d34b655761717a436492886f3667", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/reactivestreams/reactive-streams/1.0.2/reactive-streams-1.0.2-sources.jar"} , "name": "org_reactivestreams_reactive_streams", "actual": "@org_reactivestreams_reactive_streams//jar", "bind": "jar/org/reactivestreams/reactive_streams"},
    {"artifact": "org.sangria-graphql:macro-visit_2.12:0.1.1", "lang": "java", "sha1": "80991637811bb817b61ed8de65aece658e213ad4", "sha256": "c3410fdbd0c420488f49121ea3c7757890dd98eec0c826ca1ac6946e2c263fd1", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/sangria-graphql/macro-visit_2.12/0.1.1/macro-visit_2.12-0.1.1.jar", "source": {"sha1": "e042b8e9e0aea796b091140ea97fa5eda20b16bc", "sha256": "76c0e62f6ecc8117d7408bfa78ab9dddeac7d903735d2acc413dd7ba2fe7509c", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/sangria-graphql/macro-visit_2.12/0.1.1/macro-visit_2.12-0.1.1-sources.jar"} , "name": "org_sangria_graphql_macro_visit_2_12", "actual": "@org_sangria_graphql_macro_visit_2_12//jar", "bind": "jar/org/sangria_graphql/macro_visit_2_12"},
    {"artifact": "org.sangria-graphql:sangria-circe_2.12:1.2.1", "lang": "scala", "sha1": "a8f3c8d741c40e1e0a40e560dd1192b8e861df13", "sha256": "d47b949cded4a987e8324ca0a17582b136e7577df21ec144c22dfbaaf122f640", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/sangria-graphql/sangria-circe_2.12/1.2.1/sangria-circe_2.12-1.2.1.jar", "source": {"sha1": "c69487027dd64985801cd76d3ff6fa59bd6b24ff", "sha256": "eaac34c7b290986b191960b141990334f74f23ef9f99ec863b65477e08804aa5", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/sangria-graphql/sangria-circe_2.12/1.2.1/sangria-circe_2.12-1.2.1-sources.jar"} , "name": "org_sangria_graphql_sangria_circe_2_12", "actual": "@org_sangria_graphql_sangria_circe_2_12//jar:file", "bind": "jar/org/sangria_graphql/sangria_circe_2_12"},
# duplicates in org.sangria-graphql:sangria-marshalling-api_2.12 fixed to 1.0.3
# - org.sangria-graphql:sangria-circe_2.12:1.2.1 wanted version 1.0.1
# - org.sangria-graphql:sangria_2.12:1.4.2 wanted version 1.0.3
    {"artifact": "org.sangria-graphql:sangria-marshalling-api_2.12:1.0.3", "lang": "scala", "sha1": "498e4335b9715878e54253d73dd64897c60b9ce2", "sha256": "31c665e7d653e600fc5bafabd4cfcc87278717dc55620dc71198ece99c18ca97", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/sangria-graphql/sangria-marshalling-api_2.12/1.0.3/sangria-marshalling-api_2.12-1.0.3.jar", "source": {"sha1": "549da9723db8e2bef67305f156f230da0ce01736", "sha256": "b0926ba3d86257ccf8ba49a79a157d25f5ead18d90a55e716fe79891a2e7a9d5", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/sangria-graphql/sangria-marshalling-api_2.12/1.0.3/sangria-marshalling-api_2.12-1.0.3-sources.jar"} , "name": "org_sangria_graphql_sangria_marshalling_api_2_12", "actual": "@org_sangria_graphql_sangria_marshalling_api_2_12//jar:file", "bind": "jar/org/sangria_graphql/sangria_marshalling_api_2_12"},
    {"artifact": "org.sangria-graphql:sangria-streaming-api_2.12:1.0.0", "lang": "java", "sha1": "bf749a349519d22a5a61deade722aa969060792f", "sha256": "700b9b59861d57152ab42442d8c212ce8898a0b5a2c579e1c221762b8f418f51", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/sangria-graphql/sangria-streaming-api_2.12/1.0.0/sangria-streaming-api_2.12-1.0.0.jar", "source": {"sha1": "b5c7f05b845545a1b8d39170fd7b5bbacbb94ee5", "sha256": "9d07923cc5b93c0cb0c878704f6faa31c010fb84843d456db78c76110fb35722", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/sangria-graphql/sangria-streaming-api_2.12/1.0.0/sangria-streaming-api_2.12-1.0.0-sources.jar"} , "name": "org_sangria_graphql_sangria_streaming_api_2_12", "actual": "@org_sangria_graphql_sangria_streaming_api_2_12//jar", "bind": "jar/org/sangria_graphql/sangria_streaming_api_2_12"},
    {"artifact": "org.sangria-graphql:sangria_2.12:1.4.2", "lang": "scala", "sha1": "f82921a9711923de8fd485065055aa6149ec87aa", "sha256": "3fe3af011272c4cc3931523329249e6d7cd0da9ce69690501df3b6ef7fc1e31f", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/sangria-graphql/sangria_2.12/1.4.2/sangria_2.12-1.4.2.jar", "source": {"sha1": "53f47b0b603daaad31afaf91d07e3f75ee9db24b", "sha256": "e47bff99b1fe6aad9c3dbc672301aae39fa8b35cb69639d57b96c18c76a72064", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/sangria-graphql/sangria_2.12/1.4.2/sangria_2.12-1.4.2-sources.jar"} , "name": "org_sangria_graphql_sangria_2_12", "actual": "@org_sangria_graphql_sangria_2_12//jar:file", "bind": "jar/org/sangria_graphql/sangria_2_12"},
    {"artifact": "org.scala-lang.modules:scala-java8-compat_2.12:0.8.0", "lang": "java", "sha1": "1e6f1e745bf6d3c34d1e2ab150653306069aaf34", "sha256": "d9d5dfd1bc49a8158e6e0a90b2ed08fa602984d815c00af16cec53557e83ef8e", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/scala-lang/modules/scala-java8-compat_2.12/0.8.0/scala-java8-compat_2.12-0.8.0.jar", "source": {"sha1": "0a33ce48278b9e3bbea8aed726e3c0abad3afadd", "sha256": "c0926003987a5c21108748fda401023485085eaa9fe90a41a40bcf67596fff34", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/scala-lang/modules/scala-java8-compat_2.12/0.8.0/scala-java8-compat_2.12-0.8.0-sources.jar"} , "name": "org_scala_lang_modules_scala_java8_compat_2_12", "actual": "@org_scala_lang_modules_scala_java8_compat_2_12//jar", "bind": "jar/org/scala_lang/modules/scala_java8_compat_2_12"},
    {"artifact": "org.scala-lang.modules:scala-parser-combinators_2.12:1.1.1", "lang": "java", "sha1": "29b4158f9ddcc22d1c81363fd61a8bef046f06b9", "sha256": "a8a2c6b31457c9ef15c63f5f1ac6b45e6b979059627e38c24416a900098ffb2e", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/scala-lang/modules/scala-parser-combinators_2.12/1.1.1/scala-parser-combinators_2.12-1.1.1.jar", "source": {"sha1": "2e4d6675372d0ef2362de2906b292f9229ebc1a9", "sha256": "b005ff7606449700f8ec6d8b5866e1a7d62b80b00b80c005bb4d2677eb353624", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/scala-lang/modules/scala-parser-combinators_2.12/1.1.1/scala-parser-combinators_2.12-1.1.1-sources.jar"} , "name": "org_scala_lang_modules_scala_parser_combinators_2_12", "actual": "@org_scala_lang_modules_scala_parser_combinators_2_12//jar", "bind": "jar/org/scala_lang/modules/scala_parser_combinators_2_12"},
# duplicates in org.scala-lang:scala-library promoted to 2.12.8
# - com.chuusai:shapeless_2.12:2.3.3 wanted version 2.12.4
# - com.github.julien-truffaut:monocle-core_2.12:1.4.0 wanted version 2.12.1
# - com.typesafe.akka:akka-actor_2.12:2.5.19 wanted version 2.12.8
# - com.typesafe.akka:akka-http-core_2.12:10.1.8 wanted version 2.12.8
# - com.typesafe.akka:akka-http_2.12:10.1.8 wanted version 2.12.8
# - com.typesafe.akka:akka-parsing_2.12:10.1.8 wanted version 2.12.8
# - com.typesafe.akka:akka-protobuf_2.12:2.5.19 wanted version 2.12.8
# - com.typesafe.akka:akka-stream_2.12:2.5.19 wanted version 2.12.8
# - com.typesafe.slick:slick_2.12:3.3.0 wanted version 2.12.8
# - com.typesafe:ssl-config-core_2.12:0.3.6 wanted version 2.12.6
# - io.circe:circe-core_2.12:0.9.3 wanted version 2.12.5
# - io.circe:circe-jawn_2.12:0.9.3 wanted version 2.12.5
# - io.circe:circe-numbers_2.12:0.9.3 wanted version 2.12.5
# - io.circe:circe-optics_2.12:0.9.3 wanted version 2.12.5
# - io.circe:circe-parser_2.12:0.9.3 wanted version 2.12.5
# - org.parboiled:parboiled_2.12:2.1.6 wanted version 2.12.8
# - org.sangria-graphql:macro-visit_2.12:0.1.1 wanted version 2.12.1
# - org.sangria-graphql:sangria-circe_2.12:1.2.1 wanted version 2.12.4
# - org.sangria-graphql:sangria-marshalling-api_2.12:1.0.3 wanted version 2.12.6
# - org.sangria-graphql:sangria-streaming-api_2.12:1.0.0 wanted version 2.12.1
# - org.sangria-graphql:sangria_2.12:1.4.2 wanted version 2.12.6
# - org.scala-lang.modules:scala-java8-compat_2.12:0.8.0 wanted version 2.12.0
# - org.scala-lang.modules:scala-parser-combinators_2.12:1.1.1 wanted version 2.12.6
# - org.scala-lang:scala-reflect:2.12.8 wanted version 2.12.8
# - org.scalaz:scalaz-core_2.12:7.2.8 wanted version 2.12.0
# - org.spire-math:jawn-parser_2.12:0.11.1 wanted version 2.12.2
# - org.typelevel:cats-core_2.12:1.0.1 wanted version 2.12.4
# - org.typelevel:cats-kernel_2.12:1.0.1 wanted version 2.12.4
# - org.typelevel:cats-macros_2.12:1.0.1 wanted version 2.12.4
# - org.typelevel:machinist_2.12:0.6.2 wanted version 2.12.0
# - org.typelevel:macro-compat_2.12:1.1.1 wanted version 2.12.0
    {"artifact": "org.scala-lang:scala-library:2.12.8", "lang": "java", "sha1": "36b234834d8f842cdde963c8591efae6cf413e3f", "sha256": "321fb55685635c931eba4bc0d7668349da3f2c09aee2de93a70566066ff25c28", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/scala-lang/scala-library/2.12.8/scala-library-2.12.8.jar", "source": {"sha1": "45ccb865e040cbef5d5620571527831441392f24", "sha256": "11482bcb49b2e47baee89c3b1ae10c6a40b89e2fbb0da2a423e062f444e13492", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/scala-lang/scala-library/2.12.8/scala-library-2.12.8-sources.jar"} , "name": "org_scala_lang_scala_library", "actual": "@org_scala_lang_scala_library//jar", "bind": "jar/org/scala_lang/scala_library"},
# duplicates in org.scala-lang:scala-reflect promoted to 2.12.8
# - com.github.tminglei:slick-pg_2.12:0.17.2 wanted version 2.12.8
# - com.github.tminglei:slick-pg_core_2.12:0.17.2 wanted version 2.12.8
# - org.sangria-graphql:macro-visit_2.12:0.1.1 wanted version 2.12.1
# - org.sangria-graphql:sangria_2.12:1.4.2 wanted version 2.12.6
# - org.typelevel:machinist_2.12:0.6.2 wanted version 2.12.0
    {"artifact": "org.scala-lang:scala-reflect:2.12.8", "lang": "java", "sha1": "682d33402cdae50258afa2c0860eb54688dab610", "sha256": "4d6405395c4599ce04cea08ba082339e3e42135de9aae2923c9f5367e957315a", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/scala-lang/scala-reflect/2.12.8/scala-reflect-2.12.8.jar", "source": {"sha1": "2b4a5bbdc19f8ab34d474f30dbca957addc8ae09", "sha256": "5c676791217d9b48560496556b8965cceabcbfdbb65bbebdc52e99c0a3847735", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/scala-lang/scala-reflect/2.12.8/scala-reflect-2.12.8-sources.jar"} , "name": "org_scala_lang_scala_reflect", "actual": "@org_scala_lang_scala_reflect//jar", "bind": "jar/org/scala_lang/scala_reflect"},
    {"artifact": "org.scalaz:scalaz-core_2.12:7.2.8", "lang": "java", "sha1": "2922d47f6dc7aba452634fe674087b6221b90dbf", "sha256": "3e4360e34b70370d90277da30c904dc41435404a7b352d492f8c6bfb9e91fe84", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/scalaz/scalaz-core_2.12/7.2.8/scalaz-core_2.12-7.2.8.jar", "source": {"sha1": "c94295a434f26b5650ec0fcbf93c9d2c7aada88e", "sha256": "dfc671456fe611686d6a7cc99797f56951601867f162fefe3202bbf3cc4eb6fe", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/scalaz/scalaz-core_2.12/7.2.8/scalaz-core_2.12-7.2.8-sources.jar"} , "name": "org_scalaz_scalaz_core_2_12", "actual": "@org_scalaz_scalaz_core_2_12//jar", "bind": "jar/org/scalaz/scalaz_core_2_12"},
    {"artifact": "org.slf4j:slf4j-api:1.7.25", "lang": "java", "sha1": "da76ca59f6a57ee3102f8f9bd9cee742973efa8a", "sha256": "18c4a0095d5c1da6b817592e767bb23d29dd2f560ad74df75ff3961dbde25b79", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/slf4j/slf4j-api/1.7.25/slf4j-api-1.7.25.jar", "source": {"sha1": "962153db4a9ea71b79d047dfd1b2a0d80d8f4739", "sha256": "c4bc93180a4f0aceec3b057a2514abe04a79f06c174bbed910a2afb227b79366", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/slf4j/slf4j-api/1.7.25/slf4j-api-1.7.25-sources.jar"} , "name": "org_slf4j_slf4j_api", "actual": "@org_slf4j_slf4j_api//jar", "bind": "jar/org/slf4j/slf4j_api"},
    {"artifact": "org.spire-math:jawn-parser_2.12:0.11.1", "lang": "java", "sha1": "e49f4a6294af0821d5348ad9f89a5ce8455fc1b3", "sha256": "a442dc3a1f399a0c1d5245e5b09ac292b01c5794ee303443efa3c8a625cbd6c4", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/spire-math/jawn-parser_2.12/0.11.1/jawn-parser_2.12-0.11.1.jar", "source": {"sha1": "c67e7b5df2d07cc6495237218ca03a9ffa875242", "sha256": "7541d3cbde1c37f0bc75971608d717a9223bb8dd879c96fc0256718eed4220dd", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/spire-math/jawn-parser_2.12/0.11.1/jawn-parser_2.12-0.11.1-sources.jar"} , "name": "org_spire_math_jawn_parser_2_12", "actual": "@org_spire_math_jawn_parser_2_12//jar", "bind": "jar/org/spire_math/jawn_parser_2_12"},
    {"artifact": "org.typelevel:cats-core_2.12:1.0.1", "lang": "java", "sha1": "5872b9db29c3e1245f841ac809d5d64b9e56eaa1", "sha256": "9e1d264f3366f6090b17ebdf4fab7488c9491a7c82bc400b1f6ec05f39755b63", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/typelevel/cats-core_2.12/1.0.1/cats-core_2.12-1.0.1.jar", "source": {"sha1": "a59993540e8aaa8b7b5941642665e69e0748b08f", "sha256": "343630226130389da2a040c1ee16fc1e0c4be625b19b2591763e0d20236a3b9f", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/typelevel/cats-core_2.12/1.0.1/cats-core_2.12-1.0.1-sources.jar"} , "name": "org_typelevel_cats_core_2_12", "actual": "@org_typelevel_cats_core_2_12//jar", "bind": "jar/org/typelevel/cats_core_2_12"},
    {"artifact": "org.typelevel:cats-kernel_2.12:1.0.1", "lang": "java", "sha1": "977ec6bbc1677502d0f6c26beeb0e5ee6c0da0ad", "sha256": "d87025b6fb7f403d767f6fa726c1626c9c713927bdc6b2a58ac07a32fec7490d", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/typelevel/cats-kernel_2.12/1.0.1/cats-kernel_2.12-1.0.1.jar", "source": {"sha1": "b26244b22edd48e9173e1cae03d01244d597330d", "sha256": "4cfb3519fc4c7c6da339c614704cee1a9fa89357821ad9626b662dc7b5b963b9", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/typelevel/cats-kernel_2.12/1.0.1/cats-kernel_2.12-1.0.1-sources.jar"} , "name": "org_typelevel_cats_kernel_2_12", "actual": "@org_typelevel_cats_kernel_2_12//jar", "bind": "jar/org/typelevel/cats_kernel_2_12"},
    {"artifact": "org.typelevel:cats-macros_2.12:1.0.1", "lang": "java", "sha1": "89374609c1ffe142c7fec887883aff779befb101", "sha256": "c17a5625d9a203fa4676cb80ba22f65e68d18497945d24370bac9123ddc3da28", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/typelevel/cats-macros_2.12/1.0.1/cats-macros_2.12-1.0.1.jar", "source": {"sha1": "412d4e8cae3b7aeca5e841712ef57ec614d01c4e", "sha256": "456b745024e4836a78967f9edb9e5db09a7af352ad161b44188960be90d22702", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/typelevel/cats-macros_2.12/1.0.1/cats-macros_2.12-1.0.1-sources.jar"} , "name": "org_typelevel_cats_macros_2_12", "actual": "@org_typelevel_cats_macros_2_12//jar", "bind": "jar/org/typelevel/cats_macros_2_12"},
    {"artifact": "org.typelevel:machinist_2.12:0.6.2", "lang": "java", "sha1": "a0e8521deafd0d24c18460104eee6ce4c679c779", "sha256": "b7e97638fa25ba02414b9b8387e9ecc2ea2fce4c9d9068ac3108ee5718b477a9", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/typelevel/machinist_2.12/0.6.2/machinist_2.12-0.6.2.jar", "source": {"sha1": "98df07f657cb11f112eb84070da52e3951461ab6", "sha256": "739d6899f54e3c958d853622aec7e5198a719a2906faa50199189b0289ebef83", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/typelevel/machinist_2.12/0.6.2/machinist_2.12-0.6.2-sources.jar"} , "name": "org_typelevel_machinist_2_12", "actual": "@org_typelevel_machinist_2_12//jar", "bind": "jar/org/typelevel/machinist_2_12"},
    {"artifact": "org.typelevel:macro-compat_2.12:1.1.1", "lang": "java", "sha1": "ed809d26ef4237d7c079ae6cf7ebd0dfa7986adf", "sha256": "8b1514ec99ac9c7eded284367b6c9f8f17a097198a44e6f24488706d66bbd2b8", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/typelevel/macro-compat_2.12/1.1.1/macro-compat_2.12-1.1.1.jar", "source": {"sha1": "ade6d6ec81975cf514b0f9e2061614f2799cfe97", "sha256": "c748cbcda2e8828dd25e788617a4c559abf92960ef0f92f9f5d3ea67774c34c8", "repository": "https://repo.maven.apache.org/maven2", "url": "https://repo.maven.apache.org/maven2/org/typelevel/macro-compat_2.12/1.1.1/macro-compat_2.12-1.1.1-sources.jar"} , "name": "org_typelevel_macro_compat_2_12", "actual": "@org_typelevel_macro_compat_2_12//jar", "bind": "jar/org/typelevel/macro_compat_2_12"},
    ]

def maven_dependencies(callback = jar_artifact_callback):
    for hash in list_dependencies():
        callback(hash)
