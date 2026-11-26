import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds } from '@react-three/drei';
import { Knight } from '~/views/Game/pieces';
import styles from './index.module.css';

const PiecePreview = ({ color }: { color: string }) => (
  <div className={styles.piecePreview} role='img' aria-label='Piece preview in your player color'>
    <Canvas frameloop='demand' dpr={[1, 2]} camera={{ position: [2, 1.5, 3], fov: 32 }}
      gl={{ alpha: true, antialias: true }} onCreated={({ gl }) => gl.setClearColor(0, 0)}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.15}>
          <group rotation={[0, -.6, 0]}><Knight color={color} /></group>
        </Bounds>
      </Suspense>
    </Canvas>
  </div>
);

export default PiecePreview;
