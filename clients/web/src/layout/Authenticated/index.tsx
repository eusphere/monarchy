import * as React from 'react';
import { useLocation } from 'react-router-dom';
import type { UserFragment$data } from '~/autogen/relay/UserFragment.graphql';
import Navigation from '~/layout/Navigation';
import { AuthenticatedUserContext } from './context';

type Props = {
  user: UserFragment$data;
  children: React.ReactNode;
};

const AuthenticatedLayout = ({ user, children }: Props): React.ReactNode => {
  const location = useLocation();
  const fullScreen = location.pathname.startsWith('/game/') || location.pathname === '/formation';
  const useSpace = !fullScreen;

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
