package monarchy.graphql

import java.util.UUID
import monarchy.auth.Authenticated
import monarchy.dal
import monarchy.game
import monarchy.marshalling.game.GameStringDeserializer
import monarchy.util.Json
import sangria.schema._
import scala.concurrent.ExecutionContext

object QuerySchema {
  import CommonSchema._

  // Some sub-types are keyed on the same UUID as the parent type. To placate
  // the relay runtime, we send a hash of the UUID and the namespace to the
  // client instead. These IDs are read-only.
  def namespaceUUID(uuid: UUID, namespace: String): String = {
    val bytes = uuid.toString.getBytes
    val namespaceBytes = namespace.getBytes
    val combinedBytes = (namespaceBytes ++ bytes).toArray
    UUID.nameUUIDFromBytes(combinedBytes).toString
  }

  lazy val Def = ObjectType(
    "Query",
    fields[GraphqlContext, Unit](
      Field("self", UserType,
        resolve = { node =>
          node.ctx.auth match {
            case Authenticated(user) => user
            case _ => throw new Exceptions.Unauthorized("Not authenticated")
          }
        }
      ),
      Field("user", OptionType(UserType),
        arguments = List(GqlArgs.Id),
        resolve = { node =>
          import dal.PostgresProfile.Implicits._
          val id = UUID.fromString(node.arg(GqlArgs.Id))
          val query = dal.User.query.filter(_.id === id)
          node.ctx.queryCli.first(query)
        }
      ),
      Field("game", OptionType(GameType),
        arguments = List(GqlArgs.Id),
        resolve = { node =>
          import dal.PostgresProfile.Implicits._
          val id = UUID.fromString(node.arg(GqlArgs.Id))
          val query = dal.Game.query.filter(_.id === id)
          node.ctx.queryCli.first(query)
        }
      ),
      Field("games", ListType(GameType),
        arguments = List(GqlArgs.Games),
        resolve = { node =>
          import dal.PostgresProfile.Implicits._
          val userId = UUID.fromString(node.arg(GqlArgs.Games).userId)
          val query = dal.Player.query
            .filter(_.userId === userId)
            .join(dal.Game.query).on(_.gameId === _.id)
            .map(_._2)
            .sortBy(_.createdAt.desc)
          node.ctx.queryCli.all(query)
        }
      ),
      Field("lobby", LobbyType, resolve = LobbyResolver),
      Field("effects", ListType(EffectType), arguments = List(GqlArgs.Attack), resolve = EffectsResolver),
    )
  )

  lazy val ProfileType = ObjectType(
    "Profile",
    fields[GraphqlContext, dal.Profile](
      Field("avatar", StringType, resolve = _.value.avatar),
      Field("color", StringType, resolve = _.value.color),
    )
  )

  lazy val UserType = ObjectType(
    "User",
    fields[GraphqlContext, dal.User](
      Field("id", StringType, resolve = _.value.id.toString),
      Field("username", StringType, resolve = _.value.username),
      Field("rating", IntType, resolve = _.value.rating),
      Field("profile", OptionType(ProfileType), resolve = { node =>
        import dal.PostgresProfile.Implicits._
        val userId = node.value.id
        val query = dal.Profile.query.filter(_.userId === userId)
        node.ctx.queryCli.first(query)
      })
    )
  )

  lazy val PlayerStatusType =
    EnumUtil.mkEnum[dal.PlayerStatus]("PlayerStatus", dal.PlayerStatus.values.toSet)

  lazy val PlayerType = ObjectType(
    "Player",
    fields[GraphqlContext, dal.Player](
      Field("id", StringType, resolve = _.value.id.toString),
      Field("status", PlayerStatusType, resolve = _.value.status),
      Field("rating", IntType, resolve = _.value.rating),
      Field("ratingDelta", OptionType(IntType), resolve = _.value.ratingDelta),
      Field("user", OptionType(UserType), resolve = { node =>
        import dal.PostgresProfile.Implicits._
        val userId = node.value.userId
        val query = dal.User.query.filter(_.id === userId)
        node.ctx.queryCli.first(query)
      })
    )
  )

  lazy val GameStatusType =
    EnumUtil.mkEnum[dal.GameStatus]("GameStatus", dal.GameStatus.values.toSet)

  lazy val GameType = ObjectType(
    "Game",
    fields[GraphqlContext, dal.Game](
      Field("id", StringType, resolve = _.value.id.toString),
      Field("status", GameStatusType, resolve = _.value.status),
      Field("selfStatus", OptionType(PlayerStatusType), resolve = { node =>
        import dal.PostgresProfile.Implicits._
        val gameId = node.value.id
        val query = dal.Player.query
          .filter(_.gameId === gameId)
          .filter(_.userId === node.ctx.userId)
          .map(_.status)
          .result
          .headOption
        node.ctx.queryCli.read(query)
      }),
      Field("createdAt", StringType, resolve = _.value.createdAt.toString),
      Field("players", ListType(PlayerType), resolve = { node =>
        import dal.PostgresProfile.Implicits._
        val gameId = node.value.id
        val query = dal.Player.query.filter(_.gameId === gameId)
        node.ctx.queryCli.all(query)
      }),
      Field("state", OptionType(GameStateType), resolve = { node =>
        import node.ctx.executionContext
        import GameStringDeserializer._
        val gameId = node.value.id
        node.ctx.redisCli.get[game.Game](s"monarchy/streaming/game/$gameId")
      })
    )
  )

  lazy val GameStateType = ObjectType(
    "GameState",
    fields[GraphqlContext, game.Game](
      Field("currentPlayerId", StringType, resolve = _.value.currentPlayer.id.id.toString),
      Field("currentSelection", SelectionType, resolve = ctx => Selection(ctx.value)),
      Field("tiles", ListType(TileType), resolve = _.value.board.tiles)
    )
  )

  lazy val TileType =  ObjectType(
    "Tile",
    fields[GraphqlContext, game.Tile](
      Field("point", VecType, resolve = _.value.point),
      Field("piece", OptionType(PieceType), resolve = _.value.piece)
    )
  )

  lazy val ChallengeType = ObjectType(
    "Challenge",
    fields[GraphqlContext, Challenge.Data](
      Field("host", QuerySchema.UserType, resolve = _.value.host),
      Field("expireAt", OptionType(StringType), resolve = _.value.expireAt.toString),
    )
  )

  lazy val LobbyType = ObjectType(
    "Lobby",
    fields[GraphqlContext, Lobby.Data](
      Field("usersOnline", ListType(UserType), resolve = _.value.online),
      Field("challenges", ListType(ChallengeType), resolve = _.value.challenges),
    )
  )

  lazy val EffectType = ObjectType(
    "Effect",
    fields[GraphqlContext, game.EffectLocation](
      Field("point", VecType, resolve = _.value.point),
    )
  )
}
