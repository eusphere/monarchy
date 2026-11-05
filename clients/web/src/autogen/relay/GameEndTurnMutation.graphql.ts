/**
 * @generated SignedSource<<29dd072fb338f5082821b259c3dd14c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type EndTurnQuery = {
  gameId: string;
};
export type GameEndTurnMutation$variables = {
  q: EndTurnQuery;
};
export type GameEndTurnMutation$data = {
  readonly endTurn: {
    readonly selection: {
      readonly i: number;
      readonly j: number;
    } | null | undefined;
  };
};
export type GameEndTurnMutation = {
  response: GameEndTurnMutation$data;
  variables: GameEndTurnMutation$variables;
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
    "name": "endTurn",
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
    "name": "GameEndTurnMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GameEndTurnMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bcf1ece9b28d0593bc88c0bafc325811",
    "id": null,
    "metadata": {},
    "name": "GameEndTurnMutation",
    "operationKind": "mutation",
    "text": "mutation GameEndTurnMutation(\n  $q: EndTurnQuery!\n) {\n  endTurn(q: $q) {\n    selection {\n      i\n      j\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "acebf9e2ef6cf0df1589766f4e199ae8";

export default node;
