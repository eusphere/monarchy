package monarchy.dal

object Exceptions {
  case class DuplicateKey(key: String, value: String) extends Exception
}
