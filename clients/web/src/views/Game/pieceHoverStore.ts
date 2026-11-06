import type { PieceFragment$key } from '~/autogen/relay/PieceFragment.graphql';
import { createHoverStore } from '~/util/hoverStore';

const store = createHoverStore<PieceFragment$key>();

export const setHoveredPiece = (piece: PieceFragment$key | null, pieceId: string | null = null): void => {
  store.set(piece, pieceId);
};

export const clearHoveredPiece = (): void => store.clear();

export const useHoveredPiece = (): PieceFragment$key | null => store.useValue();
