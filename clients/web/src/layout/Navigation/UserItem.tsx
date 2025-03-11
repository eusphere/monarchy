import * as React from 'react';
import ErrorBoundary from '~/layout/ErrorBoundary';
import Profile from '../Profile';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';
import { useLazyLoadQuery, useFragment } from 'react-relay';
import { Button } from '@radix-ui/themes';

const UserItemInner = (): React.ReactNode => {
  const data = useLazyLoadQuery<SelfQueryType>(SelfQuery, {});
  const user = useFragment<UserFragment$key>(UserFragment, data.self);
  return (
    <Button variant='ghost' size='2'>
      <Profile icon user={user} />
    </Button>
  );
}

const UserItem = (): React.ReactNode => {
  return (
    <ErrorBoundary>
      <UserItemInner />
    </ErrorBoundary>
  );
};

export default UserItem;
