/**
 * @generated SignedSource<<01a29cc488b31cafebba3fed7070e948>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeQueriesQuery$variables = Record<PropertyKey, never>;
export type HomeQueriesQuery$data = {
  readonly lobby: {
    readonly challenges: ReadonlyArray<{
      readonly expireAt: string | null | undefined;
      readonly host: {
        readonly id: string;
        readonly rating: number;
        readonly username: string;
        readonly " $fragmentSpreads": FragmentRefs<"UserFragment">;
      };
    }>;
  };
  readonly self: {
    readonly id: string;
    readonly rating: number;
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"UserFragment">;
  };
};
export type HomeQueriesQuery = {
  response: HomeQueriesQuery$data;
  variables: HomeQueriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rating",
  "storageKey": null
},
v3 = [
  (v0/*: any*/),
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "UserFragment"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expireAt",
  "storageKey": null
},
v5 = [
  (v0/*: any*/),
  (v1/*: any*/),
  (v2/*: any*/),
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "self",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Lobby",
        "kind": "LinkedField",
        "name": "lobby",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "challenges",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "host",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeQueriesQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "self",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Lobby",
        "kind": "LinkedField",
        "name": "lobby",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "challenges",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "host",
                "plural": false,
                "selections": (v5/*: any*/),
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
    "cacheID": "bdd0f2e3b253e6d51057bb31951491d3",
    "id": null,
    "metadata": {},
    "name": "HomeQueriesQuery",
    "operationKind": "query",
    "text": "query HomeQueriesQuery {\n  self {\n    id\n    username\n    rating\n    ...UserFragment\n  }\n  lobby {\n    challenges {\n      expireAt\n      host {\n        id\n        username\n        rating\n        ...UserFragment\n      }\n    }\n  }\n}\n\nfragment UserFragment on User {\n  id\n  username\n  rating\n  profile {\n    avatar\n    color\n  }\n}\n"
  }
};
})();

(node as any).hash = "4a6273dbb492c264c284c907c2a08836";

export default node;
