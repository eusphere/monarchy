import * as React from 'react';
import type { UserFragment$data } from '~/autogen/relay/UserFragment.graphql';
import { AuthenticatedUserContext } from './context';

const useAuthenticatedUser = (): UserFragment$data => {
  const user = React.useContext(AuthenticatedUserContext);
  if (!user) throw new Error('useAuthenticatedUser must be used inside AuthenticatedLayout');
  return user;
};

export default useAuthenticatedUser;
