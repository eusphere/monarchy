import * as React from 'react';
import _Default from './Default';
import { useGLTF } from '@react-three/drei';

type Props = {
  model: string;
  scale?: number;
  offset?: [number, number, number];
};

const Base = (props: Props) => {
  const { scale, offset, model } = props;
  const { scene } = useGLTF(model);
  const clone = React.useMemo(() => scene.clone(), [scene]);
  return (
    <primitive 
      object={clone} 
      scale={scale}
      position={offset}
    />
  )
};

export const Default = _Default;

export const Knight = () => (
  <Base
    scale={0.04}
    offset={[-0.43, 0, -0.75]}
    model='/models/knight.glb'
  />
);

export const Priestess = () => (
  <Base
    scale={0.5}
    offset={[0, 0.4, 0]}
    model='/models/priestess.glb'
  />
);

export const Archer = () => (
  <Base
    scale={0.012}
    model='/models/archer.glb'
  />
);

export const Pyromancer = () => (
  <Base
    scale={0.6}
    offset={[0, 0.55, 0]}
    model='/models/pyromancer.glb'
  />
);
