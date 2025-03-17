import { useGLTF } from '@react-three/drei';
import * as React from 'react';

const SCALE = 0.014;

type Props = {};

const Archer = (_: Props) => {
  const { scene } = useGLTF('/models/scout.glb');
  const clone = React.useMemo(() => scene.clone(), [scene]);
  return (
    <primitive 
      object={clone} 
      scale={SCALE}
    />
  )
};

export default Archer;
