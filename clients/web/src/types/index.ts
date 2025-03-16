import { UserFragment$data } from '~/autogen/relay/UserFragment.graphql';
import { GameQuery$data } from '~/autogen/relay/GameQuery.graphql';

export type User = UserFragment$data;
export type GameState = NonNullable<NonNullable<GameQuery$data['game']>['state']>;
export type Tile = GameState['tiles'][number];
