import * as React from 'react';
import * as Types from '~/types';
import styles from './index.module.css';
import { Box } from '@radix-ui/themes';
import Player from '~/layout/GameSummary/Player';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import { useLazyLoadQuery, useFragment } from 'react-relay';
import UserFragment from '~/autogen/relay/UserFragment.graphql';

type Props = {
  game: Types.Game;
};

const Panel = (props: Props): React.ReactNode => {
  const selfRef = useLazyLoadQuery<SelfQueryType>(SelfQuery, {});
  const self = useFragment<UserFragment$key>(UserFragment, selfRef.self);
  const { game } = props;

  return (
    <Box className={styles.root}>
      <Box>
        {game.players.map((player, index) => (
          <Player key={index} player={player} selfId={self.id} />
        ))}
      </Box>
    </Box>
  );
};

export default Panel;
