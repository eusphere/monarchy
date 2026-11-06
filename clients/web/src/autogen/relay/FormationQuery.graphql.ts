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
  readonly formation: {
    readonly id: string;
    readonly tiles: ReadonlyArray<{
      readonly point: { readonly i: number; readonly j: number };
      readonly piece: {
        readonly id: string;
        readonly order: PieceOrder;
        readonly name: string;
        readonly stats: { readonly health: number; readonly wait: number; readonly power: number; readonly armor: number; readonly blocking: number };
      } | null;
    }>;
  };
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
    "concreteType": "Formation",
    "kind": "LinkedField",
    "name": "formation",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Tile",
        "kind": "LinkedField",
        "name": "tiles",
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
              { "alias": null, "args": null, "kind": "ScalarField", "name": "i", "storageKey": null },
              { "alias": null, "args": null, "kind": "ScalarField", "name": "j", "storageKey": null }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Piece",
            "kind": "LinkedField",
            "name": "piece",
            "plural": false,
            "selections": [
          { "alias": null, "args": null, "kind": "ScalarField", "name": "id", "storageKey": null },
          { "alias": null, "args": null, "kind": "ScalarField", "name": "order", "storageKey": null },
          { "alias": null, "args": null, "kind": "ScalarField", "name": "name", "storageKey": null },
          {
            "alias": null, "args": null, "concreteType": "PieceStats", "kind": "LinkedField", "name": "stats", "plural": false,
            "selections": [
              { "alias": null, "args": null, "kind": "ScalarField", "name": "health", "storageKey": null },
              { "alias": null, "args": null, "kind": "ScalarField", "name": "wait", "storageKey": null },
              { "alias": null, "args": null, "kind": "ScalarField", "name": "power", "storageKey": null },
              { "alias": null, "args": null, "kind": "ScalarField", "name": "armor", "storageKey": null },
              { "alias": null, "args": null, "kind": "ScalarField", "name": "blocking", "storageKey": null }
            ],
            "storageKey": null
          }
            ],
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
    "text": "query FormationQuery {\n  self {\n    profile {\n      color\n    }\n  }\n  formation {\n    id\n    tiles {\n      point {\n        i\n        j\n      }\n      piece {\n        id\n        order\n        name\n        stats {\n          health\n          wait\n          power\n          armor\n          blocking\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "648ec71eedb4c22a6d16d0bee1ddb1f9";

export default node;
