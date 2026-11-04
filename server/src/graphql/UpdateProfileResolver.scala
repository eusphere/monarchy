package monarchy.graphql

import monarchy.dal
import scala.concurrent.Future

object UpdateProfileResolver extends Resolver[Unit, dal.User] {
  import dal.PostgresProfile.Implicits._

  private val UsernameInUseMessage = "That username is already in use"
  private val InvalidUsernameMessage = "Username must be 3-20 letters, numbers, or underscores"

  override def apply(in: In): Out = {
    import in.ctx._
    val userId = expectUserId(in)
    val username = in.arg(GqlArgs.UpdateProfile).username.trim

    if (!username.matches(dal.User.UsernamePattern)) {
      Future.failed(Exceptions.BadArgs(InvalidUsernameMessage))
    } else {
      val existing = queryCli.first(
        dal.User.query.filter(_.username === username).filterNot(_.id === userId)
      )
      existing.flatMap {
        case Some(_) => Future.failed(Exceptions.BadArgs(UsernameInUseMessage))
        case None =>
          val update = dal.User.query.filter(_.id === userId).map(_.username).update(username)
          queryCli.write(update).flatMap { _ =>
            queryCli.first(dal.User.query.filter(_.id === userId)).map {
              case Some(user) => user
              case None => throw Exceptions.NotFound("User not found")
            }
          }.recoverWith {
            case dal.Exception.DuplicateKey("username", _) =>
              Future.failed(Exceptions.BadArgs(UsernameInUseMessage))
          }
      }
    }
  }
}
