package monarchy.graphql

import monarchy.dal
import monarchy.game.{Board, FormationBuilder}
import monarchy.marshalling.game.FormationSerialization
import monarchy.streaming.process.ChallengeAcceptProcessor
import scala.concurrent.Future

object FormationResolver extends Resolver[Unit, Formation] {
  import dal.PostgresProfile.Implicits._

  override def apply(in: In): Out = {
    import in.ctx._
    val userId = expectUserId(in)
    queryCli.first(dal.Formation.query.filter(_.userId === userId)).map { saved =>
      val formation = saved
        .map(value => FormationSerialization.parse(value.data))
        .getOrElse(ChallengeAcceptProcessor.DefaultFormation)
      Formation(saved.map(_.id).getOrElse(Formation.DefaultId), FormationBuilder(userId, formation))
    }
  }
}

case class Formation(id: java.util.UUID, board: Board)

object Formation {
  val DefaultId = java.util.UUID.fromString("00000000-0000-0000-0000-000000000000")
}
