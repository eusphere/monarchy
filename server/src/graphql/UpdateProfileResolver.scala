package monarchy.graphql

import monarchy.dal
import monarchy.dalwrite.WriteQueryBuilder
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
      queryCli.first(dal.User.query.filter(_.id === userId)).flatMap {
        case None => Future.failed(Exceptions.NotFound("User not found"))
        case Some(user) =>
          queryCli.write(WriteQueryBuilder.put(user.copy(username = username))).recoverWith {
            case dal.Exception.DuplicateKey("username", _) =>
              Future.failed(Exceptions.BadArgs(UsernameInUseMessage))
          }
      }
    }
  }
}
