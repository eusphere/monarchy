import { graphql } from 'relay-runtime';

export const GameMoveMutation = graphql`
  mutation GameMoveMutation($q: MoveQuery!) {
    move(q: $q) {
      selection { i j }
    }
  }
`;
