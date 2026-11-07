import * as React from 'react';
import { useFragment } from 'react-relay';
import PlayerFragment from '~/autogen/relay/PlayerFragment.graphql';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import type { PlayerFragment$key } from '~/autogen/relay/PlayerFragment.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import styles from './index.module.css';

const fallbackColors = ['#78a9dc', '#e8a27d'];

type Props = {
  players: ReadonlyArray<PlayerFragment$key>;
  ended: boolean;
};

const VictoryBanner = ({ players, ended }: Props): React.ReactNode => {
  const left = useFragment<PlayerFragment$key>(PlayerFragment, players[0]);
  const right = useFragment<PlayerFragment$key>(PlayerFragment, players[1]);
  const winner = left?.status === 'WON' ? left : right?.status === 'WON' ? right : undefined;
  const winnerIndex = left?.status === 'WON' ? 0 : right?.status === 'WON' ? 1 : -1;
  const user = useFragment<UserFragment$key>(UserFragment, winner?.user);

  if (!ended || !winner) return null;

  const color = user?.profile?.color || fallbackColors[winnerIndex] || '#9a9a9a';
  const name = user?.username || 'Winner';
  return (
    <div
      className={styles.victoryBanner}
      style={{ '--banner-color': color } as React.CSSProperties}
      aria-label={`${name} won the game`}
    />
  );
};

export default VictoryBanner;
