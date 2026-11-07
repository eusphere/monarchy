import * as React from 'react';
import { Flex, Text } from '@radix-ui/themes';
import RatingDelta from '~/components/RatingDelta';
import Profile from '~/layout/Profile';
import type { UserFragment$data } from '~/autogen/relay/UserFragment.graphql';

type Props = {
  user: UserFragment$data;
  rating: number;
  ratingDelta?: number | null;
};

const UserRating = ({ user, rating, ratingDelta }: Props): React.ReactNode => (
  <Flex gap='2' align='center'>
    <Profile icon user={user} />
    <Text>{rating}</Text>
    {ratingDelta != null && <RatingDelta value={ratingDelta} />}
  </Flex>
);

export default UserRating;
