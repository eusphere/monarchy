import * as React from 'react';
import Game from '~/views/Game';
import Games from '~/views/Games';
import Navigation from '~/layout/Navigation';
import Splash from '~/views/Splash';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import { fetchQuery, useRelayEnvironment } from 'react-relay';
import { Routes, Route, Navigate } from 'react-router-dom';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';

const LoggedOut = (): React.ReactNode => (
  <>
    <Navigation />
    <Splash />
  </>
);

const GameView = (): React.ReactNode => (
  <>
    <Navigation useSpace={false} />
    <Game />
  </>
);

const HomeView = (): React.ReactNode => (
  <>
    <Navigation />
    <Games />
  </>
);

const App = (): React.ReactNode => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const environment = useRelayEnvironment();

  React.useEffect(() => {
    fetchQuery<SelfQueryType>(environment, SelfQuery, {})
      .toPromise()
      .then((data) => setLoggedIn(data?.self !== null))
      .catch(() => setLoggedIn(false));
  }, [environment]);

  if (!loggedIn) return <LoggedOut />;

  return (
    <>
      <Routes>
        <Route path="/game/:gameId" element={<GameView />} />
        <Route path="/" element={<HomeView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
