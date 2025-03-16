/**
 * @generated SignedSource<<7e23d983ef676641700a2263e05bff8a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PieceFragment$data = {
  readonly currentBlocking: number;
  readonly currentDirection: {
    readonly i: number;
    readonly j: number;
  };
  readonly currentEffects: ReadonlyArray<string>;
  readonly currentFocus: boolean;
  readonly currentHealth: number;
  readonly currentWait: number;
  readonly id: string;
  readonly name: string;
  readonly order: string;
  readonly playerId: string;
  readonly " $fragmentType": "PieceFragment";
};
export type PieceFragment$key = {
  readonly " $data"?: PieceFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PieceFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PieceFragment",
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
      "kind": "ScalarField",
      "name": "playerId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentWait",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentHealth",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentBlocking",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Vec",
      "kind": "LinkedField",
      "name": "currentDirection",
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
      "name": "currentFocus",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentEffects",
      "storageKey": null
    }
  ],
  "type": "Piece",
  "abstractKey": null
};

(node as any).hash = "b387de72b550df7f20a383bfbf330f70";

export default node;
