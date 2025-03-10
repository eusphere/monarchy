package monarchy.graphql

import java.util.UUID
import monarchy.game._
import monarchy.streaming.core._

object DirectionResolver extends Resolver[Unit, Selection] {
  override def apply(in: In): Out = {
    val args = in.arg(GqlArgs.Direction)
    val commit = PhaseCommit(
      input = in,
      gameId = UUID.fromString(args.gameId),
      event = ctx => GameChange(ctx.gameId, "DIR")
    )
    commit { ctx =>
      val direction = Vec(args.direction.i, args.direction.j)
      ctx.game.directionSelect(ctx.playerId, direction)
    }
  }
}
