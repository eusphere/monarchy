import * as React from 'react';

type Vector3 = readonly [number, number, number];

type Props = {
  color?: string;
  opacity?: number;
  position?: Vector3;
  rotation?: Vector3;
  scale?: number | Vector3;
};

const LENGTH = 0.45;

const Arrow = ({
  color = '#ff2d55',
  opacity = 0.9,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: Props): React.ReactNode => (
  <group position={position} rotation={rotation} scale={scale} userData={{ orientationMarker: true }}>
    <mesh rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
      <cylinderGeometry args={[0.025, 0.025, LENGTH, 8]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthTest={false} />
    </mesh>
    <mesh position={[0, 0, LENGTH / 2 + 0.06]} rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
      <coneGeometry args={[0.08, 0.16, 8]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} depthTest={false} />
    </mesh>
  </group>
);

export default Arrow;
