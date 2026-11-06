/**
 * @generated SignedSource<<9b10c80f170535eb2f82adbf617c2d1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AttackQuery = {
  attack: ReadonlyArray<VecQuery>;
  gameId: string;
};
export type VecQuery = {
  i: number;
  j: number;
};
export type GameEffectsQuery$variables = {
  q: AttackQuery;
};
export type GameEffectsQuery$data = {
  readonly effects: ReadonlyArray<{
    readonly point: {
      readonly i: number;
      readonly j: number;
    };
  }>;
};
export type GameEffectsQuery = {
  response: GameEffectsQuery$data;
  variables: GameEffectsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "q"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "q",
        "variableName": "q"
      }
    ],
    "concreteType": "Effect",
    "kind": "LinkedField",
    "name": "effects",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Vec",
        "kind": "LinkedField",
        "name": "point",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "i",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "j",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GameEffectsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GameEffectsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7224d4658a522a1965e26de612872fa4",
    "id": null,
    "metadata": {},
    "name": "GameEffectsQuery",
    "operationKind": "query",
    "text": "query GameEffectsQuery(\n  $q: AttackQuery!\n) {\n  effects(q: $q) {\n    point {\n      i\n      j\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8b6f7f20c83547df06dea23def854aad";

export default node;
