/**
 * @generated SignedSource<<e232896dedd14707eea120f7b5325ca1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type HomeQueriesChallengeCancelMutation$variables = Record<PropertyKey, never>;
export type HomeQueriesChallengeCancelMutation$data = {
  readonly challengeSeekCancel: boolean;
};
export type HomeQueriesChallengeCancelMutation = {
  response: HomeQueriesChallengeCancelMutation$data;
  variables: HomeQueriesChallengeCancelMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "challengeSeekCancel",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeQueriesChallengeCancelMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeQueriesChallengeCancelMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "372521b924a6235f4b5b8cabe464e322",
    "id": null,
    "metadata": {},
    "name": "HomeQueriesChallengeCancelMutation",
    "operationKind": "mutation",
    "text": "mutation HomeQueriesChallengeCancelMutation {\n  challengeSeekCancel\n}\n"
  }
};
})();

(node as any).hash = "5a2a51f5b18c442aace82ceec66e5920";

export default node;
