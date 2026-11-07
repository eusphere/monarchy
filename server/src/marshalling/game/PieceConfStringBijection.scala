package monarchy.marshalling.game

import monarchy.game._
import monarchy.util.StringBijection

object PieceConfStringBijection extends StringBijection[PieceConf] {
  override def apply(conf: PieceConf): String =
    conf.toString.replaceAll("([a-z]|[0-9])([A-Z])", "$1_$2").toUpperCase
  override def invert(json: String): PieceConf = json match {
    case "Assassin" | "ASSASSIN" => Assassin
    case "Knight" | "KNIGHT" => Knight
    case "Scout" | "SCOUT" => Scout
    case "Witch" | "WITCH" => Witch
    case "Pyromancer" | "PYROMANCER" => Pyromancer
    case "MudGolem" | "MUD_GOLEM" => MudGolem
    case "Furgon" | "FURGON" => Furgon
    case "Cleric" | "CLERIC" => Cleric
    case "FrostGolem" | "FROST_GOLEM" => FrostGolem
    case "Shrub" | "SHRUB" => Shrub
  }
}
