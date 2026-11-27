package monarchy.graphql

import monarchy.dal
import monarchy.dalwrite.WriteQueryBuilder
import scala.concurrent.Future

object UpdateProfileResolver extends Resolver[Unit, dal.User] {
  import dal.PostgresProfile.Implicits._

  override def apply(in: In): Out = {
    import in.ctx._
    val userId = expectUserId(in)
    val update = in.arg(GqlArgs.ProfileUpdate)
    val username = update.username.map(_.trim)
    val color = update.color.map(_.toLowerCase)

    if (username.exists(!_.matches(dal.User.UsernamePattern))) {
      Future.failed(Exceptions.BadArgs("Username must be 3-20 letters, numbers, or underscores"))
    } else if (color.exists(!_.matches("#[0-9a-f]{6}"))) {
      Future.failed(Exceptions.BadArgs("Color must be a six-digit hex value"))
    } else {
      val write = for {
        user <- dal.User.query.filter(_.id === userId).result.headOption.flatMap {
          case Some(user) => DBIO.successful(user)
          case None => DBIO.failed(Exceptions.NotFound("User not found"))
        }
        updatedUser <- username.fold[DBIO[dal.User]](DBIO.successful(user))(name =>
          WriteQueryBuilder.put(user.copy(username = name)))
        _ <- color.fold[DBIO[Unit]](DBIO.successful(())) { value =>
          dal.Profile.query.filter(_.userId === userId).result.headOption.flatMap { profile =>
            val next = profile.getOrElse(dal.Profile(userId = userId, avatar = "", color = value))
            WriteQueryBuilder.put(next.copy(color = value, updatedAt = java.time.Instant.now)).map(_ => ())
          }
        }
      } yield updatedUser
      queryCli.write(write).recoverWith {
        case dal.Exception.DuplicateKey("username", _) =>
          Future.failed(Exceptions.BadArgs("That username is already in use"))
      }
    }
  }
}
