import * as React from 'react';
import { Box } from '@radix-ui/themes';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useParams } from 'react-router-dom';
import GameQuery from '~/autogen/relay/GameQuery.graphql';
import Board from './Board';
import Panel from './Panel';
import styles from './index.module.css';
import type { GameQuery as GameQueryType } from '~/autogen/relay/GameQuery.graphql';
import GameSelectMutation from '~/autogen/relay/GameSelectMutation.graphql';
import type { GameSelectMutation as GameSelectMutationType } from '~/autogen/relay/GameSelectMutation.graphql';
import { subscribe } from '~/network/stream';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import { useFragment } from 'react-relay';

const CAMERA_DIST = 9;
const CAMERA_POS = [0, 1.4 * CAMERA_DIST, CAMERA_DIST] as const;

const Game = (): React.ReactNode => {
  const { gameId: _gameId } = useParams();
  const gameId = _gameId as string;
  const [refreshKey, setRefreshKey] = React.useState(0);
  const selfData = useLazyLoadQuery<SelfQueryType>(SelfQuery, {}, { fetchPolicy: 'store-or-network' });
  const self = useFragment<UserFragment$key>(UserFragment, selfData.self);
  const data = useLazyLoadQuery<GameQueryType>(GameQuery, { id: gameId }, { fetchPolicy: 'network-only', fetchKey: refreshKey });
  const selfPlayerId = data.game?.players.find((player) => player.user?.id === self.id)?.id;
  const [selectPiece] = useMutation<GameSelectMutationType>(GameSelectMutation);
  const gameState = data.game?.state;

  React.useEffect(() => subscribe((message) => {
    if (message.name !== 'GameChange' || typeof message.data !== 'object' || message.data === null) return;
    if ('gameId' in message.data && message.data.gameId === gameId) setRefreshKey((key) => key + 1);
  }), [gameId]);

  const onSelect = React.useCallback((point: { i: number; j: number }) => {
    selectPiece({ variables: { q: { gameId, point } } });
  }, [gameId, selectPiece]);
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
        {gameState && <Board state={gameState} pieceColors={pieceColors} selfPlayerId={selfPlayerId} onSelect={onSelect} />}
      </Canvas>
    </Box>
  );
};

export default Game;
