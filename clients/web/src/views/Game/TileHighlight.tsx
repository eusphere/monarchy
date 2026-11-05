import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, Color, ShaderMaterial } from 'three';
import * as Constants from './constants';

type Props = {
  active: boolean;
  color?: string;
  intensity?: number;
};

const TileHighlight = ({ active, color = '#fff0a8', intensity = 1 }: Props): React.ReactNode => {
  const material = React.useRef<ShaderMaterial>(null);
  const highlightColor = React.useMemo(() => new Color(color), [color]);

  React.useLayoutEffect(() => {
    if (!material.current) return;
    material.current.uniforms.color.value.copy(highlightColor);
    material.current.uniforms.intensity.value = intensity;
  }, [highlightColor, intensity]);

  useFrame(({ clock }) => {
    if (material.current) {
      const pulse = 0.5 + 0.5 * Math.sin(clock.elapsedTime * 2.2);
      material.current.uniforms.opacity.value = active ? 0.22 + pulse * 0.1 : 0;
    }
  });

  if (!active) {
    return null;
  }

  return (
    <mesh position={[0, Constants.TILE_HEIGHT / 2 + 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[Constants.TILE_SIZE * 0.62, 32]} />
      <shaderMaterial
        ref={material}
        uniforms={{ color: { value: highlightColor }, intensity: { value: intensity }, opacity: { value: 0.27 } }}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        blending={AdditiveBlending}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform vec3 color;
  uniform float intensity;
  uniform float opacity;
  varying vec2 vUv;
  void main() {
    float distanceFromCenter = distance(vUv, vec2(0.5));
    float falloff = 1.0 - smoothstep(0.05, 0.5, distanceFromCenter);
    gl_FragColor = vec4(color, falloff * opacity * intensity);
  }
`;

export default TileHighlight;
