/** @generated */
/* eslint-disable */
// @ts-nocheck
import { ConcreteRequest } from 'relay-runtime';
export type AttackQuery = { gameId: string; attack: ReadonlyArray<{ i: number; j: number }> };
export type GameAttackMutation$variables = { q: AttackQuery };
export type GameAttackMutation$data = { readonly attack: { readonly selection: { readonly i: number; readonly j: number } | null } };
export type GameAttackMutation = { response: GameAttackMutation$data; variables: GameAttackMutation$variables };
const node: ConcreteRequest = (function() {
  const args = [{ kind: 'Variable', name: 'q', variableName: 'q' }];
  const selection = [{ alias: null, args: null, kind: 'LinkedField', name: 'selection', plural: false, selections: [
    { alias: null, args: null, kind: 'ScalarField', name: 'i', storageKey: null },
    { alias: null, args: null, kind: 'ScalarField', name: 'j', storageKey: null },
  ], storageKey: null }];
  const argumentDefinitions = [{ defaultValue: null, kind: 'LocalArgument', name: 'q' }];
  const attack = { alias: null, args, concreteType: 'Selection', kind: 'LinkedField', name: 'attack', plural: false, selections: selection, storageKey: null };
  return { fragment: { argumentDefinitions, kind: 'Fragment', metadata: null, name: 'GameAttackMutation', selections: [attack], type: 'Mutation', abstractKey: null }, kind: 'Request', operation: { argumentDefinitions, kind: 'Operation', name: 'GameAttackMutation', selections: [attack] }, params: { cacheID: 'game-attack-mutation', id: null, metadata: {}, name: 'GameAttackMutation', operationKind: 'mutation', text: 'mutation GameAttackMutation($q: AttackQuery!) {\n  attack(q: $q) {\n    selection {\n      i\n      j\n    }\n  }\n}\n' } };
})();
export default node;
