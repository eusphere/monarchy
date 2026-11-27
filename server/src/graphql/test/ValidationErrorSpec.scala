package monarchy.graphql

import org.scalatest.wordspec.AnyWordSpec
import sangria.execution.Executor
import sangria.parser.QueryParser
import sangria.schema._
import scala.concurrent.{Await, Future}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._

class ValidationErrorSpec extends AnyWordSpec {
  "GraphQL validation errors" should {
    "return an expected argument error instead of an internal server error" in {
      val schema = Schema(ObjectType("Query", fields[Unit, Unit](
        Field("failure", OptionType(StringType), resolve = _ =>
          Future.failed[String](Exceptions.BadArgs("Color must be a six-digit hex value"))))))
      val result = Await.result(
        Executor.execute(schema, QueryParser.parse("{ failure }").get), 5.seconds).asInstanceOf[Map[String, Any]]
      val errors = result("errors").asInstanceOf[Seq[Map[String, Any]]]
      assert(errors.head("message") == "Color must be a six-digit hex value")
    }
  }
}
