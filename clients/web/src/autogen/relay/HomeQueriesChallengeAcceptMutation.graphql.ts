/**
 * @generated SignedSource<<047f451ff075a0ff2df46d32db8e2d95>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ChallengeAcceptQuery = {
  opponentId: string;
};
export type HomeQueriesChallengeAcceptMutation$variables = {
  q: ChallengeAcceptQuery;
};
export type HomeQueriesChallengeAcceptMutation$data = {
  readonly challengeAccept: {
    readonly id: string;
  };
};
export type HomeQueriesChallengeAcceptMutation = {
  response: HomeQueriesChallengeAcceptMutation$data;
  variables: HomeQueriesChallengeAcceptMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "q",
        "variableName": "q"
      }
    ],
    "concreteType": "Game",
    "kind": "LinkedField",
    "name": "challengeAccept",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeQueriesChallengeAcceptMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HomeQueriesChallengeAcceptMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fecfd62421f8509552f179a221fb704e",
    "id": null,
    "metadata": {},
    "name": "HomeQueriesChallengeAcceptMutation",
    "operationKind": "mutation",
    "text": "mutation HomeQueriesChallengeAcceptMutation(\n  $q: ChallengeAcceptQuery!\n) {\n  challengeAccept(q: $q) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4a3c681d21afaa51755c80c3e483e004";

export default node;
