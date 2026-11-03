package monarchy.web

import com.typesafe.scalalogging.StrictLogging
import akka.http.scaladsl.model.Uri
import akka.http.scaladsl.server.{Directives, RequestContext, Route, RouteResult}
import monarchy.util.Timer
import scala.concurrent.ExecutionContext
import scala.util.Success

object LoggingModule extends StrictLogging {
  import Directives._

  def log(r: Route)(implicit ec: ExecutionContext): Route = extractClientIP { ip =>
    (ctx: RequestContext) =>
      Timer.clock(r(ctx)) {
        case timing =>
          val method = ctx.request.method.name
          // OAuth callbacks carry authorization codes and state in the query
          // string. Keep those credentials out of request logs.
          val uri = ctx.request.uri.withQuery(Uri.Query.Empty)
          val addr = ip.toOption.map(_.getHostAddress).getOrElse("0.0.0.0")
          val status = extractStatus(timing)
          println(s"$method $uri from $addr took ${timing.duration}ms gave $status")
      }
  }

  private def extractStatus(t: Timer.Timing[RouteResult]): Int = {
    t.result match {
      case Success(RouteResult.Complete(r)) => r.status.intValue
      case Success(RouteResult.Rejected(_)) => 404
      case _ => 500
    }
  }
}
