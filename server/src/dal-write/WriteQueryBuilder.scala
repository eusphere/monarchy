package monarchy.dalwrite

import scala.concurrent.ExecutionContext
import monarchy.dal.{PostgresProfile, Queryable}

object WriteQueryBuilder {
  import PostgresProfile.Implicits._

  def put[E: Queryable](e: E)(implicit ec: ExecutionContext): DBIO[E] = {
    val schema = implicitly[Queryable[E]]
    val q = schema.query
    (q returning q).insertOrUpdate(e).map(_.getOrElse(e))
  }

  def putAll[E: Queryable](entities: Seq[E])(implicit ec: ExecutionContext): DBIO[Seq[E]] =
    DBIO.sequence { entities.map(put(_)) }

  def delete[E: Queryable](e: E)(implicit ec: ExecutionContext): DBIO[Int] = {
    val schema = implicitly[Queryable[E]]
    schema.query.filter(row => schema.repId(row) === schema.id(e)).delete
  }
}
