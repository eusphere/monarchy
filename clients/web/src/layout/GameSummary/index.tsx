import * as React from 'react';
import { Card, Flex, Box } from '@radix-ui/themes';
import { formatDateRelative } from '~/util/format';
import { Link } from 'react-router-dom';
import { useFragment } from 'react-relay';
import GameFragment from '~/autogen/relay/GameFragment.graphql';
import Note from '~/layout/Note';
import Player from './Player';
import PlayerStatus from './PlayerStatus';
import styles from './index.module.css';
import type { GameFragment$key } from '~/autogen/relay/GameFragment.graphql';

type Props = {
  selfId: string;
  game: GameFragment$key;
};

const Game = (props: Props): React.ReactNode => {
  const game = useFragment<GameFragment$key>(GameFragment, props.game);
  const createdAt = new Date(game.createdAt);
  const gameAtFormatted = formatDateRelative(createdAt);

  return (
    <Card size='1' asChild>
      <Link to={`/game/${game.id}`}>
        <Flex justify='between' align='center' gap='3'>
          {game.selfStatus && <PlayerStatus status={game.selfStatus} size='3' />}
          <Note text={gameAtFormatted} />
        </Flex>
        <Box className={styles.players}>
          {game.players.map((player, index) => (
            <Player key={index} player={player} selfId={props.selfId} />
          ))}
        </Box>
      </Link>
    </Card>
  );
};

export default Game;
