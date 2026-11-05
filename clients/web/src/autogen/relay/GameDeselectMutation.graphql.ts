/**
 * @generated SignedSource<<02244f3f9d600b979ad7f8b5076521a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type GameQuery = {
  gameId: string;
};
export type GameDeselectMutation$variables = {
  q: GameQuery;
};
export type GameDeselectMutation$data = {
  readonly deselect: {
    readonly selection: {
      readonly i: number;
      readonly j: number;
    } | null | undefined;
  };
};
export type GameDeselectMutation = {
  response: GameDeselectMutation$data;
  variables: GameDeselectMutation$variables;
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
    "name": "deselect",
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
    "name": "GameDeselectMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GameDeselectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c5898f5ed699725077624c8651aa6496",
    "id": null,
    "metadata": {},
    "name": "GameDeselectMutation",
    "operationKind": "mutation",
    "text": "mutation GameDeselectMutation(\n  $q: GameQuery!\n) {\n  deselect(q: $q) {\n    selection {\n      i\n      j\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c0c9c1dff7a08914518da7f7a1fd47e7";

export default node;
