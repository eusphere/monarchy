import * as React from 'react';
import { TILE_HEIGHT, TILE_SIZE, TILE_COLORS } from '~/views/Game/constants';

type Props = {
  color: string;
  hovered?: boolean;
  userData?: Record<string, unknown>;
  children?: React.ReactNode;
};

const BoardTile = ({ color, hovered = false, userData, children }: Props): React.ReactNode => (
  <>
    <mesh receiveShadow userData={userData}>
      <boxGeometry args={[TILE_SIZE, TILE_HEIGHT, TILE_SIZE]} />
      <meshStandardMaterial color={hovered ? TILE_COLORS.HOVER : color} roughness={0.7} metalness={0.1} />
    </mesh>
    {children}
  </>
);

export default BoardTile;
