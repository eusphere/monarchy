import * as React from 'react';
import { Color } from 'three';
import _Default from './Default';
import { useGLTF } from '@react-three/drei';

type Props = {
  model: string;
  scale?: number;
  offset?: [number, number, number];
  color?: string;
};

const Base = (props: Props) => {
  const { scale, offset, model, color } = props;
  const { scene } = useGLTF(model);
  const clone = React.useMemo(() => {
    const next = scene.clone();
    const tint = new Color(color ?? '#8f887d');
    next.traverse((object) => {
      if (!object.isMesh || !object.material) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      const tintedMaterials = materials.map((material) => {
        const nextMaterial = material.clone();
        if ('color' in nextMaterial && nextMaterial.color) {
          nextMaterial.color.set('#d8d2c8').lerp(tint, 0.68);
        }
        return nextMaterial;
      });
      object.material = Array.isArray(object.material) ? tintedMaterials : tintedMaterials[0];
    });
    return next;
  }, [color, scene]);
  return (
    <primitive 
      object={clone} 
      scale={scale}
      position={offset}
    />
  )
};

export const Default = _Default;

export const Knight = (props: { color?: string }) => (
  <Base
    scale={0.04}
    offset={[-0.43, 0, -0.75]}
    model='/models/knight.glb'
    color={props.color}
  />
);

export const Priestess = (props: { color?: string }) => (
  <Base
    scale={0.5}
    offset={[0, 0.4, 0]}
    model='/models/priestess.glb'
    color={props.color}
  />
);

export const Archer = (props: { color?: string }) => (
  <Base
    scale={0.012}
    model='/models/archer.glb'
    color={props.color}
  />
);

export const Pyromancer = (props: { color?: string }) => (
  <Base
    scale={0.6}
    offset={[0, 0.55, 0]}
    model='/models/pyromancer.glb'
    color={props.color}
  />
);
