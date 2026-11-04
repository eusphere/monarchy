package monarchy.graphql

import java.util.UUID
import monarchy.dal
import monarchy.dalwrite._
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
        processor.create(Seq(userId, opponentId)).flatMap { gameId =>
          Async.join(
            redisCli.del(ownKey, opponentKey),
            redisCli.publish(StreamingChannel.Matchmaking, Json.stringify(Matchmaking(true))),
            redisCli.publish(StreamingChannel.gameCreate(userId), Json.stringify(GameCreate(gameId))),
            redisCli.publish(StreamingChannel.gameCreate(opponentId), Json.stringify(GameCreate(gameId)))
          ).flatMap(_ => queryCli.first(dal.Game.query.filter(_.id === gameId)))
            .map(_.getOrElse(throw NotFound(s"game $gameId")))
        }
      case _ => throw NotFound("challenge has expired or is no longer available")
    }
  }
}
