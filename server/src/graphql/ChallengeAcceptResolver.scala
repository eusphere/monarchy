package monarchy.graphql

import java.util.UUID
import monarchy.dal
import monarchy.dalwrite._
import monarchy.marshalling.game.FormationSerialization
import monarchy.streaming.core._
import monarchy.streaming.process.{ChallengeAcceptProcessor, _}
import monarchy.util.{Async, Json}
import scala.concurrent.Future

object ChallengeAcceptResolver extends Resolver[Unit, dal.Game] {
  import dal.PostgresProfile.Implicits._

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
        queryCli.all(dal.Formation.query.filter(_.userId inSet userIds)).flatMap { formations =>
          val saved = formations.map(f => f.userId -> FormationSerialization.parse(f.data)).toMap
          val selected = userIds.map(id => id -> saved.getOrElse(id, ChallengeAcceptProcessor.DefaultFormation)).toMap
          processor.create(userIds, selected).flatMap { gameId =>
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
}
