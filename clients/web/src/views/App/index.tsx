import * as React from 'react';
import Games from '~/views/Games';
import Navigation from '~/layout/Navigation';
import Splash from '~/views/Splash';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import { fetchQuery, useRelayEnvironment } from 'react-relay';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';

function App(): React.ReactNode {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const environment = useRelayEnvironment();
  
  React.useEffect(() => {
    fetchQuery<SelfQueryType>(environment, SelfQuery, {})
      .toPromise()
      .then((data) => setLoggedIn(data?.self !== null))
      .catch(() => setLoggedIn(false));
  }, [environment]);

  return (
    <>
      <Navigation />
      {!loggedIn && <Splash />}
      {loggedIn && <Games />}
    </>
  );
};

export default App;
