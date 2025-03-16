package monarchy.graphql

import java.util.UUID
import monarchy.auth._
import monarchy.dal.QueryClient
import redis.RedisClient
import scala.concurrent.ExecutionContext

class GraphqlContext(
    val auth: Auth = NullAuth
)(
    implicit
    val executionContext: ExecutionContext,
    val queryCli: QueryClient,
    val redisCli: RedisClient
) {
  def withAuth(_auth: Auth): GraphqlContext =
    new GraphqlContext(_auth)

  def userId: Option[UUID] =
    Option(auth).collect { case a: Authenticated => a.userId }
}
