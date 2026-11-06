import { graphql } from 'relay-runtime';

export const GameDirectionMutation = graphql`
  mutation GameDirectionMutation($q: DirectionQuery!) {
    direct(q: $q) {
      selection { i j }
    }
  }
`;
