/**
 * @generated SignedSource<<0869c5990b0a9bd566e379794790cb4d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type HomeQueriesSeekMutation$variables = Record<PropertyKey, never>;
export type HomeQueriesSeekMutation$data = {
  readonly challengeSeek: {
    readonly host: {
      readonly id: string;
    };
  };
};
export type HomeQueriesSeekMutation = {
  response: HomeQueriesSeekMutation$data;
  variables: HomeQueriesSeekMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Challenge",
    "kind": "LinkedField",
    "name": "challengeSeek",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "host",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeQueriesSeekMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeQueriesSeekMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "9641e6337cd86d5b9febbaff63d4d95b",
    "id": null,
    "metadata": {},
    "name": "HomeQueriesSeekMutation",
    "operationKind": "mutation",
    "text": "mutation HomeQueriesSeekMutation {\n  challengeSeek {\n    host {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "83f3c2bac2e65fbcda42325144284ad0";

export default node;
