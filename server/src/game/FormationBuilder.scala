package monarchy.game

import java.util.UUID

/** Builds the board used to edit a player's formation. */
object FormationBuilder {
  val Width = 5
  val Depth = 11

  def apply(userId: UUID, formation: Player.Formation): Board = {
    val points = for {
      i <- 0 until Depth
      j <- 0 until Width
      if legal(i, j)
    } yield Vec(i, j)
    val pieces = formation.map { case (point, conf) =>
      val id = PieceId(UUID.nameUUIDFromBytes(s"formation:${userId}:${point.i}:${point.j}".getBytes))
      PieceAdd(point, PieceBuilder(id, conf, PlayerId(userId), Vec.J))
    }
    Board(points.map(Tile(_))).commitAggregation(pieces)
  }

  private def legal(i: Int, j: Int): Boolean =
    !((i == 0 || i == Depth - 1) && j < 2) &&
      !((i == 1 || i == Depth - 2) && j == 0)
}
