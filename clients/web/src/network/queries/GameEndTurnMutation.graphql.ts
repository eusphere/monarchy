import { graphql } from 'relay-runtime';

export const GameEndTurnMutation = graphql`
  mutation GameEndTurnMutation($q: EndTurnQuery!) {
    endTurn(q: $q) {
      selection { i j }
    }
  }
`;
