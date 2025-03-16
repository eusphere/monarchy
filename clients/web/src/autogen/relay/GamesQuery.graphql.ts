/**
 * @generated SignedSource<<a84fd86e1cf8c39c8efc93bc874b1f6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GamesQuery = {
  userId: string;
};
export type GamesQuery$variables = {
  q: GamesQuery;
};
export type GamesQuery$data = {
  readonly games: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"GameFragment">;
  }>;
};
export type GamesQuery = {
  response: GamesQuery$data;
  variables: GamesQuery$variables;
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
    "kind": "Variable",
    "name": "q",
    "variableName": "q"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rating",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GamesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Game",
        "kind": "LinkedField",
        "name": "games",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GameFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GamesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Game",
        "kind": "LinkedField",
        "name": "games",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "selfStatus",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Player",
            "kind": "LinkedField",
            "name": "players",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "ratingDelta",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "username",
                    "storageKey": null
                  },
                  (v4/*: any*/),
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
                        "name": "avatar",
                        "storageKey": null
                      },
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "81c16b9a88e4709591e626b80567ffdc",
    "id": null,
    "metadata": {},
    "name": "GamesQuery",
    "operationKind": "query",
    "text": "query GamesQuery(\n  $q: GamesQuery!\n) {\n  games(q: $q) {\n    ...GameFragment\n  }\n}\n\nfragment GameFragment on Game {\n  id\n  status\n  selfStatus\n  createdAt\n  players {\n    ...PlayerFragment\n  }\n}\n\nfragment PlayerFragment on Player {\n  id\n  status\n  rating\n  ratingDelta\n  user {\n    ...UserFragment\n  }\n}\n\nfragment UserFragment on User {\n  id\n  username\n  rating\n  profile {\n    avatar\n    color\n  }\n}\n"
  }
};
})();

(node as any).hash = "69e5b9180c8ea0154fc476ad8a5c7d95";

export default node;
