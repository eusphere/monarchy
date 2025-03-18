import * as Constants from './constants';
import * as React from 'react';
import * as Types from '~/types';
import type { Group } from 'three';
import * as THREE from 'three';
import Piece from './Piece';

const TILE_DIM = [
  Constants.TILE_SIZE,
  Constants.TILE_HEIGHT,
  Constants.TILE_SIZE,
] as const;

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

  // Without `e.stopPropagation()`, the sub-components will respond to clicks
  // multiple times at this level.
  const onClick = React.useCallback((e: React.MouseEvent<Group>) => {
    e.stopPropagation();
    console.log(tile);
  }, [tile]);


  const [hover, setHover] = React.useState(false);
  const onPointerEnter = React.useCallback((e: React.MouseEvent<Group>) => {
    e.stopPropagation();
    setHover(true);
  }, []);

  const onPointerLeave = React.useCallback((e: React.MouseEvent<Group>) => {
    e.stopPropagation();
    setHover(false);
  }, []);

  return (
    <group
      position={position}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}>
      <mesh receiveShadow>
        <boxGeometry args={TILE_DIM} />
        <meshStandardMaterial
          color={hover ? '#DDDDDD' : '#EEEEEE'} 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      {tile.piece && <Piece piece={tile.piece} />}
    </group>
  );
};

export default Tile;
