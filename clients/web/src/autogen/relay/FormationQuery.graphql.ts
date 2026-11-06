/**
 * @generated SignedSource<<7ff9b9c56af8f6410047b2d738e509f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PieceOrder = "ASSASSIN" | "CLERIC" | "FROST_GOLEM" | "FURGON" | "KNIGHT" | "MUD_GOLEM" | "PYROMANCER" | "SCOUT" | "SHRUB" | "WITCH" | "%future added value";
export type FormationQuery$variables = Record<PropertyKey, never>;
export type FormationQuery$data = {
  readonly self: {
    readonly profile: {
      readonly color: string;
    } | null | undefined;
  };
  readonly formation: ReadonlyArray<{
    readonly piece: PieceOrder;
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "self",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Profile",
        "kind": "LinkedField",
        "name": "profile",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "color",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
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
    "text": "query FormationQuery {\n  self {\n    profile {\n      color\n    }\n  }\n  formation {\n    point {\n      i\n      j\n    }\n    piece\n  }\n}\n"
  }
};
})();

(node as any).hash = "648ec71eedb4c22a6d16d0bee1ddb1f9";

export default node;
