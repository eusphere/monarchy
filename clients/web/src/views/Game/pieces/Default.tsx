import * as React from 'react';

const DIMENSIONS = [0.5, 1.0, 0.5] as const;
const POSITION = [0, 0.5, 0] as const;

type Props = { color?: string };

const Default = ({ color }: Props): React.ReactNode => {
  return (
    <mesh position={POSITION} castShadow receiveShadow>
      <boxGeometry args={DIMENSIONS} />
      <meshStandardMaterial color={color ?? '#d8d2c8'} roughness={0.7} metalness={0.1} />
    </mesh>
  );
};

export default Default;
