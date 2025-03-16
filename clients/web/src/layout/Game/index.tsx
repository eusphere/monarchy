import * as React from 'react';
import { Card, Flex, Text, Box } from '@radix-ui/themes';
import { useFragment } from 'react-relay';
import GameFragment from '~/autogen/relay/GameFragment.graphql';
import styles from './index.module.css';
import Note from '~/layout/Note';
import PlayerFragment from '~/autogen/relay/PlayerFragment.graphql';
import PlayerStatus from './PlayerStatus';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import type { GameFragment$key } from '~/autogen/relay/GameFragment.graphql';
import type { PlayerFragment$key } from '~/autogen/relay/PlayerFragment.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import { formatDateRelative, formatRatingDelta } from '~/util/format';

type PlayerProps = {
  player: PlayerFragment$key;
  selfId: string;
};

const Player = (props: PlayerProps): React.ReactNode => {
  const player = useFragment<PlayerFragment$key>(PlayerFragment, props.player);
  const { rating, ratingDelta } = player;
  const user = useFragment<UserFragment$key>(UserFragment, player.user);

  return (
    <Flex gap='3'>
      <Text as='div' size='2'>
        {user?.username} {rating} {ratingDelta && formatRatingDelta(ratingDelta)}
      </Text>
    </Flex>
  );
};

type Props = {
  selfId: string;
  game: GameFragment$key;
};

const Game = (props: Props): React.ReactNode => {
  const game = useFragment<GameFragment$key>(GameFragment, props.game);
  const createdAt = new Date(game.createdAt);
  const gameAtFormatted = formatDateRelative(createdAt);

  return (
    <Card size='1'>
      <Flex justify='between' align='center' gap='3'>
        {game.selfStatus && <PlayerStatus status={game.selfStatus} size='3' />}
        <Note text={gameAtFormatted} />
      </Flex>
      <Box className={styles.players}>
        {game.players.map((player, index) => (
          <Player key={index} player={player} selfId={props.selfId} />
        ))}
      </Box>
		</Card>
  );
};

export default Game;
