import { graphql } from 'relay-runtime';

export const GameSelectMutation = graphql`
  mutation GameSelectMutation($q: SelectQuery!) {
    select(q: $q) {
      selection { i j }
    }
  }
`;
