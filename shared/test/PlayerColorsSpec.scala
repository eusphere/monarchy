package monarchy.shared

import java.util.UUID
import org.scalatest.wordspec.AnyWordSpec

class PlayerColorsSpec extends AnyWordSpec {
  "The shared palette" should {
    "provide eight families of eight unique hex leaf colors" in {
      assert(PlayerColors.families.size == 8)
      assert(PlayerColors.families.forall(_.size == 8))
      assert(PlayerColors.allowed.size == 64)
      assert(PlayerColors.values.forall(_.matches("#[0-9a-f]{6}")))
    }

    "assign signup colors deterministically from the same leaf palette" in {
      val users = Vector(new UUID(0, 0), new UUID(0, 1), new UUID(0, 0x80000000L), new UUID(-1, -1))
      assert(PlayerColors.forUser(new UUID(0, 0)) == PlayerColors.values(0))
      assert(PlayerColors.forUser(new UUID(0, 1)) == PlayerColors.values(1))
      users.foreach { user =>
        assert(PlayerColors.allowed.contains(PlayerColors.forUser(user)))
      }
    }
  }
}
