import { graphql } from 'relay-runtime';

export const PieceFragment = graphql`
  fragment PieceFragment on Piece {
    id
    order
    name
    playerId
    currentWait
    currentHealth
    currentBlocking
    currentDirection {
      i
      j
    }
    currentFocus
    currentEffects
  }
`;
