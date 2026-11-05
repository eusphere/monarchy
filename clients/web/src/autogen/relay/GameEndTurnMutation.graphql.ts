/** @generated */
/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest } from 'relay-runtime';
export type EndTurnQuery = { gameId: string };
export type GameEndTurnMutation$variables = { q: EndTurnQuery };
export type GameEndTurnMutation$data = { readonly endTurn: { readonly selection: { readonly i: number; readonly j: number } | null } };
export type GameEndTurnMutation = { response: GameEndTurnMutation$data; variables: GameEndTurnMutation$variables };
const node: ConcreteRequest = (function() {
  const args = [{ kind: 'Variable', name: 'q', variableName: 'q' }];
  const selection = [{ alias: null, args: null, kind: 'LinkedField', name: 'selection', plural: false, selections: [
    { alias: null, args: null, kind: 'ScalarField', name: 'i', storageKey: null },
    { alias: null, args: null, kind: 'ScalarField', name: 'j', storageKey: null },
  ], storageKey: null }];
  const argumentDefinitions = [{ defaultValue: null, kind: 'LocalArgument', name: 'q' }];
  const endTurn = { alias: null, args, concreteType: 'Selection', kind: 'LinkedField', name: 'endTurn', plural: false, selections: selection, storageKey: null };
  return { fragment: { argumentDefinitions, kind: 'Fragment', metadata: null, name: 'GameEndTurnMutation', selections: [endTurn], type: 'Mutation', abstractKey: null }, kind: 'Request', operation: { argumentDefinitions, kind: 'Operation', name: 'GameEndTurnMutation', selections: [endTurn] }, params: { cacheID: 'game-end-turn-mutation', id: null, metadata: {}, name: 'GameEndTurnMutation', operationKind: 'mutation', text: 'mutation GameEndTurnMutation($q: EndTurnQuery!) {\n  endTurn(q: $q) {\n    selection {\n      i\n      j\n    }\n  }\n}\n' } };
})();
export default node;
