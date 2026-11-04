import * as React from 'react';
import type { PieceFragment$key } from '~/autogen/relay/PieceFragment.graphql';

let hoveredPiece: PieceFragment$key | null = null;
let hoveredPieceId: string | null = null;
let pendingFrame: number | null = null;
let enterTimer: ReturnType<typeof setTimeout> | null = null;
let clearTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<() => void>();

export const setHoveredPiece = (piece: PieceFragment$key | null, pieceId: string | null = null): void => {
  if (clearTimer) clearTimeout(clearTimer);
  if (hoveredPieceId === pieceId) return;
  if (enterTimer) clearTimeout(enterTimer);
  if (pendingFrame !== null) cancelAnimationFrame(pendingFrame);
  enterTimer = setTimeout(() => {
    enterTimer = null;
    pendingFrame = requestAnimationFrame(() => {
      pendingFrame = null;
      hoveredPiece = piece;
      hoveredPieceId = pieceId;
      listeners.forEach((listener) => listener());
    });
  }, 40);
};

export const clearHoveredPiece = (): void => {
  if (enterTimer) {
    clearTimeout(enterTimer);
    enterTimer = null;
  }
  if (pendingFrame !== null) {
    cancelAnimationFrame(pendingFrame);
    pendingFrame = null;
  }
  if (clearTimer) clearTimeout(clearTimer);
  clearTimer = setTimeout(() => setHoveredPiece(null), 80);
};

export const useHoveredPiece = (): PieceFragment$key | null => React.useSyncExternalStore(
  (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  () => hoveredPiece,
  () => null,
);
