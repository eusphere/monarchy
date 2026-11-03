import { Text } from '@radix-ui/themes';
import { useFragment } from 'react-relay';
import PlayerFragment from '~/autogen/relay/PlayerFragment.graphql';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import type { PlayerFragment$key } from '~/autogen/relay/PlayerFragment.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import styles from './index.module.css';
import GamePhaseIcon, { type GamePhaseIconKind } from './GamePhaseIcon';

const fallbackColors = ['#78a9dc', '#e8a27d'];

const phaseLabel = (phase: string | undefined): string => {
  if (!phase) return 'Preparing';
  return phase === '%future added value'
    ? 'Playing'
    : phase.charAt(0) + phase.slice(1).toLowerCase();
};

const phaseIcon = (phase: string | undefined): GamePhaseIconKind => {
  switch (phase) {
    case 'MOVE': return 'moving';
    case 'ATTACK': return 'attacking';
    case 'DIR':
    case 'SELECT': return 'turning';
    default: return 'turning';
  }
};

type SideProps = {
  player: PlayerFragment$key;
  active: boolean;
  side: 'left' | 'right';
  index: number;
  phase?: string;
};

const TurnSide = ({ player: playerRef, active, side, index, phase }: SideProps) => {
  const player = useFragment<PlayerFragment$key>(PlayerFragment, playerRef);
  const user = useFragment<UserFragment$key>(UserFragment, player.user);
  const color = user?.profile?.color || fallbackColors[index] || '#9a9a9a';
  const name = user?.username || 'Waiting for player';
  const statusKind: GamePhaseIconKind = player.status === 'WON'
    ? 'victory'
    : player.status === 'LOST'
      ? 'forfeit'
      : active ? phaseIcon(phase) : 'waiting';
  const statusLabel = player.status === 'WON'
    ? 'Victory'
    : player.status === 'LOST'
      ? 'Forfeit'
      : active ? phaseLabel(phase) : 'Waiting';

  return (
    <div
      className={`${styles.side} ${side === 'right' ? styles.right : ''} ${active ? styles.active : styles.inactive}`}
      aria-label={`${name}${active ? `, ${phaseLabel(phase)} phase` : ''}`}
    >
      <div className={styles.colorSquare} style={{ backgroundColor: color }} aria-hidden='true' />
      <div className={styles.playerDetails}>
        <Text size='4' weight='bold' truncate>{name}</Text>
        <Text as='div' size='1' color='gray' className={styles.phaseLabel}>
          <GamePhaseIcon kind={statusKind} size={16} />
          <span>{statusLabel}</span>
        </Text>
      </div>
    </div>
  );
};

type Props = {
  players: ReadonlyArray<PlayerFragment$key & { readonly id: string }>;
  currentPlayerId?: string | null;
  phase?: string;
};

const TurnBanner = ({ players, currentPlayerId, phase }: Props) => {
  if (players.length < 2) return null;
  const [left, right] = players;

  return (
    <div className={styles.banner} aria-live='polite' aria-label='Turn indicator'>
      <TurnSide player={left} side='left' index={0} active={left.id === currentPlayerId} phase={phase} />
      <TurnSide player={right} side='right' index={1} active={right.id === currentPlayerId} phase={phase} />
    </div>
  );
};

export default TurnBanner;
