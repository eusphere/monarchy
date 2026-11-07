import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useFragment, useLazyLoadQuery } from 'react-relay';
import SelfQuery from '~/autogen/relay/SelfQuery.graphql';
import UserFragment from '~/autogen/relay/UserFragment.graphql';
import type { SelfQuery as SelfQueryType } from '~/autogen/relay/SelfQuery.graphql';
import type { UserFragment$key } from '~/autogen/relay/UserFragment.graphql';
import Navigation from '~/layout/Navigation';
import { AuthenticatedUserContext } from './context';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

const AuthenticatedLayout = ({ children, fallback = null }: Props): React.ReactNode => {
  const data = useLazyLoadQuery<SelfQueryType>(SelfQuery, {});
  const user = useFragment<UserFragment$key>(UserFragment, data.self);
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
