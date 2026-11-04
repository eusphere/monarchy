type SelectionGuardInput = {
  piecePlayerId?: string;
  currentPlayerId?: string;
  selfPlayerId?: string;
  phase?: string;
  wait?: number;
};

export const canSelectPiece = ({
  piecePlayerId,
  currentPlayerId,
  selfPlayerId,
  phase,
  wait,
}: SelectionGuardInput): boolean => Boolean(
  phase === 'SELECT'
  && piecePlayerId
  && piecePlayerId === currentPlayerId
  && piecePlayerId === selfPlayerId
  && wait === 0,
);
