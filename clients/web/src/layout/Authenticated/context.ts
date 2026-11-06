import * as React from 'react';
import type { UserFragment$data } from '~/autogen/relay/UserFragment.graphql';

export const AuthenticatedUserContext = React.createContext<UserFragment$data | null>(null);
