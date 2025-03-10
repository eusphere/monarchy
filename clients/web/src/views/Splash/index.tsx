import * as React from 'react';
import { fetchQuery, useRelayEnvironment } from 'react-relay';
import Login from './Login';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';

type Props = {};

const Splash = (_: Props): React.ReactNode => {
  const [loggedIn, setLoggedIn] = React.useState<boolean | null>(null);
  const environment = useRelayEnvironment();

  React.useEffect(() => {
    fetchQuery(environment, SelfQuery, {})
      .toPromise()
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  }, [environment]);

  if (loggedIn === null) return null; // Loading state
  if (loggedIn) return null; // Logged in user
  return <Login />; // Not logged in
};

export default Splash;
