import { graphql } from "relay-runtime";

export const PlayerFragment = graphql`
  fragment PlayerFragment on Player {
    id
    status
    rating
    ratingDelta
    user {
      ...UserFragment
    }
  }
`;
