package monarchy.web

import akka.http.scaladsl.model.HttpMethods._
import akka.http.scaladsl.model.headers._
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.directives.RouteDirectives.complete
import akka.http.scaladsl.server.{Directive0, Route}
import monarchy.controllers.AuthRoute
import scala.concurrent.duration._

/**
  * From https://dzone.com/articles/handling-cors-in-akka-http
  * and https://ali.actor
  */
object CorsModule {
  private val AllowHeaders = Set("Content-Type", AuthRoute.AuthorizationKey)
  private val AllowOrigins = Set(
    "http://localhost:5173",
    "http://localhost:8081",
  )

  private val BaseHeaders = List(
    `Access-Control-Allow-Credentials`(true),
    `Access-Control-Allow-Headers`(AllowHeaders.toList),
    `Access-Control-Max-Age`(1.day.toMillis) // Tell browser to cache OPTIONS requests
  )

  // Adds access control headers to normal responses
  private def addAccessControlHeaders: Directive0 = {
    extractRequest.flatMap { req =>
      respondWithHeaders(responseHeaders(req))
    }
  }

  // Handles preflight OPTIONS requests.
  private def preflightRequestHandler: Route = {
    options {
      complete(HttpResponse(StatusCodes.OK)
        .withHeaders(`Access-Control-Allow-Methods`(OPTIONS, POST, PUT, GET, DELETE)))
    }
  }

  private def responseHeaders(req: HttpRequest): List[HttpHeader] = {
    val origins = req.headers.filter(_.name == "Origin").map(_.value)
    val originsAllowed = origins
      .filter(AllowOrigins.contains)
      .map { og => `Access-Control-Allow-Origin`(HttpOriginRange(HttpOrigin(og))) }
    BaseHeaders ++ originsAllowed
  }

  // Wrap the Route with this method to enable adding of CORS headers
  def corsHandler(r: Route): Route = {
    addAccessControlHeaders {
      preflightRequestHandler ~ r
    }
  }
}
