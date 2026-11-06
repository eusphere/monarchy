/**
 * @generated SignedSource<<4ca5c7f8ff2d0cdc14c975c44ddfba7d>>
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
    readonly id: string;
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

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GameFragment",
  "selections": [
    (v0/*: any*/),
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
        (v0/*: any*/),
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
})();

(node as any).hash = "d866a4eaf3a881239c2d360f23db4417";

export default node;
