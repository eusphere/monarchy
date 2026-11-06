import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLazyLoadQuery } from 'react-relay';
import FormationQuery from '~/autogen/relay/FormationQuery.graphql';
import type { FormationQuery as FormationQueryType } from '~/autogen/relay/FormationQuery.graphql';
import * as Constants from '~/views/Game/constants';
import * as Pieces from '~/views/Game/pieces';
import { PIECE_OFFSET } from '~/views/Game/pieceConstants';
import styles from './index.module.css';

const CAMERA_DISTANCE = 6;
const CAMERA_POSITION = [0, CAMERA_DISTANCE * 1.35, CAMERA_DISTANCE] as const;
const HALF_BOARD_WIDTH = 5;
const HALF_BOARD_DEPTH = 11;
const BOARD_TILE_COLOR = '#d0d0d0';

const FormationPiece = ({ piece, color }: { piece: string, color: string }): React.ReactNode => {
  const visual = Pieces.visuals[piece];
  const Model = visual?.component ?? Pieces.Default;
  const rotation = visual?.rotationOffset ?? 0;
  return (
    <group position={PIECE_OFFSET} rotation={[0, Math.PI / 2 + rotation, 0]}>
      <Model color={color} />
    </group>
  );
};

const FormationBoard = ({ formation, color }: { formation: FormationQueryType['response']['formation'], color: string }): React.ReactNode => {
  const tiles = React.useMemo(() => {
    const minI = 0;
    return Array.from({ length: HALF_BOARD_DEPTH }, (_, row) =>
      Array.from({ length: HALF_BOARD_WIDTH }, (_, column) => {
        const i = minI + row;
        const j = column;
        return { i, j, row, column, odd: (i + j) % 2 === 0 };
      }),
    ).flat();
  }, []);
  const offset: [number, number, number] = [
    -((HALF_BOARD_WIDTH - 1) * Constants.TILE_SIZE) / 2,
    0,
    -((HALF_BOARD_DEPTH - 1) * Constants.TILE_SIZE) / 2,
  ];

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      <group position={offset}>
        {tiles.map((tile) => {
          const piece = formation.find((entry) => entry.point.i === tile.i && entry.point.j === tile.j);
          const isMissingCorner = (
            (tile.row === 0 || tile.row === HALF_BOARD_DEPTH - 1) && tile.column < 2
          ) || (
            (tile.row === 1 || tile.row === HALF_BOARD_DEPTH - 2) && tile.column === 0
          );
          if (isMissingCorner) return null;
          return (
            <group key={`${tile.i}-${tile.j}`} position={[tile.column * Constants.TILE_SIZE, 0, tile.row * Constants.TILE_SIZE]}>
              <mesh receiveShadow>
                <boxGeometry args={[Constants.TILE_SIZE, Constants.TILE_HEIGHT, Constants.TILE_SIZE]} />
                <meshStandardMaterial color={tile.odd ? BOARD_TILE_COLOR : '#dddddd'} roughness={0.7} />
              </mesh>
              {piece && <FormationPiece piece={piece.piece} color={color} />}
            </group>
          );
        })}
      </group>
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
        <FormationBoard formation={data.formation} color={data.self?.profile?.color ?? '#4f46e5'} />
      </Canvas>
    </div>
  );
};

export default Formation;
