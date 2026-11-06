export type BoardPoint = { i: number, j: number };

export const pointKey = (point: BoardPoint): string => `${point.i}-${point.j}`;
