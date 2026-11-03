import * as React from 'react';
import { useFragment, useLazyLoadQuery } from 'react-relay';
import {
  Card,
  Flex,
  Heading,
  Section,
  Separator,
  Text,
} from '@radix-ui/themes';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import styles from './index.module.css';

const initials = (username: string): string =>
  username.trim().slice(0, 2).toUpperCase() || '??';

const Profile = (): React.ReactNode => {
  const selfRef = useLazyLoadQuery<SelfQueryType>(SelfQuery, {});
  const user = useFragment<UserFragment$key>(UserFragment, selfRef.self);

  if (!user) return null;

  const profileColor = user.profile?.color || 'var(--accent-9)';

  return (
    <Section size='2' className={styles.root}>
      <Card size='4' className={styles.card}>
        <Flex direction='column' gap='6'>
          <Flex align='center' gap='4'>
            <Flex
              align='center'
              justify='center'
              className={styles.avatar}
              style={{ backgroundColor: profileColor }}
              aria-hidden='true'
            >
              {initials(user.username)}
            </Flex>
            <Flex direction='column' gap='1'>
              <Heading size='8' className={styles.username}>{user.username}</Heading>
            </Flex>
          </Flex>

          <Separator size='4' />

          <Flex gap='3' wrap='wrap'>
            <Card variant='surface' className={styles.stat}>
              <Text size='1' color='gray'>Rating</Text>
              <Heading size='6'>{user.rating}</Heading>
              <Text size='1' color='gray'>Current ladder rating</Text>
            </Card>
            <Card variant='surface' className={styles.stat}>
              <Text size='1' color='gray'>Member status</Text>
              <Heading size='6'>Active</Heading>
              <Text size='1' color='gray'>Ready for matchmaking</Text>
            </Card>
          </Flex>

          <Flex direction='column' gap='2'>
            <Text weight='bold'>Make it yours</Text>
            <Text size='2' color='gray'>
              Avatar, banner, and player tagline customization are coming next.
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Section>
  );
};

export default Profile;
