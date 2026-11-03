package monarchy.controllers

import akka.http.scaladsl.model._
import akka.http.scaladsl.model.headers.HttpCookiePair
import akka.http.scaladsl.server._
import java.net.URLDecoder
import java.util.UUID
import monarchy.auth.{Auth, AuthFilter, Authenticated, NullAuth, Tooling}
import monarchy.dal.{QueryClient, PostgresProfile, User}
import scala.concurrent.{Future, ExecutionContext}
import scala.util.{Failure, Success}

case class AuthRoute[T](filter: AuthFilter, controller: AuthController)(implicit
  ec: ExecutionContext,
  queryCli: QueryClient
) extends Route {
  import AuthRoute._

  override def apply(ctx: RequestContext): Future[RouteResult] = {
    fetchAuth(ctx).flatMap { auth =>
      filter(auth) match {
        case false => ctx.complete(Future.successful(Reject))
        case true => controller(AuthContext(auth, ctx))
      }
    }
  }

  def fetchAuth(ctx: RequestContext): Future[Auth] = {
    val authLookup = headers(ctx.request.headers).orElse(cookies(ctx.request.cookies))
    authLookup match {
      case Some(bearerToken) =>
        Tooling.parseSubject(bearerToken) match {
          case Failure(_) => Future.successful(NullAuth)
          case Success(userId) => fetch(userId).map {
            case None => NullAuth
            case Some(user) => Authenticated(user)
          }
        }
      // Missing authentication information
      case None => Future.successful(NullAuth)
    }
  }

  def fetch(userId: UUID): Future[Option[User]] = {
    import PostgresProfile.Implicits._
    queryCli.first(User.query.filter(_.id === userId))
  }
}

object AuthRoute {
  val AuthorizationKey = "Authorization"
  val Reject = HttpResponse(StatusCodes.Unauthorized)

  private def headers(hs: Seq[HttpHeader]): Option[String] =
    extract(hs.map { h => h.name -> normalize(h.value) }.toMap)

  private def cookies(cs: Seq[HttpCookiePair]): Option[String] =
    extract(cs.map { c => c.name -> normalize(c.value) }.toMap)

  private def extract(props: Map[String, String]): Option[String] =
    props.get(AuthorizationKey).map(_.stripPrefix("Bearer "))

  private def normalize(raw: String): String =
    URLDecoder.decode(raw, "UTF-8")
}
