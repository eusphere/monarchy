/**
 * @generated SignedSource<<ea7b04471177ee6b4c1d70921a48a395>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type GameStatus = "COMPLETE" | "INVALID" | "STARTED" | "%future added value";
export type PlayerStatus = "DRAWN" | "INVALID" | "LOST" | "PLAYING" | "WON" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type GameFragment$data = {
  readonly createdAt: string;
  readonly id: string;
  readonly players: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"PlayerFragment">;
  }>;
  readonly selfStatus: PlayerStatus | null | undefined;
  readonly status: GameStatus;
  readonly " $fragmentType": "GameFragment";
};
export type GameFragment$key = {
  readonly " $data"?: GameFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GameFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GameFragment",
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PlayerFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Game",
  "abstractKey": null
};

(node as any).hash = "33980d62085d687d3c85573b8451c7d4";

export default node;
