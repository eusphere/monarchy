package monarchy.graphql

import org.scalatest.wordspec.AnyWordSpec

class PlayerColorsSpec extends AnyWordSpec {
  "The player palette" should {
    "provide eight families with eight distinct leaf colors each" in {
      assert(PlayerColors.families.size == 8)
      assert(PlayerColors.families.map(_.name).distinct.size == 8)
      assert(PlayerColors.families.forall(_.colors.size == 8))
      val colors = PlayerColors.families.flatMap(_.colors.map(_.color))
      assert(colors.distinct.size == 64)
      assert(colors.forall(_.matches("#[0-9a-f]{6}")))
    }

    "make every family representative an allowed leaf exactly once in its family" in {
      PlayerColors.families.foreach { family =>
        assert(family.colors.count(_.color == family.color) == 1)
        assert(PlayerColors.allowed.contains(family.color))
      }
    }

    "exclude arbitrary colors outside the curated palette" in {
      assert(!PlayerColors.allowed.contains("#000000"))
      assert(!PlayerColors.allowed.contains("#ffffff"))
      assert(!PlayerColors.allowed.contains("transparent"))
    }
  }
}
