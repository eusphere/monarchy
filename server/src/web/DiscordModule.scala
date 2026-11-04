package monarchy.web

import monarchy.auth.oauth2._
import monarchy.dal.QueryClient
import monarchy.users.DiscordFlow
import monarchy.util.http.HttpClient
import scala.concurrent.ExecutionContext

object DiscordModule {
  private val IsProduction = sys.env.get("ENV").contains("prod")
  private val StagingClientId = "1325545581304614912"
  private val StagingClientSecret = "drUn5j62dtzSUuJDEf__mK6-3-e3IZaj"

  // Local development must use the `monarchy-staging` Discord app. Production
  // credentials are only read when the server is explicitly running in prod.
  private def clientId: String =
    if (IsProduction) sys.env("DISCORD_CLIENT_ID") else StagingClientId

  private def clientSecret: String =
    if (IsProduction) sys.env("DISCORD_CLIENT_SECRET") else StagingClientSecret

  private def redirectUrl: String =
    sys.env.getOrElse("DISCORD_REDIRECT_URL", "http://localhost:8080/oauth2/discord/exchange")

  private object Config extends Oauth2.Config(
    baseUrl = "https://discord.com/api/v10/oauth2",
    clientId = clientId,
    clientSecret = clientSecret,
    redirectUri = redirectUrl,
    scopes = Set("identify", "email", "openid") // consider also: "guilds"
  )

  def exchangeClient(implicit
      httpCli: HttpClient,
      ec: ExecutionContext
  ): ExchangeClient = new ExchangeClient(Config)

  def discordFlow(implicit
      httpCli: HttpClient,
      queryCli: QueryClient,
      ec: ExecutionContext
  ): DiscordFlow = new DiscordFlow
}
