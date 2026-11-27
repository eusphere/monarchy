package monarchy.graphql

import sangria.execution.UserFacingError

object Exceptions {
  case class BadArgs(msg: String) extends RuntimeException(msg) with UserFacingError
  case class Unauthorized(msg: String) extends RuntimeException(msg)
  case class NotFound(msg: String) extends RuntimeException(msg)
}
