import * as React from 'react';

const DIMENSIONS = [0.5, 1.0, 0.5] as const;
const POSITION = [0, 0.5, 0] as const;

const Default = (): React.ReactNode => {
  return (
    <mesh position={POSITION} castShadow receiveShadow>
      <boxGeometry args={DIMENSIONS} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Default;
