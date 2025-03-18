import { graphql } from 'relay-runtime';

export const GameSelectionFragment = graphql`
  fragment GameSelectionFragment on Selection {
    selection {
      i
      j
    }
    movements {
      i
      j
    }
    directions {
      i
      j
    }
    attacks {
      tiles {
        i
        j
      }
    }
    piece {
      ...PieceFragment
    }
    phases
  }
`;
