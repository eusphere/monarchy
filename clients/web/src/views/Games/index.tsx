import * as React from 'react';
import { useFragment, useLazyLoadQuery } from 'react-relay';
import GamesQuery from '~/autogen/relay/GamesQuery.graphql';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import styles from './index.module.css';
import type { GamesQuery as GamesQueryType } from '~/autogen/relay/GamesQuery.graphql';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import { Table } from '@radix-ui/themes';


const Games = (): React.ReactNode => {
  const selfRef = useLazyLoadQuery<SelfQueryType>(SelfQuery, {});
  const user = useFragment<UserFragment$key>(UserFragment, selfRef.self);
  const games = useLazyLoadQuery<GamesQueryType>(GamesQuery, {
    q: {
      userId: user.id,
    },
  });
  console.log(games);
  return (
    <div className={styles.root}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
            <Table.Cell>danilo@example.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default Games;
