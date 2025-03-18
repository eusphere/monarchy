import { UserFragment$data } from '~/autogen/relay/UserFragment.graphql';
import { GameQuery$data } from '~/autogen/relay/GameQuery.graphql';

export type User = UserFragment$data;
export type Game = NonNullable<NonNullable<GameQuery$data['game']>>;
export type GameState = NonNullable<NonNullable<Game['state']>>;
export type Tile = GameState['tiles'][number];
