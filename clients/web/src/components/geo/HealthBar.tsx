import * as React from 'react';
import { Billboard } from '@react-three/drei';
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

const HEALTH_BAR_VERTEX_SHADER = /* glsl */ `
  varying vec2 vHealthBarUv;

  void main() {
    vHealthBarUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const HEALTH_BAR_FRAGMENT_SHADER = /* glsl */ `
  uniform float ratio;
  uniform vec3 fillColor;
  uniform vec3 trackColor;
  varying vec2 vHealthBarUv;

  void main() {
    // Evaluate the rounded rectangle in physical bar proportions rather than
    // treating the wide and short UV axes as if they were square.
    const vec2 barSize = vec2(1.0, 0.1 / 0.7);
    const vec2 halfSize = barSize * 0.5;
    const float radius = 0.03 / 0.7;
    vec2 centered = abs(vHealthBarUv - 0.5) * barSize - (halfSize - vec2(radius));
    float distanceToEdge = length(max(centered, 0.0)) + min(max(centered.x, centered.y), 0.0) - radius;
    float edge = 1.0 - smoothstep(0.0, 0.02, distanceToEdge);
    vec3 color = vHealthBarUv.x <= ratio ? fillColor : trackColor;
    gl_FragColor = vec4(color, edge);
  }
`;

const HealthBar = ({ current, maximum, position = [0, 1.45, 0] }: Props): React.ReactNode => {
  const ratio = Math.min(1, Math.max(0, maximum > 0 ? current / maximum : 0));
  if (ratio >= 1) return null;

  const width = 0.7;
  const height = 0.1;
  const fillColor = new Color(colorForRatio(ratio));
  return (
    <Billboard position={position} scale={0.7} follow renderOrder={100} userData={{ healthBar: true }}>
      <mesh raycast={() => null}>
        <planeGeometry args={[width, height]} />
        <shaderMaterial
          uniforms={{
            ratio: { value: ratio },
            fillColor: { value: fillColor },
            trackColor: { value: new Color('#e5e7eb') },
          }}
          vertexShader={HEALTH_BAR_VERTEX_SHADER}
          fragmentShader={HEALTH_BAR_FRAGMENT_SHADER}
          transparent
          depthTest={false}
          depthWrite={false}
          side={DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </Billboard>
  );
};

export default HealthBar;
