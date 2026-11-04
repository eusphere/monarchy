import * as React from 'react';
import type { PieceFragment$key } from '~/autogen/relay/PieceFragment.graphql';

let hoveredPiece: PieceFragment$key | null = null;
let hoveredPieceId: string | null = null;
const listeners = new Set<() => void>();

export const setHoveredPiece = (piece: PieceFragment$key | null, pieceId: string | null = null): void => {
  if (hoveredPieceId === pieceId) return;
  hoveredPiece = piece;
  hoveredPieceId = pieceId;
  listeners.forEach((listener) => listener());
};

export const useHoveredPiece = (): PieceFragment$key | null => React.useSyncExternalStore(
  (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  () => hoveredPiece,
  () => null,
);
