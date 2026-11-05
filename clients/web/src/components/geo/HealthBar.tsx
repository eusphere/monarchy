import * as React from 'react';
import { Billboard, RoundedBox } from '@react-three/drei';
import { Color, DoubleSide } from 'three';

type Props = {
  current: number;
  maximum: number;
  position?: readonly [number, number, number];
};

const colorForRatio = (ratio: number): string => {
  if (ratio >= 0.75) return '#35a853';
  if (ratio >= 0.5) return '#e0b341';
  if (ratio >= 0.25) return '#e8892d';
  return '#d64545';
};

const HealthBar = ({ current, maximum, position = [0, 1.45, 0] }: Props): React.ReactNode => {
  const ratio = Math.min(1, Math.max(0, maximum > 0 ? current / maximum : 0));
  if (ratio >= 1) return null;

  const width = 0.7;
  const height = 0.1;
  const fillWidth = width * ratio;
  const fillColor = new Color(colorForRatio(ratio));
  return (
    <Billboard position={position} scale={0.7} follow renderOrder={100} userData={{ healthBar: true }}>
      <group>
        <RoundedBox args={[width, height, 0.01]} radius={0.025} smoothness={3} position={[0, 0, 0]} renderOrder={0} raycast={() => null}>
          <meshBasicMaterial color='#e5e7eb' depthTest={false} depthWrite={false} side={DoubleSide} />
        </RoundedBox>
        <RoundedBox args={[fillWidth, height, 0.012]} radius={0.025} smoothness={3} position={[-(width - fillWidth) / 2, 0, 0.008]} renderOrder={1} raycast={() => null}>
          <meshBasicMaterial color={fillColor} toneMapped={false} depthTest={false} depthWrite={false} side={DoubleSide} />
        </RoundedBox>
      </group>
    </Billboard>
  );
};

export default HealthBar;
