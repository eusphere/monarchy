export const Vector = `
  i
  j
`;

export const Piece = `
  id
  order
  name
  playerId
  currentWait
  currentHealth
  currentBlocking
  currentDirection {
    ${Vector}
  }
  currentFocus
  currentEffects
`;

export const User = `
  id
  username
  rating
  profile {
    avatar
    color
  }
`;

export const Player = `
  id
  status
  rating
  ratingDelta
  user {
    ${User}
  }
`;

export const Selection = `
  selection {
    ${Vector}
  }
  movements {
    ${Vector}
  }
  directions {
    ${Vector}
  }
  attacks {
    tiles {
      ${Vector}
    }
  }
  piece {
    ${Piece}
  }
  phases
`;
