import * as React from 'react';
import Game from '~/views/Game';
import Games from '~/views/Games';
import Splash from '~/views/Splash';
import Profile from '~/views/Profile';
import Formation from '~/views/Formation';
import Home from '~/views/Home';
import Navigation from '~/layout/Navigation';
import { Routes, Route, Navigate } from 'react-router-dom';
import Page from '~/layout/Page';
import AuthenticatedLayout from '~/layout/Authenticated';
import ErrorBoundary from '~/layout/ErrorBoundary';
import { hasLoginHint } from '~/network/auth';

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

const App = (): React.ReactNode => {
  if (!hasLoginHint()) return <LoggedOut />;

  return (
    <ErrorBoundary fallback={<LoggedOut />}>
      <AuthenticatedLayout fallback={<LoggedOut />}>
        <Routes>
          <Route path="/game/:gameId" element={<GameView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/formation" element={<FormationView />} />
          <Route path="/matches" element={<MatchesView />} />
          <Route path="/" element={<HomeView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthenticatedLayout>
    </ErrorBoundary>
  );
};

export default App;
