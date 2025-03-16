import * as React from 'react';
import { Box } from '@radix-ui/themes';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';
import GameQuery from '~/autogen/relay/GameQuery.graphql';
import styles from './index.module.css';
import type { GameQuery as GameQueryType } from '~/autogen/relay/GameQuery.graphql';
import Board from './Board';

const Game = (): React.ReactNode => {
  const { gameId: _gameId } = useParams();
  const gameId = _gameId as string;
  const data = useLazyLoadQuery<GameQueryType>(GameQuery, { id: gameId });
  const gameState = data.game?.state;

  return (
    <Box className={styles.root}>
      <Canvas
        camera={{ position: [0, 5, 5], fov: 75 }}
        style={{ background: '#f0f0f0' }}
      >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {gameState && <Board state={gameState} />}
        <gridHelper args={[10, 10]} />
      </Canvas>
    </Box>
  );
};

export default Game;
