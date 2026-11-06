package monarchy.graphql

import java.util.UUID
import monarchy.dal
import monarchy.dalwrite._
import monarchy.game.Player
import monarchy.marshalling.game.FormationSerialization
import monarchy.streaming.core._
import monarchy.streaming.process.{ChallengeAcceptProcessor, _}
import monarchy.util.{Async, Json}
import scala.concurrent.{ExecutionContext, Future}

object ChallengeAcceptResolver extends Resolver[Unit, dal.Game] {
  import dal.PostgresProfile.Implicits._

  private def formationsFor(userIds: Seq[UUID])(implicit
    queryCli: dal.QueryClient,
    ec: ExecutionContext,
  ): Future[Map[UUID, Player.Formation]] = {
    queryCli.all(dal.Formation.query.filter(_.userId inSet userIds)).map { formations =>
      formations
        .map(formation => formation.userId -> FormationSerialization.parse(formation.data))
        .toMap
        .withDefaultValue(ChallengeAcceptProcessor.DefaultFormation)
    }
  }

  override def apply(in: In): Out = {
    import in.ctx._
    val userId = expectUserId(in)
    val opponentId = UUID.fromString(in.arg(GqlArgs.ChallengeAccept).opponentId)
    if (userId == opponentId) throw new IllegalArgumentException("cannot challenge yourself")
    val ownKey = StreamingKey.Challenge(userId)
    val opponentKey = StreamingKey.Challenge(opponentId)
    redisCli.get[String](opponentKey).flatMap {
      case Some(_) =>
        val processor = new ChallengeAcceptProcessor
        val userIds = Seq(userId, opponentId)
        formationsFor(userIds).flatMap { formations =>
          processor.create(userIds, formations).flatMap { gameId =>
            Async.join(
              redisCli.del(ownKey, opponentKey),
              redisCli.publish(StreamingChannel.Matchmaking, Json.stringify(Matchmaking(true))),
              redisCli.publish(StreamingChannel.gameCreate(userId), Json.stringify(GameCreate(gameId))),
              redisCli.publish(StreamingChannel.gameCreate(opponentId), Json.stringify(GameCreate(gameId)))
            ).flatMap(_ => queryCli.first(dal.Game.query.filter(_.id === gameId)))
              .map(_.getOrElse(throw NotFound(s"game $gameId")))
          }
        }
      case _ => throw NotFound("challenge has expired or is no longer available")
    }
  }

  private def formationsFor(userIds: Seq[UUID])(implicit
    queryCli: dal.QueryClient,
    ec: ExecutionContext,
  ): Future[Map[UUID, Player.Formation]] = {
    queryCli.all(dal.Formation.query.filter(_.userId inSet userIds)).map { formations =>
      formations
        .map(formation => formation.userId -> FormationSerialization.parse(formation.data))
        .toMap
        .withDefaultValue(ChallengeAcceptProcessor.DefaultFormation)
    }
  }
}
