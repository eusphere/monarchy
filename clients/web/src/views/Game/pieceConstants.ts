import * as Constants from './constants';
import { Color } from 'three';

export const PIECE_OFFSET = [0, Constants.TILE_HEIGHT / 2, 0] as const;

export const activePieceColor = (color?: string): string => {
  const base = new Color(color ?? '#8f887d');
  const hsl = base.getHSL({ h: 0, s: 0, l: 0 });
  return `#${new Color()
    .setHSL(hsl.h, Math.min(1, hsl.s + 0.05), Math.min(1, hsl.l + 0.2))
    .getHexString()}`;
};
