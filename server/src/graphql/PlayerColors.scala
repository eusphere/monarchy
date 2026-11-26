package monarchy.graphql

case class PlayerColor(name: String, color: String)
case class PlayerColorFamily(name: String, color: String, colors: List[PlayerColor])

// Curated families: OKLCH lightness/chroma and gently shifting hue, gamut-mapped to sRGB.
// The fourth shade is always the family representative; all saved colors are leaves.
object PlayerColors {
  val families: List[PlayerColorFamily] = List(
    PlayerColorFamily("Ember", "#a44c3f", List(
      PlayerColor("Ember Ink", "#763638"),
      PlayerColor("Ember Deep", "#8b3b3a"),
      PlayerColor("Ember Rich", "#a04038"),
      PlayerColor("Ember Classic", "#a44c3f"),
      PlayerColor("Ember Soft", "#b95440"),
      PlayerColor("Ember Fresh", "#c0674f"),
      PlayerColor("Ember Light", "#c5785d"),
      PlayerColor("Ember Mist", "#c88a70")
    )),
    PlayerColorFamily("Ochre", "#9c5709", List(
      PlayerColor("Ochre Ink", "#703f0e"),
      PlayerColor("Ochre Deep", "#804903"),
      PlayerColor("Ochre Rich", "#8b5506"),
      PlayerColor("Ochre Classic", "#9c5709"),
      PlayerColor("Ochre Soft", "#a16a07"),
      PlayerColor("Ochre Fresh", "#ac781a"),
      PlayerColor("Ochre Light", "#b1883d"),
      PlayerColor("Ochre Mist", "#b4975c")
    )),
    PlayerColorFamily("Moss", "#62740d", List(
      PlayerColor("Moss Ink", "#4c520a"),
      PlayerColor("Moss Deep", "#535f01"),
      PlayerColor("Moss Rich", "#586d07"),
      PlayerColor("Moss Classic", "#62740d"),
      PlayerColor("Moss Soft", "#60861e"),
      PlayerColor("Moss Fresh", "#699240"),
      PlayerColor("Moss Light", "#739e5b"),
      PlayerColor("Moss Mist", "#80a875")
    )),
    PlayerColorFamily("Jade", "#2b7d43", List(
      PlayerColor("Jade Ink", "#295a2c"),
      PlayerColor("Jade Deep", "#226832"),
      PlayerColor("Jade Rich", "#05773b"),
      PlayerColor("Jade Classic", "#2b7d43"),
      PlayerColor("Jade Soft", "#0a8e59"),
      PlayerColor("Jade Fresh", "#2c996b"),
      PlayerColor("Jade Light", "#46a37f"),
      PlayerColor("Jade Mist", "#62ad92")
    )),
    PlayerColorFamily("Tide", "#007c91", List(
      PlayerColor("Tide Ink", "#045959"),
      PlayerColor("Tide Deep", "#076567"),
      PlayerColor("Tide Rich", "#017178"),
      PlayerColor("Tide Classic", "#007c91"),
      PlayerColor("Tide Soft", "#088795"),
      PlayerColor("Tide Fresh", "#1193a6"),
      PlayerColor("Tide Light", "#299fb7"),
      PlayerColor("Tide Mist", "#58a8bf")
    )),
    PlayerColorFamily("Cobalt", "#0272a8", List(
      PlayerColor("Cobalt Ink", "#19517b"),
      PlayerColor("Cobalt Deep", "#185b92"),
      PlayerColor("Cobalt Rich", "#1e65aa"),
      PlayerColor("Cobalt Classic", "#0272a8"),
      PlayerColor("Cobalt Soft", "#4177c6"),
      PlayerColor("Cobalt Fresh", "#5982cb"),
      PlayerColor("Cobalt Light", "#708ed0"),
      PlayerColor("Cobalt Mist", "#8699d1")
    )),
    PlayerColorFamily("Iris", "#7658a5", List(
      PlayerColor("Iris Ink", "#4d437a"),
      PlayerColor("Iris Deep", "#5b4a8f"),
      PlayerColor("Iris Rich", "#6c50a3"),
      PlayerColor("Iris Classic", "#7658a5"),
      PlayerColor("Iris Soft", "#8861b8"),
      PlayerColor("Iris Fresh", "#956fbc"),
      PlayerColor("Iris Light", "#a37dbf"),
      PlayerColor("Iris Mist", "#af8cc1")
    )),
    PlayerColorFamily("Berry", "#a04968", List(
      PlayerColor("Berry Ink", "#6a3860"),
      PlayerColor("Berry Deep", "#7e3d6d"),
      PlayerColor("Berry Rich", "#934078"),
      PlayerColor("Berry Classic", "#a04968"),
      PlayerColor("Berry Soft", "#af5285"),
      PlayerColor("Berry Fresh", "#b8638c"),
      PlayerColor("Berry Light", "#c17392"),
      PlayerColor("Berry Mist", "#c7859a")
    ))
  )
  val values: List[PlayerColor] = families.flatMap(_.colors)
  val allowed: Set[String] = values.map(_.color).toSet
}
