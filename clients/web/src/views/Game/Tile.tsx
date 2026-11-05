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

const TILE_DIM = [
  Constants.TILE_SIZE,
  Constants.TILE_HEIGHT,
  Constants.TILE_SIZE,
] as const;

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
  selfPlayerId?: string;
  legalAction?: 'MOVE' | 'ATTACK' | 'EFFECT';
  selected: boolean;
  hasSelection: boolean;
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
    if (props.canDeselect && (props.selected || (!piece && props.hasSelection))) {
      props.onDeselect();
      return;
    }
    const allowed = canSelectPiece({
      piecePlayerId: piece?.playerId,
      currentPlayerId: props.currentPlayerId,
      selfPlayerId: props.selfPlayerId,
      phase: props.phase,
      canSelect: props.canSelect,
      wait: piece?.currentWait,
    });
    if (!allowed) return;
    props.onSelect(tile.point);
  }, [piece, props.canDeselect, props.canSelect, props.currentPlayerId, props.hasSelection, props.onDeselect, props.onSelect, props.phase, props.selfPlayerId, props.selected, tile.point]);


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
      <mesh receiveShadow userData={{
        tileKey: `${tile.point.i}-${tile.point.j}`,
        pieceRef: tile.piece,
        pieceId: piece?.id,
      }}>
        <boxGeometry args={TILE_DIM} />
        <meshStandardMaterial
          color={color} 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      {(props.selected || highlight) && <TileHighlight active hovered={props.hovered} />}
      {props.legalAction && (
        <TileHighlight
          active
          color={overlayColor}
          hovered={props.hovered}
          opacity={Constants.TILE_HIGHLIGHT_ACTION_OPACITY}
        />
      )}
      {piece && tile.piece && <Piece piece={tile.piece} color={props.pieceColors[piece.playerId]} />}
    </group>
  );
};

export default Tile;
