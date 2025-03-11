/**
 * @generated SignedSource<<64467bfcb4fb95eabcbe4be2c33c0f72>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type PlayerStatus = "DRAWN" | "INVALID" | "LOST" | "PLAYING" | "WON" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PlayerFragment$data = {
  readonly id: string;
  readonly rating: number;
  readonly ratingDelta: number | null | undefined;
  readonly status: PlayerStatus;
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"UserFragment">;
  } | null | undefined;
  readonly " $fragmentType": "PlayerFragment";
};
export type PlayerFragment$key = {
  readonly " $data"?: PlayerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PlayerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PlayerFragment",
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
      "name": "status",
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UserFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Player",
  "abstractKey": null
};

(node as any).hash = "d3626af53fc80f1183073ef3fedb1dce";

export default node;
