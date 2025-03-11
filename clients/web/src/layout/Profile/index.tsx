import * as React from 'react';
import * as Types from '~/types';
import { Flex, Text } from '@radix-ui/themes';
import { PersonIcon } from '@radix-ui/react-icons';

type Props = {
  user: Types.User;
  icon?: boolean;
}

const Profile = (props: Props): React.ReactNode => {
  return (
    <Flex gap='1'>
      {props.icon && <PersonIcon width='16' height='16' />}
      <Text>{props.user.username}</Text>
    </Flex>
  );
};

export default Profile;
