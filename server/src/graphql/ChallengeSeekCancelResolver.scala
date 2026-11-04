package monarchy.graphql

import monarchy.streaming.core._
import monarchy.util.{Async, Json}

object ChallengeSeekCancelResolver extends Resolver[Unit, Boolean] {
  override def apply(in: In): Out = {
    import in.ctx._
    val userId = expectUserId(in)
    Async.join(
      redisCli.del(StreamingKey.Challenge(userId)),
      redisCli.publish(StreamingChannel.Matchmaking, Json.stringify(Matchmaking(true)))
    ).map(_ => true)
  }
}
