import * as React from 'react';
import * as Types from '~/types';
import { Flex, Text, Box } from '@radix-ui/themes';
import styles from './index.module.css';

const Swatch = (props: { color: string }): React.ReactNode => (
  <Box className={styles.swatch} style={{ backgroundColor: props.color }} />
);

type Props = {
  user: Types.User;
  icon?: boolean;
}

const Profile = (props: Props): React.ReactNode => {
  const { user, icon } = props;
  const color = icon && user.profile?.color;
  return (
    <Flex gap='2' align='center'>
      {color && <Swatch color={color} />}
      <Text>{user.username}</Text>
    </Flex>
  );
};

export default Profile;
