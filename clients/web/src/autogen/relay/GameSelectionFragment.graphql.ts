/**
 * @generated SignedSource<<d57813880234a96ab55f75a5765cfe72>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type Phase = "ATTACK" | "DIR" | "END" | "MOVE" | "SELECT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type GameSelectionFragment$data = {
  readonly attacks: ReadonlyArray<{
    readonly tiles: ReadonlyArray<{
      readonly i: number;
      readonly j: number;
    }>;
  }>;
  readonly directions: ReadonlyArray<{
    readonly i: number;
    readonly j: number;
  }>;
  readonly movements: ReadonlyArray<{
    readonly i: number;
    readonly j: number;
  }>;
  readonly phases: ReadonlyArray<Phase>;
  readonly piece: {
    readonly " $fragmentSpreads": FragmentRefs<"PieceFragment">;
  } | null | undefined;
  readonly selection: {
    readonly i: number;
    readonly j: number;
  } | null | undefined;
  readonly " $fragmentType": "GameSelectionFragment";
};
export type GameSelectionFragment$key = {
  readonly " $data"?: GameSelectionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GameSelectionFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GameSelectionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Vec",
      "kind": "LinkedField",
      "name": "selection",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Vec",
      "kind": "LinkedField",
      "name": "movements",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Vec",
      "kind": "LinkedField",
      "name": "directions",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Attack",
      "kind": "LinkedField",
      "name": "attacks",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Vec",
          "kind": "LinkedField",
          "name": "tiles",
          "plural": true,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Piece",
      "kind": "LinkedField",
      "name": "piece",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PieceFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phases",
      "storageKey": null
    }
  ],
  "type": "Selection",
  "abstractKey": null
};
})();

(node as any).hash = "8ea60b0674180fed863385f8488297e2";

export default node;
