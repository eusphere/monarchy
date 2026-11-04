import * as React from 'react';
import { Box } from '@radix-ui/themes';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLazyLoadQuery } from 'react-relay';
import { useParams } from 'react-router-dom';
import GameQuery from '~/autogen/relay/GameQuery.graphql';
import Board from './Board';
import Panel from './Panel';
import styles from './index.module.css';
import type { GameQuery as GameQueryType } from '~/autogen/relay/GameQuery.graphql';

const CAMERA_DIST = 9;
const CAMERA_POS = [0, 1.4 * CAMERA_DIST, CAMERA_DIST] as const;

const Game = (): React.ReactNode => {
  const { gameId: _gameId } = useParams();
  const gameId = _gameId as string;
  const data = useLazyLoadQuery<GameQueryType>(GameQuery, { id: gameId });
  const gameState = data.game?.state;
  const pieceColors = React.useMemo(() => {
    const colors: Record<string, string> = {};
    const fallbackColors = ['#4f46e5', '#d97706'];
    data.game?.players.forEach((player, index) => {
      colors[player.id] = player.user?.profile?.color ?? fallbackColors[index % fallbackColors.length];
    });
    return colors;
  }, [data.game?.players]);

  return (
    <Box className={styles.root}>
      {data.game && <Panel game={data.game} pieceColors={pieceColors} />}
      <Canvas
        camera={{ position: CAMERA_POS, fov: 45 }}
        style={{ background: '#f0f0f0' }}
      >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 20, 10]} castShadow />
        <directionalLight position={[5, 5, 5]} castShadow />
        {gameState && <Board state={gameState} pieceColors={pieceColors} />}
      </Canvas>
    </Box>
  );
};

export default Game;
