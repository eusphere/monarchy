/**
 * @generated SignedSource<<7833028f08ebf16f549f001c9367afe9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PlayerColorsQuery$variables = Record<PropertyKey, never>;
export type PlayerColorsQuery$data = {
  readonly playerColorFamilies: ReadonlyArray<{
    readonly color: string;
    readonly colors: ReadonlyArray<{
      readonly color: string;
      readonly name: string;
    }>;
    readonly name: string;
  }>;
};
export type PlayerColorsQuery = {
  response: PlayerColorsQuery$data;
  variables: PlayerColorsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "color",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PlayerColorFamily",
    "kind": "LinkedField",
    "name": "playerColorFamilies",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "PlayerColor",
        "kind": "LinkedField",
        "name": "colors",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PlayerColorsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PlayerColorsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "eff85393520440558301e10928698c26",
    "id": null,
    "metadata": {},
    "name": "PlayerColorsQuery",
    "operationKind": "query",
    "text": "query PlayerColorsQuery {\n  playerColorFamilies {\n    name\n    color\n    colors {\n      name\n      color\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "36b0b7bfd1e1c91a93dbde5d416a7350";

export default node;
