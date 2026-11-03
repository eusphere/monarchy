import * as React from 'react';
import { Flex, Text } from '@radix-ui/themes';
import { formatRatingDelta } from '~/util/format';
import { useFragment } from 'react-relay';
import PlayerFragment from '~/autogen/relay/PlayerFragment.graphql';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import type { PlayerFragment$key } from '~/autogen/relay/PlayerFragment.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import Profile from '~/layout/Profile';
import styles from './Player.module.css';

type Props = {
  player: PlayerFragment$key;
  selfId: string;
  isCurrentTurn?: boolean;
};

const Player = (props: Props): React.ReactNode => {
  const player = useFragment<PlayerFragment$key>(PlayerFragment, props.player);
  const { rating, ratingDelta } = player;
  const user = useFragment<UserFragment$key>(UserFragment, player.user);

  return (
    <Flex gap='2' align='center' className={props.isCurrentTurn ? styles.current : styles.row}>
      {user && <Profile icon user={user} />}
      <Text>{rating}</Text>
      {ratingDelta && <Text as='div' size='2'>{formatRatingDelta(ratingDelta)}</Text>}
      {props.isCurrentTurn && <Text size='1' weight='bold' color='orange'>TURN</Text>}
    </Flex>
  );
};

export default Player;
