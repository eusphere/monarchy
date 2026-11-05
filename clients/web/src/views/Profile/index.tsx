import * as React from 'react';
import { useFragment, useLazyLoadQuery, useMutation } from 'react-relay';
import {
  Card,
  Flex,
  Heading,
  Section,
  Separator,
  Text,
  TextField,
  Button,
  Switch,
} from '@radix-ui/themes';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import styles from './index.module.css';
import ProfileUpdateMutation from '~/autogen/relay/ProfileUpdateMutation.graphql';
import type { ProfileUpdateMutation as ProfileUpdateMutationType } from '~/autogen/relay/ProfileUpdateMutation.graphql';
import { useDebug } from '~/hooks/useDebug';

const initials = (username: string): string =>
  username.trim().slice(0, 2).toUpperCase() || '??';

const Profile = (): React.ReactNode => {
  const selfRef = useLazyLoadQuery<SelfQueryType>(SelfQuery, {});
  const user = useFragment<UserFragment$key>(UserFragment, selfRef.self);
  const [commit, isCommitting] = useMutation<ProfileUpdateMutationType>(ProfileUpdateMutation);
  const [username, setUsername] = React.useState('');
  const [message, setMessage] = React.useState<string | null>(null);
  const [debugEnabled, setDebugEnabled] = useDebug();

  if (!user) return null;

  const saveUsername = (): void => {
    setMessage(null);
    commit({
      variables: { q: { username } },
      onCompleted: (_, errors) => {
        setMessage(errors?.[0]?.message || 'Username updated');
      },
      onError: (error) => setMessage(error.message),
    });
  };

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

          <Flex align='center' justify='between' gap='4'>
            <Flex direction='column' gap='1'>
              <Text weight='bold'>Debug mode</Text>
              <Text size='2' color='gray'>Show temporary development diagnostics in this browser.</Text>
            </Flex>
            <Switch
              checked={debugEnabled}
              onCheckedChange={setDebugEnabled}
              aria-label='Enable debug mode'
            />
          </Flex>

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
            <Flex gap='2' align='end' wrap='wrap'>
              <TextField.Root
                value={username}
                placeholder={user.username}
                onChange={(event) => setUsername(event.target.value)}
                aria-label='Username'
              />
              <Button onClick={saveUsername} disabled={isCommitting || username.trim().length === 0}>
                Save username
              </Button>
            </Flex>
            {message && <Text size='2' color={message === 'Username updated' ? 'green' : 'red'}>{message}</Text>}
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
