package monarchy.graphql

import monarchy.dal
import scala.concurrent.Future

object UpdateProfileResolver extends Resolver[Unit, dal.User] {
  import dal.PostgresProfile.Implicits._

  override def apply(in: In): Out = {
    import in.ctx._
    val userId = expectUserId(in)
    val username = in.arg(GqlArgs.UpdateProfile).username.trim

    if (!username.matches("^[a-zA-Z0-9_]{3,20}$")) {
      Future.failed(Exceptions.BadArgs("Username must be 3-20 letters, numbers, or underscores"))
    } else {
      val existing = queryCli.first(
        dal.User.query.filter(_.username === username).filterNot(_.id === userId)
      )
      existing.flatMap {
        case Some(_) => Future.failed(Exceptions.BadArgs("That username is already in use"))
        case None =>
          val update = dal.User.query.filter(_.id === userId).map(_.username).update(username)
          queryCli.write(update).flatMap { _ =>
            queryCli.first(dal.User.query.filter(_.id === userId)).map {
              case Some(user) => user
              case None => throw Exceptions.NotFound("User not found")
            }
          }.recoverWith {
            case duplicate: dal.Exception.DuplicateKey if duplicate.key == "username" =>
              Future.failed(Exceptions.BadArgs("That username is already in use"))
          }
      }
    }
  }
}
