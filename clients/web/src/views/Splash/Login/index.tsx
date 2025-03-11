import * as React from 'react';
import { Flex, Heading, Text, Link } from '@radix-ui/themes';
import { host } from '~/network/host';
import DiscordButton from './DiscordButton';

function mkAuthorizeUrl(): string {
  const referrer = encodeURIComponent(window.location.href);
  return `${host}/oauth2/discord/authorize?referrer=${referrer}`;
}

const Login = (): React.ReactNode => {
  const authorizeUrl = mkAuthorizeUrl();
  
  return (
    <Flex p='4'>
      <Flex direction='column'>
        <Heading size='4' weight='bold'>
          Welcome to Monarchy
        </Heading>
        <Text mt='2'>
          Join players from around the world in proving your abilities as
          strategist and tactician. Garner loyalty from heroic spirits, harness
          their powers in the arena, and cement your legacy as a master.
        </Text>
        <Text mt='8'>
          <DiscordButton href={authorizeUrl}>
            Connect
          </DiscordButton>
        </Text>
        <Text size='2' mt='4'>
          Already have an account? The process is the same for new and
          returning players. Use <Link href='https://discord.com'>Discord</Link> to
          sign in and join the community.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Login;
