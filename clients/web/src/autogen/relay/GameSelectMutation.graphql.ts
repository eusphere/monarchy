/** @generated */
/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest } from 'relay-runtime';
export type SelectQuery = { gameId: string; point: { i: number; j: number } };
export type GameSelectMutation$variables = { q: SelectQuery };
export type GameSelectMutation$data = { readonly select: { readonly selection: { readonly i: number; readonly j: number } | null } };
export type GameSelectMutation = { response: GameSelectMutation$data; variables: GameSelectMutation$variables };
const node: ConcreteRequest = (function() {
  const args = [{ kind: 'Variable', name: 'q', variableName: 'q' }];
  const selection = [{ alias: null, args: null, kind: 'LinkedField', name: 'selection', plural: false, selections: [
    { alias: null, args: null, kind: 'ScalarField', name: 'i', storageKey: null },
    { alias: null, args: null, kind: 'ScalarField', name: 'j', storageKey: null },
  ], storageKey: null }];
  const argumentDefinitions = [{ defaultValue: null, kind: 'LocalArgument', name: 'q' }];
  const select = { alias: null, args, concreteType: 'Selection', kind: 'LinkedField', name: 'select', plural: false, selections: selection, storageKey: null };
  return { fragment: { argumentDefinitions, kind: 'Fragment', metadata: null, name: 'GameSelectMutation', selections: [select], type: 'Mutation', abstractKey: null }, kind: 'Request', operation: { argumentDefinitions, kind: 'Operation', name: 'GameSelectMutation', selections: [select] }, params: { cacheID: 'game-select-mutation', id: null, metadata: {}, name: 'GameSelectMutation', operationKind: 'mutation', text: 'mutation GameSelectMutation($q: SelectQuery!) {\n  select(q: $q) {\n    selection {\n      i\n      j\n    }\n  }\n}\n' } };
})();
export default node;
