import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, Color, Mesh, ShaderMaterial } from 'three';
import * as Constants from './constants';

type Props = {
  active: boolean;
  color?: string;
  hovered?: boolean;
  opacity?: number;
};

const TileHighlight = ({ active, color = '#fff0a8', hovered = false, opacity = 1 }: Props): React.ReactNode => {
  const highlightColor = React.useMemo(() => new Color(color), [color]);
  const material = React.useRef<ShaderMaterial>(null);
  const mesh = React.useRef<Mesh>(null);
  const baseHeight = Constants.TILE_HEIGHT * Constants.TILE_HIGHLIGHT_HEIGHT_RATIO;
  const targetHeight = baseHeight * (hovered ? Constants.TILE_HIGHLIGHT_HOVER_HEIGHT_RATIO : 1);
  const height = React.useRef(baseHeight);

  React.useLayoutEffect(() => {
    if (!material.current) return;
    material.current.uniforms.color.value.copy(highlightColor);
    material.current.uniforms.opacity.value = opacity;
  }, [highlightColor, opacity]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const step = Math.min(1, delta * 14);
    height.current += (targetHeight - height.current) * step;
    mesh.current.scale.y = height.current / baseHeight;
    mesh.current.position.y = Constants.TILE_HEIGHT / 2 + height.current / 2;
  });
  if (!active) {
    return null;
  }

  return (
    <mesh ref={mesh} position={[0, Constants.TILE_HEIGHT / 2 + baseHeight / 2, 0]}>
      <cylinderGeometry args={[
        Constants.TILE_SIZE * Constants.TILE_HIGHLIGHT_DIAMETER_RATIO / 2,
        Constants.TILE_SIZE * Constants.TILE_HIGHLIGHT_DIAMETER_RATIO / 2,
        baseHeight,
        32,
      ]} />
      <shaderMaterial
        ref={material}
        uniforms={{ color: { value: highlightColor }, opacity: { value: opacity } }}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </mesh>
  );
};

const VERTEX_SHADER = `
  varying vec3 vNormal;
  varying vec3 vViewDirection;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDirection = normalize(cameraPosition - worldPosition.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform vec3 color;
  uniform float opacity;
  varying vec3 vNormal;
  varying vec3 vViewDirection;

  void main() {
    float facing = abs(dot(normalize(vNormal), normalize(vViewDirection)));
    float rim = pow(1.0 - facing, 3.0);
    vec3 glassColor = color * (0.55 + rim * 0.9);
    float alpha = min(1.0, opacity * 1.25 * (0.28 + rim * 0.72));
    gl_FragColor = vec4(glassColor, alpha);
  }
`;

export default TileHighlight;
