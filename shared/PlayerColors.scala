package monarchy.shared

import java.util.UUID

object PlayerColors {
  val representativeIndex: Int = 3

  // Enamel-tone proposal: eight perceptual families with eight distinct shades each.
  // Keep this source and the generated TypeScript in git; see shared/README.md.
  val families: Vector[Vector[String]] = Vector(
    Vector("#96505f", "#aa5766", "#bc5f6c", "#cf6872", "#d8787b", "#de8582", "#e3928b", "#e89f93"),
    Vector("#925a2d", "#a36328", "#b26e26", "#c17924", "#c8893c", "#cc964e", "#d0a260", "#d3ae71"),
    Vector("#6a6e25", "#737c24", "#7a892a", "#82972f", "#89a54c", "#8fae61", "#96b874", "#9dc186"),
    Vector("#39784d", "#348757", "#309564", "#2ca470", "#40af84", "#52b793", "#63bfa1", "#73c7b0"),
    Vector("#09787a", "#04858a", "#0e919b", "#079fab", "#07abbf", "#36b3c9", "#54bbd2", "#6dc2db"),
    Vector("#2f6f9b", "#337ab0", "#3e85c4", "#4790d8", "#629be1", "#74a3e6", "#86acea", "#97b4ee"),
    Vector("#66609d", "#7468b0", "#8371c1", "#927ad2", "#a387d8", "#ae91db", "#b99bde", "#c5a5e0"),
    Vector("#865485", "#985b93", "#aa639f", "#bc6cab", "#c87ab1", "#d185b5", "#d891b9", "#e09dbd")
  )

  val values: Vector[String] = families.flatten
  val allowed: Set[String] = values.toSet

  def forUser(userId: UUID): String =
    values(Math.floorMod(userId.hashCode, values.size))
}
