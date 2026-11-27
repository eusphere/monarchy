package monarchy.lib

import java.util.UUID
import org.scalatest.wordspec.AnyWordSpec

class ColorsSpec extends AnyWordSpec {
  "The shared palette" should {
    "provide eight families of eight unique hex leaf colors" in {
      assert(Colors.families.size == 8)
      assert(Colors.families.forall(_.size == 8))
      assert(Colors.allowed.size == 64)
      assert(Colors.values.forall(_.matches("#[0-9a-f]{6}")))
    }

    "keep each representative as a valid leaf of its family" in {
      Colors.families.foreach { colors =>
        assert(colors.count(_ == colors(Colors.representativeIndex)) == 1)
      }
    }

    "generate TypeScript with all leaf colors in their Scala order" in {
      val generated = PlayerColorTypescript.render
      val colors = "#[0-9a-f]{6}".r.findAllIn(generated).toVector
      assert(colors == Colors.values)
      assert(generated.contains(s"colors[${Colors.representativeIndex}]"))
      assert(generated.endsWith("\n"))
    }

    "assign signup colors deterministically from the same leaf palette" in {
      val users = Vector(new UUID(0, 0), new UUID(0, 1), new UUID(0, 0x80000000L), new UUID(-1, -1))
      assert(Colors.forUser(new UUID(0, 0)) == Colors.values(0))
      assert(Colors.forUser(new UUID(0, 1)) == Colors.values(1))
      users.foreach { user =>
        assert(Colors.allowed.contains(Colors.forUser(user)))
      }
    }
  }
}
