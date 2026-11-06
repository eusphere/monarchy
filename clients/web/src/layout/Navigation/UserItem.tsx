import * as React from 'react';
import ErrorBoundary from '~/layout/ErrorBoundary';
import Profile from '../Profile';
import type { UserFragment$data } from '~/autogen/relay/UserFragment.graphql';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

type Props = {
  user: UserFragment$data;
};

const UserItemInner = ({ user }: Props): React.ReactNode => {
  return (
    <Button variant='ghost' size='2' asChild>
      <Link to='/profile'>
        <Profile icon user={user} />
      </Link>
    </Button>
  );
}

const UserItem = (props: Props): React.ReactNode => {
  return (
    <ErrorBoundary>
      <UserItemInner {...props} />
    </ErrorBoundary>
  );
};

export default UserItem;
