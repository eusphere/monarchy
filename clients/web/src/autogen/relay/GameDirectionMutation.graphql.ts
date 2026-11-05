/**
 * @generated SignedSource<<a35983790f2c2032b8499f9075a0e377>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DirectionQuery = {
  direction: VecQuery;
  gameId: string;
};
export type VecQuery = {
  i: number;
  j: number;
};
export type GameDirectionMutation$variables = {
  q: DirectionQuery;
};
export type GameDirectionMutation$data = {
  readonly direct: {
    readonly selection: {
      readonly i: number;
      readonly j: number;
    } | null | undefined;
  };
};
export type GameDirectionMutation = {
  response: GameDirectionMutation$data;
  variables: GameDirectionMutation$variables;
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
    "name": "direct",
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
    "name": "GameDirectionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GameDirectionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4cd33c3430b39e2fc611412566ff7fdf",
    "id": null,
    "metadata": {},
    "name": "GameDirectionMutation",
    "operationKind": "mutation",
    "text": "mutation GameDirectionMutation(\n  $q: DirectionQuery!\n) {\n  direct(q: $q) {\n    selection {\n      i\n      j\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "39526c7e2d6ba197ef2ba74ac8e25cb0";

export default node;
