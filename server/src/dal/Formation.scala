package monarchy.dal

import java.util.UUID

case class Formation(
  id: UUID = NewId,
  userId: UUID,
  data: String,
)

import PostgresProfile.Implicits._
object Formation extends TableSchema[Formation, FormationTable](TableQuery[FormationTable])

class FormationTable(tag: Tag) extends TableDef[Formation](tag, "formations") {
  def userId = column[UUID]("user_id")
  def data = column[String]("data")
  def * = (id, userId, data) <> ((Formation.apply _).tupled, Formation.unapply)
}
