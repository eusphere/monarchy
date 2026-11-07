package monarchy.controllers

import akka.http.scaladsl.model._
import com.typesafe.scalalogging.StrictLogging
import java.net.{URI, URLEncoder}
import monarchy.auth.oauth2.{ExchangeClient, Oauth2}
import monarchy.util.Json
import monarchy.users.{DiscordFlow, Flow}
import scala.concurrent.{ExecutionContext, Future}

class DiscordExchangeController(implicit
    ec: ExecutionContext,
    discordFlow: DiscordFlow,
    exchangeCli: ExchangeClient
) extends GetController with StrictLogging {
  import DiscordExchangeController._
  import ExchangeClient._
  import Oauth2.Callback

  def action(ctx: AuthContext): Future[HttpResponse] = {
    val query = Uri.Query(ctx.request.request.uri.rawQueryString)
    val data = Callback.parse(query)
    data match {
      case Callback.ErrorOther =>
        logger.error("unexpected issue when parsing callback")
        Future.successful(HttpResponse(StatusCodes.BadRequest))
      case Callback.Error(error, desc) =>
        logger.warn(s"callback error: $error, $desc")
        Future.successful(HttpResponse(StatusCodes.BadRequest))
      case Callback.Success(code, state) =>
        actionImpl(code, state)
    }
  }


  /**
   * @param code the code we received from Discord
   * @param token We call `state` a token once we get to this layer, since it
   *   is just some nonce we generated.
   */
  private def actionImpl(code: String, token: String): Future[HttpResponse] = {
    exchangeCli.fetchToken(code, token).flatMap {
      case Exchange.BadToken(token) =>
        logger.warn(s"token rejected: $token")
        Future.successful(HttpResponse(StatusCodes.BadRequest))
      case Exchange.Ok(tokenData, contextJson) =>
        val callerContext = Json.parse[DiscordAuthorizeController.CallerContext](contextJson)
        handleExchange(tokenData, callerContext)
    }
  }

  /**
   * After exchanging the code for the token, we check the `CallerContext` to
   * see if we should redirect to the referrer or return the token as a JSON
   * response. The latter is used for embedded callers (i.e. native apps).
   */
  private def handleExchange(
      token: Oauth2.Token.Response,
      callerContext: DiscordAuthorizeController.CallerContext
  ): Future[HttpResponse] = {
    val flowReq = discordFlow(DiscordFlow.Context(token.accessToken)).map {
      case Flow.Result.Signup(creds) => Some(creds -> mkProfileUrl(callerContext.referrerUrl))
      case Flow.Result.LoggedIn(creds) => Some(creds -> callerContext.referrerUrl)
      case Flow.Result.Error(e) =>
        logger.error(s"error during flow: $e")
        None
    }
    flowReq.map {
      case None => HttpResponse(StatusCodes.BadRequest)
      // For embedded clients, ignore the URL and just return the authentication
      // data as a JSON response.
      case Some((creds, _)) if callerContext.embedded =>
        val auth = Authenticated(creds.user.id.toString, creds.user.username, creds.bearer)
        val credentialsJson = Json.stringify(auth)
        val entity = HttpEntity(ContentTypes.`application/json`, credentialsJson)
        HttpResponse(StatusCodes.OK, entity = entity)
      // For non-embedded clients, redirect to the referrer URL with a cookie.
      case Some((creds, url)) =>
        val location = headers.Location(withLoginSuccess(url))
        val auth = mkAuthHeader(creds.bearer, creds.ttl.toSeconds)
        HttpResponse(StatusCodes.TemporaryRedirect, headers = List(location, auth))
    }
  }
}

object DiscordExchangeController {
  import DiscordAuthorizeController._

  private case class Authenticated(
      userId: String,
      username: String,
      bearer: String,
  )

  private def mkProfileUrl(referrerUrl: String): String = {
    val referrer = new URI(referrerUrl)
    s"${referrer.getScheme}://${referrer.getAuthority}/profile"
  }

  // Sets a cookie
  private def mkAuthHeader(bearer: String, ttl: Long): HttpHeader = {
    headers.`Set-Cookie`(headers.HttpCookie(
      name = "Authorization",
      value = URLEncoder.encode(s"Bearer $bearer", "UTF-8"),
      maxAge = Some(ttl.toInt),
      path = Some("/"),
      secure = !isLocal,
      httpOnly = true,
    ))
  }

  private def withLoginSuccess(url: String): String = {
    val fragmentIndex = url.indexOf('#')
    val (base, fragment) = if (fragmentIndex < 0) (url, "") else (url.take(fragmentIndex), url.drop(fragmentIndex))
    val separator = if (base.contains('?')) '&' else '?'
    s"$base$separator$LoginSuccessParam$fragment"
  }

  private val LoginSuccessParam = "login=success"

}
