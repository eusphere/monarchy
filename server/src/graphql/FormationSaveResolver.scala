package monarchy.graphql

import monarchy.dal
import monarchy.dalwrite.WriteQueryBuilder
import monarchy.game.{PieceConf, Vec}
import monarchy.marshalling.game.{FormationSerialization, PieceConfStringBijection}
import monarchy.streaming.process.ChallengeAcceptProcessor
import scala.concurrent.Future
import scala.util.Try

object FormationSaveResolver extends Resolver[Unit, Boolean] {
  import dal.PostgresProfile.Implicits._

  override def apply(in: In): Out = {
    import in.ctx._
    val userId = expectUserId(in)
    val entries = in.arg(GqlArgs.FormationSave).formation
    val coordinates = entries.map(entry => (entry.point.i, entry.point.j))

    if (coordinates.distinct.size != coordinates.size) {
      Future.failed(Exceptions.BadArgs("A formation cannot contain duplicate coordinates"))
    } else {
      Try(entries.map { entry =>
        val piece: PieceConf = PieceConfStringBijection.invert(entry.piece)
        Vec(entry.point.i, entry.point.j) -> piece
      }).fold(
        error => Future.failed(Exceptions.BadArgs(s"Unknown piece configuration: ${error.getMessage}")),
        parsed => {
          queryCli.first(dal.Formation.query.filter(_.userId === userId)).flatMap {
            case Some(existing) if parsed == ChallengeAcceptProcessor.DefaultFormation =>
              queryCli.write(WriteQueryBuilder.delete(existing)).map(_ => true)
            case Some(existing) =>
              queryCli.write(WriteQueryBuilder.put(existing.copy(data = FormationSerialization.stringify(parsed)))).map(_ => true)
            case None if parsed == ChallengeAcceptProcessor.DefaultFormation => Future.successful(true)
            case None =>
              queryCli.write(WriteQueryBuilder.put(dal.Formation(
                userId = userId,
                data = FormationSerialization.stringify(parsed),
              ))).map(_ => true)
          }
        }
      )
    }
  }
}
