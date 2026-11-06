/**
 * @generated SignedSource<<d05bbca81495c015464ae0470ce7256e>>
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
  readonly formation: {
    readonly id: string;
    readonly tiles: ReadonlyArray<{
      readonly piece: {
        readonly id: string;
        readonly name: string;
        readonly order: PieceOrder;
        readonly stats: {
          readonly armor: number;
          readonly blocking: number;
          readonly health: number;
          readonly power: number;
          readonly wait: number;
        };
      } | null | undefined;
      readonly point: {
        readonly i: number;
        readonly j: number;
      };
    }>;
  };
};
export type FormationQuery = {
  response: FormationQuery$data;
  variables: FormationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Formation",
    "kind": "LinkedField",
    "name": "formation",
    "plural": false,
    "selections": [
      (v0/*: any*/),
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
            "concreteType": "Piece",
            "kind": "LinkedField",
            "name": "piece",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "order",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PieceStats",
                "kind": "LinkedField",
                "name": "stats",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "health",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "wait",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "power",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "armor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "blocking",
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
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FormationQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6b3f04f5759d3b4519e1ea47665bbaba",
    "id": null,
    "metadata": {},
    "name": "FormationQuery",
    "operationKind": "query",
    "text": "query FormationQuery {\n  formation {\n    id\n    tiles {\n      point {\n        i\n        j\n      }\n      piece {\n        id\n        order\n        name\n        stats {\n          health\n          wait\n          power\n          armor\n          blocking\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e51f167ff1b2a846801c97433b3bbb29";

export default node;
