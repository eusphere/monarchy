package monarchy.shared

import java.util.UUID
import monarchy.util.Json
import scala.util.Using

object PlayerColors {
  val families: Vector[Vector[String]] = Using.resource(
    scala.io.Source.fromInputStream(getClass.getResourceAsStream("/player-colors.json"))
  )(source => Json.parse[Vector[Vector[String]]](source.mkString))

  val values: Vector[String] = families.flatten
  val allowed: Set[String] = values.toSet

  def forUser(userId: UUID): String =
    values(Math.floorMod(userId.hashCode, values.size))
}
