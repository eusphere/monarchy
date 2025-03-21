package monarchy.marshalling.game

import org.scalatest.matchers.should.Matchers
import org.scalatest.wordspec.AnyWordSpec
import monarchy.game._
import monarchy.util.Json

class TurnJsonBijectionSpec extends AnyWordSpec with Matchers {
  import TurnAction._

  val emptyTurn = Turn()

  "TurnJsonBijection" should {
    "correctly round-trip empty turn" in {
      val Accept(turn) = emptyTurn.act(TileSelect(Vec(2, 2)))
      assert(GameJson.parse[Turn](GameJson.stringify(turn)) == turn)
    }

    "correctly round-trip turn with selection" in {
      val Accept(turn) = emptyTurn.act(TileSelect(Vec(2, 2)))
      assert(GameJson.parse[Turn](GameJson.stringify(turn)) == turn)
    }

    "correctly round-trip turn with 2 selections" in {
      val Accept(turn) = emptyTurn
        .act(TileSelect(Vec(2, 2)))
        .flatMap(_.act(TileSelect(Vec(2, 1))))
      assert(GameJson.parse[Turn](GameJson.stringify(turn)) == turn)
    }
  }

}
