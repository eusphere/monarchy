/** @generated */
/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest } from 'relay-runtime';
export type MoveQuery = { gameId: string; point: { i: number; j: number } };
export type GameMoveMutation$variables = { q: MoveQuery };
export type GameMoveMutation$data = { readonly move: { readonly selection: { readonly i: number; readonly j: number } | null } };
export type GameMoveMutation = { response: GameMoveMutation$data; variables: GameMoveMutation$variables };
const node: ConcreteRequest = (function() {
  const args = [{ kind: 'Variable', name: 'q', variableName: 'q' }];
  const selection = [{ alias: null, args: null, kind: 'LinkedField', name: 'selection', plural: false, selections: [
    { alias: null, args: null, kind: 'ScalarField', name: 'i', storageKey: null },
    { alias: null, args: null, kind: 'ScalarField', name: 'j', storageKey: null },
  ], storageKey: null }];
  const argumentDefinitions = [{ defaultValue: null, kind: 'LocalArgument', name: 'q' }];
  const move = { alias: null, args, concreteType: 'Selection', kind: 'LinkedField', name: 'move', plural: false, selections: selection, storageKey: null };
  return { fragment: { argumentDefinitions, kind: 'Fragment', metadata: null, name: 'GameMoveMutation', selections: [move], type: 'Mutation', abstractKey: null }, kind: 'Request', operation: { argumentDefinitions, kind: 'Operation', name: 'GameMoveMutation', selections: [move] }, params: { cacheID: 'game-move-mutation', id: null, metadata: {}, name: 'GameMoveMutation', operationKind: 'mutation', text: 'mutation GameMoveMutation($q: MoveQuery!) {\n  move(q: $q) {\n    selection {\n      i\n      j\n    }\n  }\n}\n' } };
})();
export default node;
