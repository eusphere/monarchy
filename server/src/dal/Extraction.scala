package monarchy.dal

import java.sql.SQLException

object Exception {
  case class DuplicateKey(key: String, value: String) extends RuntimeException

  object DuplicateKey {
    private val Pattern = "Key \\(([^)]+)\\)=\\(([^)]*)\\) already exists\\.".r

    def unapply(e: SQLException): Option[DuplicateKey] =
      if (e.getSQLState != "23505") None
      else {
        Option(e.getMessage).flatMap(Pattern.findFirstMatchIn) match {
          case Some(m) => Some(DuplicateKey(m.group(1), m.group(2)))
          case None => Some(DuplicateKey("unknown", Option(e.getMessage).getOrElse("unknown")))
        }
      }
  }
}
