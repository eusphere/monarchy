import * as Constants from './constants';
import * as React from 'react';
import * as Types from '~/types';
import Piece from './Piece';

const TILE_DIM = [Constants.TILE_SIZE, Constants.TILE_HEIGHT, Constants.TILE_SIZE] as const;

type Props = {
  tile: Types.Tile;
};

const Tile = (props: Props): React.ReactNode => {
  const { tile } = props;
  const position: [number, number, number] = React.useMemo(() => {
    const x = tile.point.j * Constants.TILE_SIZE;
    const z = tile.point.i * Constants.TILE_SIZE;
    return [x, 0, z];
  }, [tile.point]);
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={TILE_DIM} />
        <meshStandardMaterial 
          color="#DDDDDD" 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      {tile.piece && <Piece piece={tile.piece} />}
    </group>
  );
};

export default Tile;
