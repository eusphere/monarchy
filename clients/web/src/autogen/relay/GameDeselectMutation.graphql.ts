/** @generated */
/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest } from 'relay-runtime';
export type GameQuery = { gameId: string };
export type GameDeselectMutation$variables = { q: GameQuery };
export type GameDeselectMutation$data = { readonly deselect: { readonly selection: { readonly i: number; readonly j: number } | null } };
export type GameDeselectMutation = { response: GameDeselectMutation$data; variables: GameDeselectMutation$variables };
const node: ConcreteRequest = (function() {
  const args = [{ kind: 'Variable', name: 'q', variableName: 'q' }];
  const selection = [{ alias: null, args: null, kind: 'LinkedField', name: 'selection', plural: false, selections: [
    { alias: null, args: null, kind: 'ScalarField', name: 'i', storageKey: null },
    { alias: null, args: null, kind: 'ScalarField', name: 'j', storageKey: null },
  ], storageKey: null }];
  const argumentDefinitions = [{ defaultValue: null, kind: 'LocalArgument', name: 'q' }];
  const deselect = { alias: null, args, concreteType: 'Selection', kind: 'LinkedField', name: 'deselect', plural: false, selections: selection, storageKey: null };
  return { fragment: { argumentDefinitions, kind: 'Fragment', metadata: null, name: 'GameDeselectMutation', selections: [deselect], type: 'Mutation', abstractKey: null }, kind: 'Request', operation: { argumentDefinitions, kind: 'Operation', name: 'GameDeselectMutation', selections: [deselect] }, params: { cacheID: 'game-deselect-mutation', id: null, metadata: {}, name: 'GameDeselectMutation', operationKind: 'mutation', text: 'mutation GameDeselectMutation($q: GameQuery!) {\n  deselect(q: $q) {\n    selection {\n      i\n      j\n    }\n  }\n}\n' } };
})();
export default node;
