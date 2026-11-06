import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLazyLoadQuery } from 'react-relay';
import FormationQuery from '~/autogen/relay/FormationQuery.graphql';
import type { FormationQuery as FormationQueryType } from '~/autogen/relay/FormationQuery.graphql';
import * as Constants from '~/views/Game/constants';
import * as Pieces from '~/views/Game/pieces';
import styles from './index.module.css';

const CAMERA_DISTANCE = 6;
const CAMERA_POSITION = [0, CAMERA_DISTANCE * 1.35, CAMERA_DISTANCE] as const;
const HALF_BOARD_WIDTH = 8;
const HALF_BOARD_DEPTH = 6;
const BOARD_TILE_COLOR = '#d0d0d0';

const FormationPiece = ({ piece }: { piece: string }): React.ReactNode => {
  const visual = Pieces.visuals[piece];
  const Model = visual?.component ?? Pieces.Default;
  const rotation = visual?.rotationOffset ?? 0;
  return (
    <group rotation={[0, rotation, 0]}>
      <Model color='#4f46e5' />
    </group>
  );
};

const FormationBoard = ({ formation }: { formation: FormationQueryType['response']['formation'] }): React.ReactNode => {
  const tiles = React.useMemo(() => {
    const points = formation.map((entry) => entry.point);
    const minI = Math.min(...points.map((point) => point.i), 0);
    const minJ = Math.min(...points.map((point) => point.j), 0);
    return Array.from({ length: HALF_BOARD_DEPTH }, (_, row) =>
      Array.from({ length: HALF_BOARD_WIDTH }, (_, column) => {
        const i = minI + row;
        const j = minJ + column;
        return { i, j, odd: (i + j) % 2 === 0 };
      }),
    ).flat();
  }, [formation]);
  const offset: [number, number, number] = [
    -((HALF_BOARD_WIDTH - 1) * Constants.TILE_SIZE) / 2,
    0,
    -((HALF_BOARD_DEPTH - 1) * Constants.TILE_SIZE) / 2,
  ];

  return (
    <group position={offset}>
      {tiles.map((tile) => {
        const piece = formation.find((entry) => entry.point.i === tile.i && entry.point.j === tile.j);
        return (
          <group key={`${tile.i}-${tile.j}`} position={[tile.j * Constants.TILE_SIZE, 0, tile.i * Constants.TILE_SIZE]}>
            <mesh receiveShadow>
              <boxGeometry args={[Constants.TILE_SIZE, Constants.TILE_HEIGHT, Constants.TILE_SIZE]} />
              <meshStandardMaterial color={tile.odd ? BOARD_TILE_COLOR : '#dddddd'} roughness={0.7} />
            </mesh>
            {piece && <FormationPiece piece={piece.piece} />}
          </group>
        );
      })}
    </group>
  );
};

const Formation = (): React.ReactNode => {
  const data = useLazyLoadQuery<FormationQueryType>(FormationQuery, {}, { fetchPolicy: 'network-only' });
  return (
    <div className={styles.root}>
      <Canvas camera={{ position: CAMERA_POSITION, fov: 45 }} style={{ background: '#f0f0f0' }}>
        <OrbitControls maxPolarAngle={Math.PI / 2 - 0.05} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 20, 10]} castShadow />
        <directionalLight position={[5, 5, 5]} castShadow />
        <FormationBoard formation={data.formation} />
      </Canvas>
    </div>
  );
};

export default Formation;
