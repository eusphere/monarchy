import * as React from 'react';
import ErrorBoundary from '~/layout/ErrorBoundary';
import Profile from '../Profile';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';
import { useLazyLoadQuery, useFragment } from 'react-relay';
import { Link } from 'react-router-dom';
import { DropdownMenu } from '@radix-ui/themes';
import Dropdown from '~/components/Dropdown';

const UserItemInner = (): React.ReactNode => {
  const data = useLazyLoadQuery<SelfQueryType>(SelfQuery, {});
  const user = useFragment<UserFragment$key>(UserFragment, data.self);
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

const UserItem = (): React.ReactNode => {
  return (
    <ErrorBoundary>
      <UserItemInner />
    </ErrorBoundary>
  );
};

export default UserItem;
