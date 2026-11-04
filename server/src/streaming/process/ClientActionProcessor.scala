package monarchy.streaming.process

import monarchy.dal
import monarchy.streaming.core._
import monarchy.util.Async
import redis.RedisClient
import scala.concurrent.{Future, ExecutionContext}

trait ClientActionProcessor[T <: StreamAction] extends (T => Future[StreamAction])

class ClientActionProxy(implicit
  ec: ExecutionContext,
  redisCli: RedisClient,
  queryCli: dal.QueryClient
) extends ClientActionProcessor[StreamAction] {
  // Cached processors
  val ping = new PingProcessor

  override def apply(action: StreamAction): Future[StreamAction] = {
    action match {
      case axn: Ping => ping(axn)
      case axn =>
        println(s"[client-action-proxy] unrecognized [[StreamAction]] of $axn")
        Async(StreamAction.Null)
    }
  }
}
