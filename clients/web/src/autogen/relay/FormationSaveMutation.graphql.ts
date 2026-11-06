/**
 * @generated SignedSource<<27868d475b9f25746ba61c191dd97dbd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type FormationSaveQuery = {
  formation: ReadonlyArray<FormationEntryQuery>;
};
export type FormationEntryQuery = {
  piece: string;
  point: VecQuery;
};
export type VecQuery = {
  i: number;
  j: number;
};
export type FormationSaveMutation$variables = {
  q: FormationSaveQuery;
};
export type FormationSaveMutation$data = {
  readonly formationSave: boolean;
};
export type FormationSaveMutation = {
  response: FormationSaveMutation$data;
  variables: FormationSaveMutation$variables;
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
    "kind": "ScalarField",
    "name": "formationSave",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FormationSaveMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FormationSaveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "207ee5e999feaa8a90295351528f22a9",
    "id": null,
    "metadata": {},
    "name": "FormationSaveMutation",
    "operationKind": "mutation",
    "text": "mutation FormationSaveMutation(\n  $q: FormationSaveQuery!\n) {\n  formationSave(q: $q)\n}\n"
  }
};
})();

(node as any).hash = "ca4c5cb9aaa0ec2c6398de22a9c1b21d";

export default node;
