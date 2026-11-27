package monarchy.lib

import java.nio.charset.StandardCharsets.UTF_8
import java.nio.file.{Files, Paths}

object GeneratePlayerColors {
  def main(args: Array[String]): Unit = {
    val check = args.contains("--check")
    val paths = args.filterNot(_ == "--check")
    require(paths.length <= 1 && paths.forall(!_.startsWith("--")),
      "Usage: generate-player-colors [--check] [output-file]")
    val workspace = sys.env.get("BUILD_WORKSPACE_DIRECTORY").map(Paths.get(_))
      .getOrElse(Paths.get("").toAbsolutePath)
    val output = workspace.resolve(paths.headOption
      .getOrElse("clients/web/src/views/Profile/playerColors.ts")).normalize
    val content = PlayerColorTypescript.render
    if (check) {
      require(Files.exists(output) && Files.readString(output, UTF_8) == content,
        s"$output is out of date. Run bazel run //lib:generate-player-colors")
      println(s"Up to date: $output")
    } else {
      Files.createDirectories(output.getParent)
      Files.writeString(output, content, UTF_8)
      println(s"Generated $output")
    }
  }
}
