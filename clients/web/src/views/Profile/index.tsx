import * as React from 'react';
import { useMutation } from 'react-relay';
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
import styles from './index.module.css';
import PlayerColorSection from './PlayerColorSection';
import PiecePreview from './PiecePreview';
import PlayerAvatar from '~/components/PlayerAvatar';
import { PlayerColorPreviewContext } from '~/layout/Authenticated/PlayerColorPreviewContext';
import ProfileUpdateMutation from '~/autogen/relay/ProfileUpdateMutation.graphql';
import type { ProfileUpdateMutation as ProfileUpdateMutationType } from '~/autogen/relay/ProfileUpdateMutation.graphql';
import { useDebug } from '~/hooks/useDebug';
import useAuthenticatedUser from '~/layout/Authenticated/useAuthenticatedUser';

const Profile = (): React.ReactNode => {
  const user = useAuthenticatedUser();
  const [commit, isCommitting] = useMutation<ProfileUpdateMutationType>(ProfileUpdateMutation);
  const preview = React.useContext(PlayerColorPreviewContext);
  const [username, setUsername] = React.useState('');
  const [message, setMessage] = React.useState<string | null>(null);
  const [debugEnabled, setDebugEnabled] = useDebug();

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

  const profileColor = preview.color ?? user.profile?.color ?? '#5065b0';

  return (
    <Section size='2' className={styles.root}>
      <Card size='4' className={styles.card}>
        <Flex direction='column' gap='6'>
          <Flex align='start' justify='between' className={styles.title}>
            <Flex align='center' className={styles.identity}>
              <PlayerAvatar username={user.username} color={profileColor} size='large' />
              <Flex direction='column' gap='1'>
                <Heading size='8' className={styles.username}>{user.username}</Heading>
                <Text size='3' color='gray'>{user.rating}</Text>
              </Flex>
            </Flex>
            <PiecePreview color={profileColor} />
          </Flex>

          <Separator size='4' />

          <Flex direction='column' gap='4'>
            <Flex direction='column' gap='2'>
              <Text weight='bold'>Username</Text>
              <Flex gap='2' align='end' wrap='wrap'>
                <TextField.Root
                  value={username}
                  placeholder={user.username}
                  onChange={(event) => setUsername(event.target.value)}
                  aria-label='Username'
                />
                <Button onClick={saveUsername} disabled={isCommitting || username.trim().length === 0}>
                  Save
                </Button>
              </Flex>
              {message && <Text size='2' color={message === 'Username updated' ? 'green' : 'red'}>{message}</Text>}
            </Flex>

            <Separator size='4' />
            <PlayerColorSection savedColor={user.profile?.color ?? '#5065b0'} />
            <Separator size='4' />

            <Flex direction='column' gap='1'>
              <Text weight='bold'>Email</Text>
              <Text>{user.email}</Text>
            </Flex>

            <Flex direction='column' gap='1'>
              <Text weight='bold'>Discord handle</Text>
              <Text>{user.profile?.discordId ?? 'Not connected'}</Text>
            </Flex>
          </Flex>

          <Flex align='center' justify='between' gap='4'>
            <Flex direction='column' gap='1'>
              <Text weight='bold'>Debug mode</Text>
            </Flex>
            <Switch
              checked={debugEnabled}
              onCheckedChange={setDebugEnabled}
              aria-label='Enable debug mode'
            />
          </Flex>

        </Flex>
      </Card>
    </Section>
  );
};

export default Profile;
