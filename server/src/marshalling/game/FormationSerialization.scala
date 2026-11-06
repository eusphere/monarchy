package monarchy.marshalling.game

import monarchy.game.{Player, Vec}
import monarchy.util.Bijection

object FormationSerialization {
  case class Data(point: Vec, piece: String)

  private object FormationBijection extends Bijection[Player.Formation, Seq[Data]] {
    override def apply(formation: Player.Formation): Seq[Data] = formation.map {
      case (point, piece) => Data(point, PieceConfStringBijection(piece))
    }

    override def invert(data: Seq[Data]): Player.Formation = data.map {
      entry => entry.point -> PieceConfStringBijection.invert(entry.piece)
    }
  }

  def apply(formation: Player.Formation): Seq[Data] = FormationBijection(formation)

  def invert(data: Seq[Data]): Player.Formation = FormationBijection.invert(data)

  def stringify(formation: Player.Formation): String =
    FormationJson.stringify(apply(formation))

  def parse(data: String): Player.Formation =
    invert(FormationJson.parse[Seq[Data]](data))
}
