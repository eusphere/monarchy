import * as React from 'react';
import ErrorBoundary from '~/layout/ErrorBoundary';
import Profile from '../Profile';
import type { UserFragment$data } from '~/autogen/relay/UserFragment.graphql';
import { Link } from 'react-router-dom';
import { DropdownMenu } from '@radix-ui/themes';
import Dropdown from '~/components/Dropdown';

type Props = {
  user: UserFragment$data;
};

const UserItemInner = ({ user }: Props): React.ReactNode => {
  return (
    <Dropdown trigger={<Profile icon user={user} />}>
        <DropdownMenu.Item asChild>
          <Link to='/profile'>Profile</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <Link to='/formation'>Formation</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item disabled>Logout</DropdownMenu.Item>
    </Dropdown>
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
