import { Text } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import { useFragment } from 'react-relay';
import PlayerFragment from '~/autogen/relay/PlayerFragment.graphql';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import type { PlayerFragment$key } from '~/autogen/relay/PlayerFragment.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import styles from './index.module.css';
import Caption from '~/components/typography/Caption';

const fallbackColors = ['#78a9dc', '#e8a27d'];

const phaseLabel = (phase: string | undefined): string => {
  if (!phase) return 'Preparing';
  return phase === '%future added value'
    ? 'Playing'
    : phase.charAt(0) + phase.slice(1).toLowerCase();
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
  return (
    <div
      className={`${styles.side} ${side === 'right' ? styles.right : ''} ${active ? styles.active : styles.inactive}`}
      aria-label={`${name}${active ? `, ${phaseLabel(phase)} phase` : ''}`}
    >
      <div className={styles.colorSquare} style={{ backgroundColor: color }} aria-hidden='true' />
      <div className={styles.playerDetails}>
        <Text size='4' weight='bold' truncate>{name}</Text>
        <Caption className={styles.phaseLabel}>
          <span>{player.rating}</span>
          {player.ratingDelta != null && player.ratingDelta !== 0 && (
            <span>{player.ratingDelta > 0 ? '+' : ''}{player.ratingDelta}</span>
          )}
        </Caption>
      </div>
    </div>
  );
};

type Props = {
  players: ReadonlyArray<PlayerFragment$key & { readonly id: string }>;
  currentPlayerId?: string | null;
  phase?: string;
  phaseControls?: ReactNode;
};

const TurnBanner = ({ players, currentPlayerId, phase, phaseControls }: Props) => {
  if (players.length < 2) return null;
  const [left, right] = players;

  return (
    <div className={styles.banner} aria-live='polite' aria-label='Turn indicator'>
      <TurnSide player={left} side='left' index={0} active={left.id === currentPlayerId} phase={phase} />
      {phaseControls && <div className={styles.phaseCenter}>{phaseControls}</div>}
      <TurnSide player={right} side='right' index={1} active={right.id === currentPlayerId} phase={phase} />
    </div>
  );
};

export default TurnBanner;
