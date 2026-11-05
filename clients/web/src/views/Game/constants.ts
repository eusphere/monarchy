export const TILE_SIZE = 1.0;
export const TILE_HEIGHT = 0.2;
export const TILE_ROTATION = [-Math.PI / 2, 0, 0] as const;
export const TILE_HIGHLIGHT_DIAMETER_RATIO = 0.6;
export const TILE_HIGHLIGHT_HEIGHT_RATIO = 0.25;
export const TILE_HIGHLIGHT_HOVER_HEIGHT_RATIO = 2;
export const TILE_HIGHLIGHT_ACTION_OPACITY = 0.7;

export const TILE_COLORS = {
  ODD: '#D0D0D0',
  EVEN: '#DDDDDD',
  HOVER: '#EEEEEE',
  MOVE: '#3266a8',
  ATTACK: '#f0a25b',
  EFFECT: '#9b8ce8',
} as const;
