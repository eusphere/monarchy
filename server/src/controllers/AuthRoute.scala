package monarchy.controllers

import akka.http.scaladsl.model._
import akka.http.scaladsl.model.headers.HttpCookiePair
import akka.http.scaladsl.server._
import io.jsonwebtoken.{Jwts, MalformedJwtException, SignatureException}
import java.net.URLDecoder
import java.util.UUID
import monarchy.auth._
import monarchy.dal.{QueryClient, PostgresProfile, User}
import scala.concurrent.{Future, ExecutionContext}
import scala.util.{Try, Success, Failure}

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
      case Some((userId, bearerToken)) => fetch(userId).map {
        // Missing authentication information
        case None => NullAuth
        case Some(user) =>
          val parser = Jwts.parser.setSigningKey(user.secret)
          val subjectMaybe = Try(parser.parseClaimsJws(bearerToken).getBody.getSubject)
          subjectMaybe match {
            // Passed all challenges.
            case Success(subject) if subject == userId.toString => Authenticated(user)
            case Success(_) => NullAuth
            case Failure(_: MalformedJwtException) => NullAuth
            case Failure(_: SignatureException) => NullAuth
            case Failure(e) => throw e
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

  private[controllers] def headers(hs: Seq[HttpHeader]): Option[(UUID, String)] =
    hs.find(_.is("authorization")).flatMap(h => extract(h.value))

  private[controllers] def cookies(cs: Seq[HttpCookiePair]): Option[(UUID, String)] =
    cs.find(_.name == AuthorizationKey)
      .flatMap(c => Try(URLDecoder.decode(c.value, "UTF-8")).toOption)
      .flatMap(extract)

  private def extract(authorization: String): Option[(UUID, String)] = {
    val bearer = authorization.stripPrefix("Bearer ")
    Untrusted.extractUserId(bearer).toOption.map(userId => (userId, bearer))
  }
}
