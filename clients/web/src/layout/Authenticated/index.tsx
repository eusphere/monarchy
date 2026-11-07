import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useFragment } from 'react-relay';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import type { SelfQuery$data } from '~/autogen/relay/SelfQuery.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import Navigation from '~/layout/Navigation';
import { AuthenticatedUserContext } from './context';

type Props = {
  self: SelfQuery$data;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

const AuthenticatedLayout = ({ self, children, fallback = null }: Props): React.ReactNode => {
  const user = useFragment<UserFragment$key>(UserFragment, self.self);
  const location = useLocation();
  const fullScreen = location.pathname.startsWith('/game/') || location.pathname === '/formation';
  const useSpace = !fullScreen;

  if (!user) return fallback;

  return (
    <>
      <Navigation user={user} useSpace={useSpace} />
      <AuthenticatedUserContext.Provider value={user}>
        {children}
      </AuthenticatedUserContext.Provider>
    </>
  );
};

export default AuthenticatedLayout;
