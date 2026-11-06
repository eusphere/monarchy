import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

type Point = { i: number; j: number };
type Props = { directions: ReadonlyArray<Point>; onDirection: (direction: Point) => void };
const OPTIONS: ReadonlyArray<{ label: string; direction: Point }> = [
  { label: '↑', direction: { i: -1, j: 0 } },
  { label: '→', direction: { i: 0, j: 1 } },
  { label: '↓', direction: { i: 1, j: 0 } },
  { label: '←', direction: { i: 0, j: -1 } },
];

const PYRAMID_POSITION: Record<string, readonly [number, number, number]> = {
  '↑': [0, 0.08, -0.48],
  '→': [0.48, 0.08, 0],
  '↓': [0, 0.08, 0.48],
  '←': [-0.48, 0.08, 0],
};

const PYRAMID_ROTATION: Record<string, readonly [number, number, number]> = {
  '↑': [-Math.PI / 2, 0, 0],
  '→': [0, 0, -Math.PI / 2],
  '↓': [Math.PI / 2, 0, 0],
  '←': [0, 0, Math.PI / 2],
};

type ConeProps = {
  label: string;
  direction: Point;
  enabled: boolean;
  hovered: boolean;
  onHover: (label: string | null) => void;
  onDirection: (direction: Point) => void;
};

const DirectionCone = ({ label, direction, enabled, hovered, onHover, onDirection }: ConeProps): React.ReactNode => {
  const ref = React.useRef<Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = hovered ? 1.2 : 1;
    const blend = 1 - Math.exp(-delta * 14);
    ref.current.scale.x += (target - ref.current.scale.x) * blend;
    ref.current.scale.y = ref.current.scale.x;
    ref.current.scale.z = ref.current.scale.x;
  });

  return (
    <group
      ref={ref}
      position={PYRAMID_POSITION[label]}
      rotation={PYRAMID_ROTATION[label]}
      onPointerOver={(event) => {
        event.stopPropagation();
        if (enabled) onHover(label);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        onHover(null);
      }}
      onClick={(event) => {
        event.stopPropagation();
        if (enabled) onDirection(direction);
      }}>
      <mesh>
        <coneGeometry args={[0.15, 0.3, 16]} />
        <meshBasicMaterial
          color={hovered ? '#fff0a8' : enabled ? '#d8b35a' : '#9da3ad'}
          transparent
          opacity={hovered ? 1 : enabled ? 0.85 : 0.18}
          depthTest={false}
        />
      </mesh>
    </group>
  );
};

const DirectionControls = ({ directions, onDirection }: Props): React.ReactNode => {
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <group position={[0, 1.35, 0]} userData={{ directionControls: true }}>
      {OPTIONS.map(({ label, direction }) => {
      const enabled = directions.some((candidate) => candidate.i === direction.i && candidate.j === direction.j);
      const isHovered = enabled && hovered === label;
      return (
        <DirectionCone
          key={label}
          label={label}
          direction={direction}
          enabled={enabled}
          hovered={isHovered}
          onHover={setHovered}
          onDirection={onDirection}
        />
      );
      })}
    </group>
  );
};

export default DirectionControls;
