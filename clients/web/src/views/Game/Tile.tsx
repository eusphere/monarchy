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
  selectedPiece?: PieceFragment$key;
  hovered: boolean;
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
    console.log(tile);
  }, [tile]);


  const color = React.useMemo(() => {
    const isOdd = (tile.point.i + tile.point.j) % 2 === 0;
    return props.hovered ? Constants.TILE_COLOR_HOVER : isOdd ? Constants.TILE_COLOR_ODD : Constants.TILE_COLOR_EVEN;
  }, [props.hovered, tile.point]);

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
      {piece && <mesh
        position={[0, Constants.TILE_HEIGHT + 0.45, 0]}
        userData={{
          tileKey: `${tile.point.i}-${tile.point.j}`,
          pieceRef: tile.piece,
          pieceId: piece.id,
        }}>
        <boxGeometry args={[Constants.TILE_SIZE * 0.72, 0.9, Constants.TILE_SIZE * 0.72]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>}
      {highlight && <TileHighlight active />}
      {piece && tile.piece && <Piece piece={tile.piece} color={props.pieceColors[piece.playerId]} />}
    </group>
  );
};

export default Tile;
