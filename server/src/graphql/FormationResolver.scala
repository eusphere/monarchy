package monarchy.graphql

import monarchy.dal
import monarchy.game.Vec
import monarchy.marshalling.game.FormationSerialization
import monarchy.streaming.process.ChallengeAcceptProcessor
import scala.concurrent.Future

object FormationResolver extends Resolver[Unit, Seq[FormationEntry]] {
  import dal.PostgresProfile.Implicits._

  override def apply(in: In): Out = {
    import in.ctx._
    val userId = expectUserId(in)
    queryCli.first(dal.Formation.query.filter(_.userId === userId)).map { formation =>
      formation
        .map(value => FormationSerialization.parse(value.data))
        .getOrElse(ChallengeAcceptProcessor.DefaultFormation)
        .map { case (point, piece) => FormationEntry(point, piece.toString) }
    }
  }
}

case class FormationEntry(point: Vec, piece: String)
