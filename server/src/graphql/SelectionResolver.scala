package monarchy.graphql

import com.typesafe.scalalogging.StrictLogging
import java.util.UUID
import monarchy.game._
import monarchy.marshalling.game.{GameJson, GameStringDeserializer}
import monarchy.streaming.core._
import monarchy.util.{Async, Json}
import scala.concurrent.Future

trait SelectionResolver extends Resolver[Unit, Selection] with StrictLogging {
  import GameStringDeserializer._

  // Define the selection mutation
  def extractGameId(in: In): UUID
  def extractPoint(in: In): Vec
  def change(game: Game, playerId: PlayerId, point: Vec): Change[Game]

  override def apply(in: In): Out = {
    val commit = PhaseCommit(
      input = in,
      gameId = extractGameId(in),
      event = ctx => GameChange(ctx.gameId, "SELECT")
    )
    commit { ctx =>
      val point = extractPoint(in)
      val noop = ctx.game.currentSelection.contains(point)
      if (noop) Accept(ctx.game)
      else change(ctx.game, ctx.playerId, point)
    }
  }
}

object SelectResolver extends SelectionResolver {
  override def extractGameId(in: In) =
    UUID.fromString(in.arg(GqlArgs.Select).gameId)

  override def extractPoint(in: In) = {
    val VecQuery(i, j) = in.arg(GqlArgs.Select).point
    Vec(i, j)
  }

  override def change(game: Game, playerId: PlayerId, point: Vec): Change[Game] =
    game.tileSelect(playerId, point)
}

object DeselectResolver extends SelectionResolver {
  override def extractGameId(in: In) =
    UUID.fromString(in.arg(GqlArgs.Deselect).gameId)

  override def extractPoint(in: In) = Vec.Zero

  override def change(game: Game, playerId: PlayerId, point: Vec): Change[Game] =
    game.tileDeselect(playerId)
}
