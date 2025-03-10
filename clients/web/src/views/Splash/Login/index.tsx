import * as React from 'react';
import { Flex, Heading } from '@radix-ui/themes';
import { host } from '~/network/host';
import DiscordButton from './DiscordButton';

function mkAuthorizeUrl(): string {
  const referrer = encodeURIComponent(window.location.href);
  return `${host}/oauth2/discord/authorize?referrer=${referrer}`;
}

const Login = (): React.ReactNode => {
  const authorizeUrl = mkAuthorizeUrl();
  
  return (
    <Flex p="4" style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
      <Flex direction="column" gap="6" align="center" style={{ width: '100%' }}>
        <Heading size="6" weight="bold">
          Welcome to Monarchy
        </Heading>
        <Flex direction="column" gap="4" align="center">
          <DiscordButton href={authorizeUrl}>
            Log in
          </DiscordButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
