/**
 * @generated SignedSource<<92c02761ccdf67c8f5c2324cfe144997>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type FormationQuery$variables = Record<PropertyKey, never>;
export type FormationQuery$data = {
  readonly formation: ReadonlyArray<{
    readonly piece: string;
    readonly point: {
      readonly i: number;
      readonly j: number;
    };
  }>;
};
export type FormationQuery = {
  response: FormationQuery$data;
  variables: FormationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "FormationEntry",
    "kind": "LinkedField",
    "name": "formation",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "piece",
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
    "name": "FormationQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FormationQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d6fb109e14d13b550a2420da97e425d8",
    "id": null,
    "metadata": {},
    "name": "FormationQuery",
    "operationKind": "query",
    "text": "query FormationQuery {\n  formation {\n    point {\n      i\n      j\n    }\n    piece\n  }\n}\n"
  }
};
})();

(node as any).hash = "648ec71eedb4c22a6d16d0bee1ddb1f9";

export default node;
