/**
 * @generated SignedSource<<74df1d8ebe7a2ec69747dce8ef7ff1f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MoveQuery = {
  gameId: string;
  point: VecQuery;
};
export type VecQuery = {
  i: number;
  j: number;
};
export type GameMoveMutation$variables = {
  q: MoveQuery;
};
export type GameMoveMutation$data = {
  readonly move: {
    readonly selection: {
      readonly i: number;
      readonly j: number;
    } | null | undefined;
  };
};
export type GameMoveMutation = {
  response: GameMoveMutation$data;
  variables: GameMoveMutation$variables;
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
    "name": "move",
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
    "name": "GameMoveMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GameMoveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "06806973d7d3fa603a19a3582af268c1",
    "id": null,
    "metadata": {},
    "name": "GameMoveMutation",
    "operationKind": "mutation",
    "text": "mutation GameMoveMutation(\n  $q: MoveQuery!\n) {\n  move(q: $q) {\n    selection {\n      i\n      j\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9e949edfa3cf59d1756ccee275361af5";

export default node;
