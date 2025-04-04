package monarchy.graphql

import java.util.UUID
import monarchy.game._
import monarchy.streaming.core._

object EndTurnResolver extends Resolver[Unit, Selection] {
  override def apply(in: In): Out = {
    val args = in.arg(GqlArgs.EndTurn)
    val commit = PhaseCommit(
      input = in,
      gameId = UUID.fromString(args.gameId),
      event = ctx => GameChange(ctx.gameId, "END_TURN"),
      continuation = _.game.nextTurn
    )
    commit { ctx => ctx.game.endTurn(ctx.playerId) }
  }
}
