package monarchy.game

import scala.util.Random

case class Game(
  rand: Random,
  players: Seq[Player],
  board: Board,
  turns: Seq[Turn],
  status: Game.Status
) {
  import TurnAction._

  def currentTurn: Turn =
    turns.head

  def currentPlayer: Player =
    players((turns.size - 1) % players.size)

  def currentSelection: Option[Vec] =
    currentTurn.move orElse currentTurn.select

  def currentTile: Option[Tile] =
    currentSelection.flatMap(board.tile)

  def currentPiece: Option[Piece] =
    currentTile.flatMap(_.piece)

  def currentPhases: Seq[Phase] =
    currentTurn.phases

  def selections: Deltas = {
    currentTurn.canSelect match {
      case false => Set.empty
      case true => board.pieces(currentPlayer.id).map(_.point).toSet
    }
  }

  def movements: Deltas = {
    val moveSet = for {
      tile <- currentTile
      piece <- currentPiece
      if currentTurn.canMove
      if piece.canAct
    } yield Movement.reachablePoints(board, PieceLocation(tile.point, piece))
    moveSet.getOrElse { Deltas.empty }
  }

  def directions: Deltas = {
    val dirSet = for {
      piece <- currentPiece
      if currentTurn.canDir
      if piece.canAct
    } yield Deltas.AdjecentDeltas
    dirSet.getOrElse { Set.empty }
  }

  def attacks: Set[Deltas] = {
    val attackSet = for {
      tile <- currentTile
      piece <- currentPiece
      if currentTurn.canAttack
      if piece.canAct
    } yield piece.conf.attackPatterns.pointSets(tile.point)
    attackSet.getOrElse { Set.empty }
  }

  def effects(attack: Deltas): Set[EffectLocation] = {
    val effectSet = for {
      tile <- currentTile
      piece <- currentPiece
    } yield {
      val pattern = PointPattern.infer(tile.point, attack)
      val rawEffects = piece.conf.effectArea(tile.point, pattern)
      rawEffects.flatMap(EffectLocation(board, PieceLocation(tile.point, piece), _))
    }
    effectSet.getOrElse { Set.empty }
  }

  def tileSelect(pid: PlayerId, p: Vec): Change[Game] =
    actionGuard(pid, TileSelect(p))

  def tileDeselect(pid: PlayerId): Change[Game] =
    actionGuard(pid, TileDeselect)

  def moveSelect(pid: PlayerId, p: Vec): Change[Game] = {
    for {
      game <- actionGuard(pid, MoveSelect(p))
      nextGame <- currentTile match {
        case None => Reject.PieceActionWithoutSelection
        case Some(tile) =>
          tile.piece match {
            case None => Reject.PieceActionWithoutSelection
            case Some(_) if !movements(p) => Reject.IllegalMoveSelection
            case Some(piece) if piece.playerId != pid => Reject.PieceActionWithoutOwnership
            case Some(piece) =>
              Accept(game.copy(board = game.board.move(tile.point, p)))
          }
      }
    } yield nextGame
  }

  def directionSelect(pid: PlayerId, dir: Vec): Change[Game] = {
    for {
      game <- actionGuard(pid, DirSelect(dir))
      nextGame <- currentTile match {
        case None => Reject.PieceActionWithoutSelection
        case Some(tile) =>
          tile.piece match {
            case None => Reject.PieceActionWithoutSelection
            case Some(_) if !directions(dir) => Reject.IllegalDirSelection
            case Some(piece) if piece.playerId != pid => Reject.PieceActionWithoutOwnership
            case Some(piece) =>
              val update = PieceUpdate(tile.point, _.copy(currentDirection = dir))
              val nextBoard = game.board.commit(update)
              Accept(game.copy(board = nextBoard))
          }
      }
    } yield nextGame
  }

  def attackSelect(pid: PlayerId, attack: Deltas): Change[Game] = {
    import EffectGeometry._
    for {
      game <- actionGuard(pid, AttackSelect(attack))
      nextGame <- currentTile match {
        case None => Reject.PieceActionWithoutSelection
        case Some(tile) =>
          tile.piece match {
            case None => Reject.PieceActionWithoutSelection
            case Some(_) if !attacks(attack) => Reject.IllegalAttackSelection
            case Some(piece) if piece.playerId != pid => Reject.PieceActionWithoutOwnership
            case Some(piece) =>
              val pattern = PointPattern.infer(tile.point, attack)
              val effects = piece.conf.effectArea(tile.point, pattern)
              val effectLocations = effects.flatMap(
                EffectLocation(game.board, PieceLocation(tile.point, piece), _)
              ).toSeq.sorted

              // Compute first order effects
              val effectUpdates = effectLocations.flatMap {
                // Damage another unit. Compute blocking, directionality, and damage.
                case EffectLocation(pt, Attack(_, power)) =>
                  game.board.tile(pt) match {
                    case None => None
                    case Some(Tile(_, None)) => None
                    case Some(Tile(_, Some(pieceN))) => Some {
                      def damage = math.round(power * (1 - pieceN.conf.armor)).toInt
                      def canBlock = piece.conf.blockable && pieceN.canBlock
                      if (canBlock) {
                        val blockingBase = pieceN.conf.blocking
                        val blocking = pieceN.currentBlocking
                        // Compute angle of vec from origin to target with way unit is facing.
                        val attackDir = pt - tile.point
                        val snapped = directionSnap(pieceN.currentDirection, attackDir)
                        val (anchor, blockingProb, blockingDir) = snapped match {
                          case Clockwise90(dir) =>        (2, blocking / 2, -dir)
                          case CounterClockwise90(dir) => (2, blocking / 2, -dir)
                          case HalfRotation(dir) =>       (1,     blocking, -dir)
                          case NoRotation(dir) =>         (0,          0.0, -dir)
                        }
                        val blockingOutcome = rand.nextDouble <= blockingProb
                        val canApplyAdjustment = anchor > 0
                        if (blockingOutcome) {
                          val adjustment = if (canApplyAdjustment) blockingBase - anchor else 0
                          PieceUpdate(pt, _.copy(
                            currentDirection = blockingDir,
                            blockingAjustment = pieceN.blockingAjustment + adjustment
                          ))
                        } else {
                          val adjustment = if (canApplyAdjustment) blockingBase else 0
                          val health = math.max(pieceN.currentHealth - damage, 0)
                          health match {
                            case 0 => PieceRemoval(pt)
                            case h => PieceUpdate(pt, _.copy(
                              blockingAjustment = pieceN.blockingAjustment + adjustment,
                              currentHealth = h
                            ))
                          }
                        }
                      } else {
                        val health = math.max(pieceN.currentHealth - damage, 0)
                        health match {
                          case 0 => PieceRemoval(pt)
                          case h => PieceUpdate(pt, _.copy(currentHealth = h))
                        }
                      }
                    }
                  }
                // Adds a shrub unit for unoccupied tiles.
                case EffectLocation(pt, GrowPlant(_)) =>
                  if (game.board.occupied(pt))
                    None
                  else
                    Some(PieceAdd(pt, PieceBuilder(PieceId.Empty, Shrub, pid, piece.currentDirection)))
                // Heals all units for the same player
                case EffectLocation(pt, HealAll(power)) =>
                  game.board.piece(pt).map {
                    case PieceLocation(_, pieceN) =>
                      val newHealth = math.min(pieceN.currentHealth + power, pieceN.conf.maxHealth)
                      PieceUpdate(pt, _.copy(currentHealth = newHealth))
                  }
                // Paralyzes the targeted tiles
                case EffectLocation(pt, effect @ Paralyze(_)) =>
                  game.board.piece(pt).map {
                    case PieceLocation(_, pieceN) =>
                      val newEffect = PieceEffect(piece.id, effect)
                      PieceUpdate(pt, _.copy(currentEffects = pieceN.currentEffects :+ newEffect))
                  }
              }

              // Compute second order effects
              val effectUpdates2ndOrder: Seq[TileChange] = effectLocations.collect {
                case EffectLocation(pt, effect: FocusBreaking) =>
                  game.board.piece(pt) match {
                    case Some(PieceLocation(_, piece1)) if piece1.currentFocus =>
                      val defocus = PieceUpdate(pt, _.copy(currentFocus = false))
                      val liftedEffects = game.board.pieces.collect {
                        case PieceLocation(pt2, piece2) if piece2.currentEffects.nonEmpty =>
                          val newEffects = piece2.currentEffects.filterNot(_.casterId == piece1.id)
                          PieceUpdate(pt2, _.copy(currentEffects = newEffects))
                      }
                      (defocus +: liftedEffects)
                    case _ => Nil
                  }
              }.flatten

              // The attacker turns in the snapped avg. direction of the attacks.
              val attackerUpdate = {
                val focus = piece.conf.attackRequiresFocus
                val attackDir = attack.foldLeft(Deltas.Origin)(_ + _ - tile.point)
                val nextDir = directionSnap(piece.currentDirection, attackDir).result
                PieceUpdate(tile.point, _.copy(currentDirection = nextDir, currentFocus = focus))
              }
              // Fold updates over the board-state.
              val updates = effectUpdates ++ effectUpdates2ndOrder ++ Seq(attackerUpdate)
              val nextBoard = game.board.commitAggregation(updates)
              val nextGame = game.copy(board = nextBoard)
              Accept(nextGame)
          }
      }
    } yield nextGame
  }

  def endTurn(pid: PlayerId): Change[Game] = {
    for {
      nextGame <- actionGuard(pid, EndTurn)
    } yield {
      val updatesForAll = board.pieces.map {
        case PieceLocation(pt, piece) =>
          val waitDecrement = if (pid == piece.playerId) 1 else 0
          PieceUpdate(pt, _.copy(
            currentWait = math.max(piece.currentWait - waitDecrement, 0),
            blockingAjustment = piece.blockingAjustment * Game.BlockingAdjustmentDecay
          ))
      }
      val updateForPiece = for {
        tile <- currentTile
        piece <- tile.piece
      } yield {
        val totalWait = currentTurn.actions.collect {
          case MoveSelect(_) => piece.conf.moveWait
          case AttackSelect(_) => piece.conf.attackWait
        }.sum
        PieceUpdate(tile.point, _.copy(currentWait = totalWait))
      }
      val updates = updatesForAll ++ updateForPiece.toSeq
      val nextBoard = board.commitAggregation(updates)
      nextGame.copy(board = nextBoard)
    }
  }

  def nextTurn: Change[Game] =
    endGuard.map { _ => copy(turns = Turn() +: turns) }

  // The most common validation-stack
  private def actionGuard(pid: PlayerId, axn: TurnAction): Change[Game] = {
    for {
      _ <- endGuard
      _ <- playerGuard(pid)
      game <- turnGuard(axn)
    } yield game
  }

  private def playerGuard(pid: PlayerId): Change[Unit] =
    if (currentPlayer.id == pid) Accept.Unit else Reject.ChangeOutOfTurn

  private def turnGuard(act: TurnAction): Change[Game] =
    currentTurn.act(act).map(t => this.copy(turns = t +: turns.tail))

  private def endGuard: Change[Unit] =
    if (status == Game.Status.Complete) Reject.ReadOnly else Accept.Unit
}

object Game {
  sealed trait Status
  object Status {
    case object Started extends Status
    case object Complete extends Status
    case object Invalid extends Status
  }

  val BlockingAdjustmentDecay = 0.9
}
