import { graphql } from 'relay-runtime';

export const GameQuery = graphql`
  query GameQuery($id: String!) {
    game(id: $id) {
      id
      status
      players {
        id
        status
        user {
          ...UserFragment
        }
      }
      state {
        currentPlayerId
        currentSelection {
          ...GameSelectionFragment
        }
        tiles {
          point {
            i @required(action: THROW)
            j @required(action: THROW)
          }
          piece {
            ...PieceFragment
          }
        }
      }
    }
  }
`;
