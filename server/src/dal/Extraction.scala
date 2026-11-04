package monarchy.dal

import java.sql.SQLException

object Exception {
  class DuplicateKey(val key: String, val value: String) extends RuntimeException

  object DuplicateKey {
    def apply(key: String, value: String): DuplicateKey =
      new DuplicateKey(key, value)

    def unapply(duplicate: DuplicateKey): Option[(String, String)] =
      Some((duplicate.key, duplicate.value))

  }

  object DuplicateKeySql {
    private val Pattern = "Key \\(([^)]+)\\)=\\(([^)]*)\\) already exists\\.".r

    def unapply(e: SQLException): Option[DuplicateKey] =
      if (e.getSQLState != "23505") None
      else {
        val message = Option(e.getMessage)
        message.flatMap(Pattern.findFirstMatchIn) match {
          case Some(m) => Some(DuplicateKey(m.group(1), m.group(2)))
          case None => Some(DuplicateKey("unknown", message.getOrElse("unknown")))
        }
      }
  }
}
