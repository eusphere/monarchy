package monarchy.users

import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}
import monarchy.auth.Tooling
import monarchy.dal
import monarchy.dalwrite.WriteQueryBuilder
import monarchy.util.Async
import monarchy.shared.PlayerColors

class Signup(implicit
    ec: ExecutionContext,
    queryCli: dal.QueryClient
) {
  import dal.PostgresProfile.Implicits._
  import Signup._
  import Flow._

  def apply(ctx: Context): Future[Result] = {
    val email = ctx.email.trim
    val username = ctx.username.trim
    if (!validEmail(email)) Future.successful(Result.Error("invalid email"))
    else if (!validUsername(username)) Future.successful(Result.Error("invalid username"))
    else {
      val existingUsername = queryCli.count(dal.User.query.filter(_.username === username)).map(_ > 0)
      val existingEmail = queryCli.count(dal.User.query.filter(_.email === email)).map(_ > 0)
      Async.join(existingUsername, existingEmail).flatMap {
        case (true, _) => Future.successful(Result.Error("username in use"))
        case (_, true) => Future.successful(Result.Error("email in use"))
        case _ =>
          val secret = Tooling.generateSecret
          val user = dal.User(email = email, username = username, secret = secret)
          val dbio = for {
            userWr <- WriteQueryBuilder.put(user)
            profileWr <- WriteQueryBuilder.put(mkProfile(userWr.id, ctx.discordId))
          } yield userWr
          queryCli.write(dbio).map { u =>
            val bearer = Tooling.issueToken(u.id)
            Result.Signup(Credentials(u, bearer, Tooling.TokenTtl))
          }
      }
    }
  }
}

object Signup {
  case class Context(
      username: String,
      email: String,
      discordId: Option[String] = None,
  )

  private def validEmail(email: String): Boolean =
    email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")

  private def validUsername(username: String): Boolean =
    username.matches(dal.User.UsernamePattern)

  private def mkProfile(userId: UUID, discordId: Option[String]): dal.Profile = {
    val color = PlayerColors.forUser(userId)
    dal.Profile(userId = userId, avatar = "Knight", color = color, discordId = discordId)
  }

}
