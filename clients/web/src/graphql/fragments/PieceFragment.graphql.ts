import { graphql } from 'relay-runtime';

export const PieceFragment = graphql`
  fragment PieceFragment on Piece {
    id
    order
    name
    playerId
    stats {
      health
    }
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
