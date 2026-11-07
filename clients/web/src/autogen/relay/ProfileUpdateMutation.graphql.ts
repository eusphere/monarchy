/**
 * @generated SignedSource<<f92035515e604e2490ef0ea63fad3c5d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateProfileQuery = {
  username: string;
};
export type ProfileUpdateMutation$variables = {
  q: UpdateProfileQuery;
};
export type ProfileUpdateMutation$data = {
  readonly profileUpdate: {
    readonly " $fragmentSpreads": FragmentRefs<"UserFragment">;
  };
};
export type ProfileUpdateMutation = {
  response: ProfileUpdateMutation$data;
  variables: ProfileUpdateMutation$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "profileUpdate",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "profileUpdate",
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
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "rating",
            "storageKey": null
          },
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "discordId",
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
    "cacheID": "eb900bf2cee56881e7b85cc01f8a90c9",
    "id": null,
    "metadata": {},
    "name": "ProfileUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileUpdateMutation(\n  $q: UpdateProfileQuery!\n) {\n  profileUpdate(q: $q) {\n    ...UserFragment\n  }\n}\n\nfragment UserFragment on User {\n  id\n  username\n  email\n  rating\n  profile {\n    avatar\n    color\n    discordId\n  }\n}\n"
  }
};
})();

(node as any).hash = "dd7cccbc87c397eba6cefd3a61a9e9d3";

export default node;
