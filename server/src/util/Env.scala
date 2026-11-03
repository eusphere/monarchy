package monarchy.util

sealed class Env(val repr: String)

object Env {
  case object Local("local") extends Env
  case object Prod("prod") extends Env

  lazy val Current = apply(sys.env("ENV"))

  def isLocal: Boolean =
    Current == Local

  def apply(repr: String): Env = {
    repr match {
      case "prod" => Prod
      case _ => Local
    }
  }
}
