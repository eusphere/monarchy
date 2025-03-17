import { useGLTF } from '@react-three/drei';
import * as React from 'react';

const SCALE = 0.04;
const OFFSET = [-0.43, 0, -0.75] as const;

type Props = {};

const Knight = (_: Props) => {
  const { scene } = useGLTF('/models/knight.glb');
  const clone = React.useMemo(() => scene.clone(), [scene]);
  return (
    <primitive 
      object={clone} 
      scale={SCALE}
      position={OFFSET}
    />
  )
};

export default Knight;
