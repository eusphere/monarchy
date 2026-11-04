export function formatGraphqlError(error: Error): string {
  const message = error.message.replace(/^GraphQL request failed:\s*/i, '');
  const rejection = message.match(/rejected:\s*([A-Za-z]+)/)?.[1];
  switch (rejection) {
    case 'ChangeOutOfTurn': return 'It is not your turn.';
    case 'IllegalMoveSelection': return 'That move is not legal.';
    case 'IllegalAttackSelection': return 'That attack is not legal.';
    case 'IllegalDirSelection': return 'That direction is not legal.';
    case 'PieceActionWithoutSelection': return 'Select a piece first.';
    default: return message || 'The action could not be completed.';
  }
}
