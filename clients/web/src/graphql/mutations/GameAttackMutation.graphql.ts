import { graphql } from 'relay-runtime';

export const GameAttackMutation = graphql`
  mutation GameAttackMutation($q: AttackQuery!) {
    attack(q: $q) {
      selection { i j }
    }
  }
`;
