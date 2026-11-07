import * as Constants from './constants';
import * as React from 'react';
import * as Types from '~/types';
import type { Group } from 'three';
import Piece from './Piece';
import TileHighlight from './TileHighlight';
import PieceFragment from '~/autogen/relay/PieceFragment.graphql';
import { useFragment } from 'react-relay';
import type { PieceFragment$key } from '~/autogen/relay/PieceFragment.graphql';
import type { Phase } from '~/autogen/relay/GameSelectionFragment.graphql';
import { canSelectPiece } from './guards';
import DirectionControls from './DirectionControls';
import BoardTile from '~/views/common/BoardTile';

type Props = {
  tile: Types.Tile;
  pieceColors: Record<string, string>;
  currentPlayerId: string;
  phase?: Phase;
  canSelect: boolean;
  canDeselect: boolean;
  selectedPiece?: PieceFragment$key;
  hovered: boolean;
  onSelect: (point: { i: number; j: number }) => void;
  onDeselect: () => void;
  onMove: (point: { i: number; j: number }) => void;
  onAttack: (attack: ReadonlyArray<{ i: number; j: number }>) => void;
  onConfirmAttack: () => void;
  selfPlayerId?: string;
  legalAction?: 'MOVE' | 'ATTACK' | 'EFFECT';
  selected: boolean;
  hasSelection: boolean;
  attack?: ReadonlyArray<{ i: number; j: number }>;
  directions: ReadonlyArray<{ i: number; j: number }>;
  onDirection: (direction: { i: number; j: number }) => void;
};

const Tile = (props: Props): React.ReactNode => {
  const { tile } = props;
  const piece = useFragment<PieceFragment$key>(PieceFragment, tile.piece);
  const selectedPiece = useFragment<PieceFragment$key>(PieceFragment, props.selectedPiece);
  const highlight = Boolean(
    piece && props.currentPlayerId === piece.playerId && (
      props.phase === 'SELECT' ? piece.currentWait === 0 : piece.id === selectedPiece?.id
    ),
  );
  const position: [number, number, number] = React.useMemo(() => {
    const x = tile.point.j * Constants.TILE_SIZE;
    const z = tile.point.i * Constants.TILE_SIZE;
    return [x, 0, z];
  }, [tile.point]);

  // Without `e.stopPropagation()`, the sub-components will respond to clicks
  // multiple times at this level.
  const onClick = React.useCallback((e: React.MouseEvent<Group>) => {
    e.stopPropagation();
    if (props.legalAction === 'MOVE') {
      props.onMove(tile.point);
      return;
    }
    if (props.legalAction === 'ATTACK' && props.attack) {
      props.onAttack(props.attack);
      return;
    }
    if (props.legalAction === 'EFFECT') {
      props.onConfirmAttack();
      return;
    }
    if (props.canDeselect && (props.selected || (!piece && props.hasSelection))) {
      props.onDeselect();
      return;
    }
    const allowed = canSelectPiece({
      piecePlayerId: piece?.playerId,
      currentPlayerId: props.currentPlayerId,
      phase: props.phase,
      canSelect: props.canSelect,
      wait: piece?.currentWait,
    });
    if (!allowed) return;
    props.onSelect(tile.point);
  }, [piece, props.attack, props.canDeselect, props.canSelect, props.currentPlayerId, props.hasSelection, props.legalAction, props.onAttack, props.onConfirmAttack, props.onDeselect, props.onMove, props.onSelect, props.phase, props.selected, tile.point]);


  const color = React.useMemo(() => {
    const isOdd = (tile.point.i + tile.point.j) % 2 === 0;
    const baseColor = isOdd ? Constants.TILE_COLORS.ODD : Constants.TILE_COLORS.EVEN;
    return props.hovered ? Constants.TILE_COLORS.HOVER : baseColor;
  }, [props.hovered, tile.point]);
  const overlayColor = props.legalAction
    ? Constants.TILE_COLORS[props.legalAction]
    : Constants.TILE_COLORS.MOVE;

  return (
    <group
      position={position}
      onClick={onClick}
      userData={{
        tileKey: `${tile.point.i}-${tile.point.j}`,
        pieceRef: tile.piece,
        pieceId: piece?.id,
      }}>
      <BoardTile color={color} hovered={props.hovered} />
      {(props.selected || highlight) && <TileHighlight key='selection-highlight' active hovered={props.hovered} />}
      {props.legalAction && (
        <TileHighlight
          key={`legal-${props.legalAction}`}
          active
          color={overlayColor}
          hovered={props.hovered}
          opacity={Constants.TILE_HIGHLIGHT_ACTION_OPACITY}
        />
      )}
      {piece && tile.piece && <Piece piece={tile.piece} color={props.pieceColors[piece.playerId]} active={props.selected} />}
      {props.phase === 'DIR' && props.selected && <DirectionControls directions={props.directions} onDirection={props.onDirection} />}
    </group>
  );
};

export default Tile;
