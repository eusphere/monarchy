type SelectionGuardInput = {
  piecePlayerId?: string;
  currentPlayerId?: string;
  selfPlayerId?: string;
  phase?: string;
  canSelect?: boolean;
  wait?: number;
};

export const canSelectPiece = ({
  piecePlayerId,
  currentPlayerId,
  selfPlayerId,
  phase,
  canSelect = phase === 'SELECT',
  wait,
}: SelectionGuardInput): boolean => Boolean(
  canSelect
  && piecePlayerId
  && piecePlayerId === currentPlayerId
  && wait === 0,
);
