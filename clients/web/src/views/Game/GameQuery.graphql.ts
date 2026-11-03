import { graphql } from 'relay-runtime';

export const GameQuery = graphql`
  query GameQuery($id: String!) {
    game(id: $id) {
      id
      status
      players {
        id
        user {
          profile {
            color
          }
        }
        ...PlayerFragment
      }
      state {
        currentPlayerId
        currentSelection {
          ...GameSelectionFragment
        }
        tiles {
          point {
            i
            j
          }
          piece {
            ...PieceFragment
          }
        }
      }
    }
  }
`;
