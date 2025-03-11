import { graphql } from 'relay-runtime';

export const GamesQuery = graphql`
  query GamesQuery($q: GamesQuery!) {
    games(q: $q) {
      id
      status
      players {
        ...PlayerFragment
      }
    }
  }
`;
