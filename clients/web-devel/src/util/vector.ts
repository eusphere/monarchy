import { Vec } from '~/util/types';

export const compare = (a: Vec, b: Vec) =>
  a.i === b.i && a.j === b.j;

export const add = (a: Vec, b: Vec) =>
  ({i: a.i + b.i, j: a.j + b.j});

export const magnitude = (v: Vec) =>
  Math.sqrt(v.i * v.i + v.j * v.j)

export const negate = (v: Vec) =>
  ({i: -v.i, j: -v.j});

export const distance = (a: Vec, b: Vec) =>
  magnitude(add(a, negate(b)));

export const meanSquareDistance = (v: Vec, vecs: Vec[]) =>
  vecs.map(_ => distance(v, _)).reduce((a, b) => a + b, 0);
