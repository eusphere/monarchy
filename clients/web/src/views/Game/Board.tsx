import * as Constants from './constants';
import * as React from 'react';
import * as Types from '~/types';
import Tile from './Tile';
import GameSelectionFragment from '~/autogen/relay/GameSelectionFragment.graphql';
import type { GameSelectionFragment$key } from '~/autogen/relay/GameSelectionFragment.graphql';
import { useFragment } from 'react-relay';

type Props = {
  state: Types.GameState;
  pieceColors: Record<string, string>;
};

// Basic board component
const Board = (props: Props): React.ReactNode => {
  const tiles = props.state.tiles;
  const selection = useFragment<GameSelectionFragment$key>(
    GameSelectionFragment,
    props.state.currentSelection,
  );
  const phase = selection?.phases[0];
  const selectedPieceId = selection?.selection ? selection.piece : undefined;
  const offset: [number, number, number] = React.useMemo(() => {
    const minI = Math.min(...tiles.map((_) => _.point.i));
    const minJ = Math.min(...tiles.map((_) => _.point.j));
    const maxI = Math.max(...tiles.map((_) => _.point.i));
    const maxJ = Math.max(...tiles.map((_) => _.point.j));
    const xOffset = (maxJ - minJ) * Constants.TILE_SIZE / 2;
    const zOffset = (maxI - minI) * Constants.TILE_SIZE / 2;
    return [-xOffset, 0, -zOffset];
  }, [tiles]);

  return (
    <group position={offset}>
      {tiles.map((tile) => {
        const { point } = tile;
        const key = `${point.i}-${point.j}`;
        return <Tile key={key} tile={tile} pieceColors={props.pieceColors}
          currentPlayerId={props.state.currentPlayerId} phase={phase}
          selectedPiece={selectedPieceId ?? undefined} />;
      })}
    </group>
  );
};

export default Board;
