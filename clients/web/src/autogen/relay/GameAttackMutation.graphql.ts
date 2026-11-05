/**
 * @generated SignedSource<<aae2c145cb89852f7fdef29942ebfaa6>>
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
export type GameAttackMutation$variables = {
  q: AttackQuery;
};
export type GameAttackMutation$data = {
  readonly attack: {
    readonly selection: {
      readonly i: number;
      readonly j: number;
    } | null | undefined;
  };
};
export type GameAttackMutation = {
  response: GameAttackMutation$data;
  variables: GameAttackMutation$variables;
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
    "concreteType": "Selection",
    "kind": "LinkedField",
    "name": "attack",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Vec",
        "kind": "LinkedField",
        "name": "selection",
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
    "name": "GameAttackMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GameAttackMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9d517e70a348d6bf5fa649dc14b1ab5d",
    "id": null,
    "metadata": {},
    "name": "GameAttackMutation",
    "operationKind": "mutation",
    "text": "mutation GameAttackMutation(\n  $q: AttackQuery!\n) {\n  attack(q: $q) {\n    selection {\n      i\n      j\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8c9ddc0db54672a3be9226b885fe6fbe";

export default node;
