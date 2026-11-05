import * as React from 'react';
import { Box } from '@radix-ui/themes';
import { formatDateRelative } from '~/util/format';
import SummaryTile from '~/layout/SummaryTile';
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
  const game = useFragment(GameFragment, props.game);
  const createdAt = new Date(game.createdAt);
  const gameAtFormatted = formatDateRelative(createdAt);

  return (
    <SummaryTile to={`/game/${game.id}`} status={game.selfStatus && <PlayerStatus status={game.selfStatus} />}>
      <Box className={styles.players}>
        {game.players.map((player, index) => (
          <Player key={index} player={player} selfId={props.selfId} />
        ))}
      </Box>
      <Note text={gameAtFormatted} />
    </SummaryTile>
  );
};

export default Game;
