package monarchy.game

trait PieceConf {
  def name: String
  def maxHealth: Int
  def maxWait: Int
  def power: Int
  def armor: Double
  def blocking: Double

  def movementRange: Int
  def movesAside: Boolean = true

  def teleports: Boolean = false
  def living: Boolean = true

  def attackPatterns: AttackPatterns
  def attackAlongLos: Boolean = false
  def attackRequiresFocus: Boolean = false
  def effectArea: EffectArea
  def blockable: Boolean = true

  // derived properties
  final def attackWait: Int = math.ceil(maxWait / 2.0).toInt
  final def moveWait: Int = math.floor(maxWait / 2.0).toInt
}

case object Assassin extends PieceConf {
  import Deltas._
  val name = "Royal Spearman"
  val maxHealth = 35
  val maxWait = 1
  val power = 18
  val armor = 0.12
  val blocking = 0.7
  val movementRange = 4
  val attackPatterns = SimpleAttackPatterns(AdjecentDeltas)
  val effectArea = new EffectArea {
    override def apply(p0: Vec, pat: PointPattern): Set[Effect] = {
      AdjecentDeltas.map { d => Attack(p0 + d, power) }
    }
  }
}

case object Knight extends PieceConf {
  import Deltas._
  val name = "Royal Guard"
  val maxHealth = 50
  val maxWait = 1
  val power = 22
  val armor = 0.25
  val blocking = 0.8
  val movementRange = 3
  val attackPatterns = SimpleAttackPatterns(AdjecentDeltas)
  val effectArea = UniformAttackArea(NoDelta, power)
}

case object Scout extends PieceConf {
  import Deltas._
  val name = "Royal Hunter"
  val maxHealth = 40
  val maxWait = 2
  val power = 18
  val armor = 0.08
  val blocking = 0.6
  val movementRange = 4
  val attackPatterns = SimpleAttackPatterns(rangeDeltasNoCenter(6))
  val effectArea = UniformAttackArea(NoDelta, power)
  override val attackAlongLos = true
}

case object Witch extends PieceConf {
  import Deltas._
  val name = "Shadow Bender"
  val maxHealth = 28
  val maxWait = 3
  val power = 24
  val armor = 0.0
  val blocking = 0.2
  val movementRange = 3

  override val blockable = false

  val attackPatterns = new AttackPatterns {
    val max = 4
    override val patterns: Set[PointPattern] = {
      AdjecentDeltas.map { dir =>
        PointPattern((1 to max).map(dir * _).toSet)
      }
    }
  }

  val effectArea = new EffectArea {
    override def apply(p0: Vec, pat: PointPattern): Set[Effect] = {
      pat(p0).map(Attack(_, power))
    }
  }
}

case object Pyromancer extends PieceConf {
  import Deltas._
  val name = "Burning Priestess"
  val maxHealth = 30
  val maxWait = 3
  val power = 16
  val armor = 0.0
  val blocking = 0.3
  val movementRange = 3
  val attackPatterns = SimpleAttackPatterns(rangeDeltas(3))
  val effectArea = UniformAttackArea(rangeDeltas(1), power)
  override val blockable = false
}

case object MudGolem extends PieceConf {
  import Deltas._
  val name = "Gloom Sentinel"
  val maxHealth = 60
  val maxWait = 2
  val power = 20
  val armor = 0.0
  val blocking = 0.0
  val movementRange = 5
  val attackPatterns = SimpleAttackPatterns(AdjecentDeltas)
  val effectArea = UniformAttackArea(NoDelta, power)
  override val teleports = true
}

case object Furgon extends PieceConf {
  import Deltas._
  val name = "Grove Sentinel"
  val maxHealth = 48
  val maxWait = 1
  val power = 0
  val armor = 0.0
  val blocking = 0.5
  val movementRange = 3
  val attackPatterns = SimpleAttackPatterns(rangeDeltas(2))
  val effectArea = new EffectArea {
    val deltas = rangeDeltas(1)
    override def apply(p0: Vec, pat: PointPattern): Set[Effect] = {
      val pointSet = for {
        p <- pat(p0)
        d <- deltas
      } yield p + d
      val pointSetWithoutOrigin = pointSet - p0
      pointSetWithoutOrigin.map(GrowPlant(_))
    }
  }
}

case object Cleric extends PieceConf {
  import Deltas._
  val name = "High Cleric"
  val maxHealth = 24
  val maxWait = 5
  val power = 12
  val armor = 0.0
  val blocking = 0.0
  val movementRange = 3
  val attackPatterns = SimpleAttackPatterns(NoDelta)
  val effectArea = new EffectArea {
    override def apply(p0: Vec, pat: PointPattern): Set[Effect] = {
      Set(HealAll(power))
    }
  }
  override val blockable = false
}

case object FrostGolem extends PieceConf {
  import Deltas._
  val name = "Frost Sentinel"
  val maxHealth = 60
  val maxWait = 2
  val power = 0
  val armor = 0.0
  val blocking = 0.0
  val movementRange = 2
  val attackPatterns = SimpleAttackPatterns(rangeDeltasNoCenter(4))
  val effectArea = new EffectArea {
    override def apply(p0: Vec, pat: PointPattern): Set[Effect] = {
      pat(p0).map(Paralyze(_))
    }
  }
  override val blockable = false
  override val attackRequiresFocus = true
}

case object Shrub extends PieceConf {
  val name = "Banyan"
  val maxHealth = 1
  val maxWait = 0
  val power = 0
  val armor = 0.0
  val blocking = 0.0
  val movementRange = 0
  override val movesAside = false

  val attackPatterns = SimpleAttackPatterns(Deltas.empty)
  val effectArea = NullEffectArea
}
