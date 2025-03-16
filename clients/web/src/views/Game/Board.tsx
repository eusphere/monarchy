import * as Constants from './constants';
import * as React from 'react';
import * as Types from '~/types';
import Tile from './Tile';

type Props = {
  state: Types.GameState;
};

// Basic board component
const Board = (props: Props): React.ReactNode => {
  const tiles = props.state.tiles;
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
        return <Tile key={key} tile={tile} />;
      })}
    </group>
  );
};

export default Board;
