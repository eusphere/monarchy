package monarchy.graphql

object Exceptions {
  case class BadArgs(msg: String) extends RuntimeException(msg)
  case class Unauthorized(msg: String) extends RuntimeException(msg)
  case class InvalidUsername(msg: String) extends RuntimeException(msg)
  case class UsernameInUse(msg: String) extends RuntimeException(msg)
  case class NotFound(msg: String) extends RuntimeException(msg)
}
