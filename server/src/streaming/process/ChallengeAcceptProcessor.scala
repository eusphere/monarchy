package monarchy.streaming.process

import java.util.UUID
import monarchy.dal
import monarchy.dalwrite.{GameNode, WriteQueryBuilder}
import monarchy.game._
import monarchy.marshalling.game.GameJson
import monarchy.streaming.core._
import redis.RedisClient
import scala.concurrent.{Future, ExecutionContext}

/**
 * TODO (adu): Actually solve this with some sort of mutex implementation
 * Partial impl: https://gist.github.com/abhandaru/712d4f2bfd360fe29b7ecefa81ac9c3f
 *
 * The async read/presence check then write below should be fast enough to avoid
 * most issues. We can move to something more correct as we bring on traffic.
 */
class ChallengeAcceptProcessor(implicit
  ec: ExecutionContext,
  redisCli: RedisClient,
  queryCli: dal.QueryClient
) {
  import ChallengeAcceptProcessor._
  import dal.PostgresProfile.Implicits._

  def create(userIds: Seq[UUID], formations: Map[UUID, Player.Formation]): Future[UUID] = {
    for {
      users <- queryCli.all(dal.User.query.filter(_.id inSet userIds))
      game <- createGame(users)
      liveGame <- createLiveGame(game, formations)
    } yield game.data.id
  }

  def createLiveGame(game: GameNode, formations: Map[UUID, Player.Formation] = Map.empty): Future[Boolean] = {
    val liveGame = GameBuilder(
      seed = game.data.seed,
      players = game.players.map { player =>
        Player(
          id = PlayerId(player.id),
          formation = formations.getOrElse(player.userId, DefaultFormation)
        )
      }
    )
    val liveGameRep = GameJson.stringify(liveGame)
    redisCli.set(StreamingKey.Game(game.data.id), liveGameRep)
  }

  def createGame(users: Seq[dal.User]): Future[GameNode] = {
    val seed = System.currentTimeMillis.toInt
    val game = dal.Game(seed = seed, status = dal.GameStatus.Started)
    val query = for {
      gameWr <- WriteQueryBuilder.put(game)
      playersWr <- WriteQueryBuilder.putAll(
        users.map { user =>
          dal.Player(
            gameId = gameWr.id,
            userId = user.id,
            status = dal.PlayerStatus.Playing,
            role = dal.PlayerRole.Competitor,
            rating = user.rating
          )
        }
      )
    } yield GameNode(data = gameWr, players = playersWr)
    queryCli.write(query)
  }
}

object ChallengeAcceptProcessor {
  val DefaultFormation: Player.Formation = {
    Seq(
      Vec(5, 4) -> Knight,
      Vec(4, 3) -> Pyromancer,
      Vec(6, 3) -> Scout,
      Vec(5, 2) -> Cleric
    )
  }
}
