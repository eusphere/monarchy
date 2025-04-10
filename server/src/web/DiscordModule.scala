package monarchy.web

import monarchy.auth.oauth2._
import monarchy.dal.QueryClient
import monarchy.users.DiscordFlow
import monarchy.util.http.HttpClient
import scala.concurrent.ExecutionContext

object DiscordModule {
  // Environment based configuration. NOTE: these only work for the
  // `monarchy-staging` app on Discord. Key rotation is simple if we decide to
  // secure that app later.
  private def clientId: String =
    sys.env.getOrElse("DISCORD_CLIENT_ID", "1325545581304614912")

  private def clientSecret: String =
    sys.env.getOrElse("DISCORD_CLIENT_SECRET", "drUn5j62dtzSUuJDEf__mK6-3-e3IZaj")

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
