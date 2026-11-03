package monarchy.controllers

import akka.http.scaladsl.model._
import java.net.URI
import monarchy.auth.oauth2.ExchangeClient
import monarchy.util.Json
import scala.concurrent.{ExecutionContext, Future}
import scala.util.Try

class DiscordAuthorizeController(
    allowedOrigins: Set[String]
)(implicit
    ec: ExecutionContext,
    exchangeCli: ExchangeClient
) extends GetController {
  import DiscordAuthorizeController._

  def action(ctx: AuthContext): Future[HttpResponse] = {
    val query = Uri.Query(ctx.request.request.uri.rawQueryString)
    val callerContext = mkCallerContext(query, allowedOrigins)
    val contextJson = Json.stringify(callerContext)
    exchangeCli.fetchAuthorizeUrl(contextJson).map { url =>
      HttpResponse(StatusCodes.TemporaryRedirect, headers = List(headers.Location(url)))
    }
  }
}

object DiscordAuthorizeController {
  private[controllers] def isLocal: Boolean =
    sys.env.get("ENV").forall(_ == "local")

  /**
   * A caller context defines under what conditions the authorization flow is
   * initiated. This can have important UX implications. We can later add 
   * support for some custom base 64 data here as well.
   *
   * @param referrerUrl the URL of the calling client, if any
   * @param embedded whether the caller is embedded on the OS (aka native app)
   */
  case class CallerContext(referrerUrl: String, embedded: Boolean)

  private def mkCallerContext(
      query: Uri.Query,
      allowedOrigins: Set[String]
  ): CallerContext = {
    val referrerUrl = query
      .get("referrer")
      .flatMap(raw => safeReferrer(raw, allowedOrigins))
      .getOrElse(mkBaseUrl)
    val embedded = query.get("embedded").nonEmpty
    CallerContext(referrerUrl = referrerUrl, embedded = embedded)
  }

  /**
    * OAuth completion redirects must stay on an application origin. The
    * original value is still preserved so the client can return to its page,
    * but arbitrary origins are rejected to prevent phishing redirects.
    */
  private def safeReferrer(
      raw: String,
      allowedOrigins: Set[String]
  ): Option[String] = {
    Try(new URI(raw)).toOption.filter { uri =>
      Option(uri.getUserInfo).isEmpty &&
      allowedOrigins.contains(originOf(uri))
    }.map(_ => raw)
  }

  private def originOf(uri: URI): String = {
    val port = if (uri.getPort == -1) "" else s":${uri.getPort}"
    s"${uri.getScheme}://${uri.getHost}$port"
  }

  private[controllers] def mkBaseUrl: String =
    sys.env.getOrElse("WEB_BASE_URL", "http://localhost:5173")
}
