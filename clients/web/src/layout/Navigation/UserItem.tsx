import * as React from 'react';
import ErrorBoundary from '~/layout/ErrorBoundary';
import PlayerAvatar from '~/components/PlayerAvatar';
import { PlayerColorPreviewContext } from '~/layout/Authenticated/PlayerColorPreviewContext';
import { Flex, Text } from '@radix-ui/themes';
import type { UserFragment$data } from '~/autogen/relay/UserFragment.graphql';
import { Link } from 'react-router-dom';
import { DropdownMenu } from '@radix-ui/themes';
import Dropdown from '~/components/Dropdown';

type Props = {
  user: UserFragment$data;
};

const UserItemInner = ({ user }: Props): React.ReactNode => {
  const preview = React.useContext(PlayerColorPreviewContext);
  return (
    <Dropdown trigger={<Flex align='center' gap='2'>
      <Text>{user.username}</Text>
      <PlayerAvatar username={user.username} color={preview.color ?? user.profile?.color ?? '#5065b0'} />
    </Flex>}>
        <DropdownMenu.Item asChild>
          <Link to='/profile'>Profile</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <Link to='/matches'>Matches</Link>
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
