import { graphql } from 'relay-runtime';

export const GameEffectsQuery = graphql`
  query GameEffectsQuery($q: AttackQuery!) {
    effects(q: $q) {
      point {
        i
        j
      }
    }
  }
`;
