import * as React from 'react';
import { Section } from '@radix-ui/themes';
import { useFragment, useLazyLoadQuery } from 'react-relay';
import Game from '~/layout/GameSummary';
import GamesQuery from '~/autogen/relay/GamesQuery.graphql';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import styles from './index.module.css';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import type { OperationType } from 'relay-runtime';
import type { GamesQuery$data, GamesQuery$variables } from '~/autogen/relay/GamesQuery.graphql';

type GamesOperationType = OperationType & {
  response: GamesQuery$data;
  variables: GamesQuery$variables;
};

const Games = (): React.ReactNode => {
  const selfRef = useLazyLoadQuery<SelfQueryType>(SelfQuery, {});
  const user = useFragment<UserFragment$key>(UserFragment, selfRef.self);
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
