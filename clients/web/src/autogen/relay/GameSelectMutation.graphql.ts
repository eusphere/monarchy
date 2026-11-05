/**
 * @generated SignedSource<<ebe38059f5d850a43519d8f77f6387f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SelectQuery = {
  gameId: string;
  point: VecQuery;
};
export type VecQuery = {
  i: number;
  j: number;
};
export type GameSelectMutation$variables = {
  q: SelectQuery;
};
export type GameSelectMutation$data = {
  readonly select: {
    readonly selection: {
      readonly i: number;
      readonly j: number;
    } | null | undefined;
  };
};
export type GameSelectMutation = {
  response: GameSelectMutation$data;
  variables: GameSelectMutation$variables;
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
    "name": "select",
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
    "name": "GameSelectMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GameSelectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a3ef95e1613e9a5d471a1e2a12d71dd7",
    "id": null,
    "metadata": {},
    "name": "GameSelectMutation",
    "operationKind": "mutation",
    "text": "mutation GameSelectMutation(\n  $q: SelectQuery!\n) {\n  select(q: $q) {\n    selection {\n      i\n      j\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9568626eccb6b2d8dcb3be79162b2f7a";

export default node;
