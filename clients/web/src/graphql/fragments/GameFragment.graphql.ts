import { graphql } from 'relay-runtime';

export const GameFragment = graphql`
  fragment GameFragment on Game {
    id
    status
    selfStatus
    createdAt
    players {
      ...PlayerFragment
    }
  }
`;
