/**
 * @generated SignedSource<<63ae956851995fa24b9686d081f37646>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SelfQuery$variables = Record<PropertyKey, never>;
export type SelfQuery$data = {
  readonly self: {
    readonly id: string;
  };
};
export type SelfQuery = {
  response: SelfQuery$data;
  variables: SelfQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "self",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "SelfQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SelfQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "8b8565589cf27e7ab9f0a7c5bac75af5",
    "id": null,
    "metadata": {},
    "name": "SelfQuery",
    "operationKind": "query",
    "text": "query SelfQuery {\n  self {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8a2ba7bbdd75eaa2791e127946f3dc4c";

export default node;
