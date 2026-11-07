import * as React from 'react';
import Game from '~/views/Game';
import Games from '~/views/Games';
import Splash from '~/views/Splash';
import Profile from '~/views/Profile';
import Formation from '~/views/Formation';
import Home from '~/views/Home';
import Navigation from '~/layout/Navigation';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import { useFragment, useLazyLoadQuery } from 'react-relay';
import { Routes, Route, Navigate } from 'react-router-dom';
import Page from '~/layout/Page';
import AuthenticatedLayout from '~/layout/Authenticated';
import ErrorBoundary from '~/layout/ErrorBoundary';
import { poll } from '~/network/auth';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';

const LoggedOut = (): React.ReactNode => (
  <>
    <Navigation />
    <Page><Splash /></Page>
  </>
);

const GameView = (): React.ReactNode => <Game />;

const HomeView = (): React.ReactNode => <Home />;

const MatchesView = (): React.ReactNode => (
  <Page><Games /></Page>
);

const ProfileView = (): React.ReactNode => (
  <Page><Profile /></Page>
);

const FormationView = (): React.ReactNode => (
  <Formation />
);

const AuthenticatedApp = (): React.ReactNode => {
  const data = useLazyLoadQuery<SelfQueryType>(SelfQuery, {});
  const user = useFragment<UserFragment$key>(UserFragment, data.self);

  if (!user) return <LoggedOut />;

  return (
    <AuthenticatedLayout user={user}>
      <Routes>
        <Route path="/game/:gameId" element={<GameView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/formation" element={<FormationView />} />
        <Route path="/matches" element={<MatchesView />} />
        <Route path="/" element={<HomeView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthenticatedLayout>
  );
};

const App = (): React.ReactNode => {
  if (!poll().loggedIn) return <LoggedOut />;

  return (
    <ErrorBoundary fallback={<LoggedOut />}>
      <AuthenticatedApp />
    </ErrorBoundary>
  );
};

export default App;
