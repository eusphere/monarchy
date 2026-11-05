import { graphql } from 'relay-runtime';

export const GameDeselectMutation = graphql`
  mutation GameDeselectMutation($q: GameQuery!) {
    deselect(q: $q) {
      selection { i j }
    }
  }
`;
