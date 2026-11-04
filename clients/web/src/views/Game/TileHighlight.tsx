import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import type { MeshStandardMaterial } from 'three';
import * as Constants from './constants';

type Props = {
  active: boolean;
};

const TileHighlight = ({ active }: Props): React.ReactNode => {
  const material = React.useRef<MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (material.current) {
      const pulse = 0.5 + 0.5 * Math.sin(clock.elapsedTime * 2.2);
      material.current.emissiveIntensity = active ? 0.35 + pulse * 0.3 : 0;
      material.current.opacity = active ? 0.28 + pulse * 0.1 : 0;
    }
  });

  return (
    <mesh position={[0, Constants.TILE_HEIGHT / 2 + 0.006, 0]}>
      <boxGeometry args={[Constants.TILE_SIZE * 0.92, 0.015, Constants.TILE_SIZE * 0.92]} />
      <meshStandardMaterial
        ref={material}
        color="#f6c453"
        emissive="#f6c453"
        transparent
        opacity={active ? 0.3 : 0}
        depthWrite={false}
      />
    </mesh>
  );
};

export default TileHighlight;
