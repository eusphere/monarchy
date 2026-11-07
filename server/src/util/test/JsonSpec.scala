package monarchy.util

import java.time.Instant
import org.scalatest.wordspec.AnyWordSpec

object JsonSpec {
  case class Metadata(expireAt: Instant)
}

class JsonSpec extends AnyWordSpec {
  "Json" should {
    "preserve millisecond expiry timestamps through a metadata round trip" in {
      val metadata = JsonSpec.Metadata(Instant.parse("2026-11-07T06:00:00.123Z"))
      assert(Json.parse[JsonSpec.Metadata](Json.stringify(metadata)) == metadata)
    }
  }
}
