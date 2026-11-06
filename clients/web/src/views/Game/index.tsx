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
import GameDeselectMutation from '~/autogen/relay/GameDeselectMutation.graphql';
import GameMoveMutation from '~/autogen/relay/GameMoveMutation.graphql';
import GameAttackMutation from '~/autogen/relay/GameAttackMutation.graphql';
import type { GameSelectMutation as GameSelectMutationType } from '~/autogen/relay/GameSelectMutation.graphql';
import type { GameDeselectMutation as GameDeselectMutationType } from '~/autogen/relay/GameDeselectMutation.graphql';
import type { GameMoveMutation as GameMoveMutationType } from '~/autogen/relay/GameMoveMutation.graphql';
import type { GameAttackMutation as GameAttackMutationType } from '~/autogen/relay/GameAttackMutation.graphql';
import { subscribe } from '~/network/stream';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import GameSelectionFragment from '~/autogen/relay/GameSelectionFragment.graphql';
import type { GameSelectionFragment$key, Phase } from '~/autogen/relay/GameSelectionFragment.graphql';
import GameEndTurnMutation from '~/autogen/relay/GameEndTurnMutation.graphql';
import GameDirectionMutation from '~/autogen/relay/GameDirectionMutation.graphql';
import type { GameDirectionMutation as GameDirectionMutationType } from '~/autogen/relay/GameDirectionMutation.graphql';
import type { GameEndTurnMutation as GameEndTurnMutationType } from '~/autogen/relay/GameEndTurnMutation.graphql';
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
  const [deselectPiece] = useMutation<GameDeselectMutationType>(GameDeselectMutation);
  const [movePiece] = useMutation<GameMoveMutationType>(GameMoveMutation);
  const [attackPiece] = useMutation<GameAttackMutationType>(GameAttackMutation);
  const [endTurn, isEndingTurn] = useMutation<GameEndTurnMutationType>(GameEndTurnMutation);
  const [directionPiece] = useMutation<GameDirectionMutationType>(GameDirectionMutation);
  const gameState = data.game?.state;
  const selection = useFragment<GameSelectionFragment$key>(GameSelectionFragment, gameState?.currentSelection);
  const [activePhase, setActivePhase] = React.useState<Phase | undefined>();
  const allowedPhases = selection?.phases ?? [];
  const serverSelectionKey = [
    gameState?.currentPlayerId,
    selection?.selection?.i,
    selection?.selection?.j,
    selection?.phases.join(','),
  ].join(':');
  const previousServerSelectionKey = React.useRef(serverSelectionKey);
  React.useEffect(() => {
    if (previousServerSelectionKey.current !== serverSelectionKey) {
      previousServerSelectionKey.current = serverSelectionKey;
      setActivePhase(undefined);
    }
  }, [serverSelectionKey]);
  React.useEffect(() => {
    if (!activePhase || !allowedPhases.includes(activePhase)) setActivePhase(allowedPhases[0]);
  }, [activePhase, allowedPhases]);

  React.useEffect(() => subscribe((message) => {
    if (message.name !== 'GameChange' || typeof message.data !== 'object' || message.data === null) return;
    if ('gameId' in message.data && message.data.gameId === gameId) setRefreshKey((key) => key + 1);
  }), [gameId]);

  const refreshGame = React.useCallback(() => {
    setActivePhase(undefined);
    setRefreshKey((key) => key + 1);
  }, []);

  React.useEffect(() => {
    const onlyEndTurnRemains = allowedPhases.length > 0 && allowedPhases.every((phase) => phase === 'END');
    if (gameState?.currentPlayerId !== selfPlayerId || !onlyEndTurnRemains || isEndingTurn) return;
    endTurn({
      variables: { q: { gameId } },
      onCompleted: refreshGame,
    });
  }, [allowedPhases, endTurn, gameId, gameState?.currentPlayerId, isEndingTurn, refreshGame, selfPlayerId]);

  const onSelect = React.useCallback((point: { i: number; j: number }) => {
    selectPiece({
      variables: { q: { gameId, point } },
      onCompleted: refreshGame,
    });
  }, [gameId, refreshGame, selectPiece]);
  const onDeselect = React.useCallback(() => {
    deselectPiece({
      variables: { q: { gameId } },
      onCompleted: refreshGame,
    });
  }, [deselectPiece, gameId, refreshGame]);
  const onMove = React.useCallback((point: { i: number; j: number }) => {
    movePiece({
      variables: { q: { gameId, point } },
      onCompleted: refreshGame,
    });
  }, [gameId, movePiece, refreshGame]);
  const onEndTurn = React.useCallback(() => {
    endTurn({
      variables: { q: { gameId } },
      onCompleted: refreshGame,
    });
  }, [endTurn, gameId, refreshGame]);
  const onDirection = React.useCallback((direction: { i: number; j: number }) => {
    directionPiece({ variables: { q: { gameId, direction } }, onCompleted: refreshGame });
  }, [directionPiece, gameId, refreshGame]);
  const onAttack = React.useCallback((attack: ReadonlyArray<{ i: number; j: number }>) => {
    attackPiece({
      variables: { q: { gameId, attack } },
      onCompleted: refreshGame,
    });
  }, [attackPiece, gameId, refreshGame]);
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
      {data.game && <Panel game={data.game} pieceColors={pieceColors} activePhase={activePhase} onPhaseChange={setActivePhase} onEndTurn={onEndTurn} />}
      <Canvas
        camera={{ position: CAMERA_POS, fov: 45 }}
        style={{ background: '#f0f0f0' }}
      >
        <OrbitControls maxPolarAngle={Math.PI / 2 - 0.05} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 20, 10]} castShadow />
        <directionalLight position={[5, 5, 5]} castShadow />
        {gameState && <Board state={gameState} pieceColors={pieceColors} selfPlayerId={selfPlayerId} activePhase={activePhase} onSelect={onSelect} onDeselect={onDeselect} onMove={onMove} onAttack={onAttack} onDirection={onDirection} />}
      </Canvas>
    </Box>
  );
};

export default Game;
