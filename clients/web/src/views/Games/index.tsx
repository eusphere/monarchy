import * as React from 'react';
import { Section } from '@radix-ui/themes';
import { useLazyLoadQuery } from 'react-relay';
import Game from '~/layout/GameSummary';
import GamesQuery from '~/autogen/relay/GamesQuery.graphql';
import styles from './index.module.css';
import type { OperationType } from 'relay-runtime';
import type { GamesQuery$data, GamesQuery$variables } from '~/autogen/relay/GamesQuery.graphql';
import useAuthenticatedUser from '~/layout/Authenticated/useAuthenticatedUser';

type GamesOperationType = OperationType & {
  response: GamesQuery$data;
  variables: GamesQuery$variables;
};

const Games = (): React.ReactNode => {
  const user = useAuthenticatedUser();
  const games = useLazyLoadQuery<GamesOperationType>(GamesQuery, {
    q: {
      userId: user.id,
    },
  });
  return (
    <Section size="1" className={styles.root}>
      {games.games.map((game, index) => (
        <Game key={index} game={game} selfId={user.id} />
      ))}
    </Section>
  );
};

export default Games;
