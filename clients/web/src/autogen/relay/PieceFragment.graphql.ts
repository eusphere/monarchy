/**
 * @generated SignedSource<<4104ea7def47ec328de190274d3577de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type PieceOrder = "ASSASSIN" | "CLERIC" | "FROST_GOLEM" | "FURGON" | "KNIGHT" | "MUD_GOLEM" | "PYROMANCER" | "SCOUT" | "SHRUB" | "WITCH" | "%future added value";
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
  readonly order: PieceOrder;
  readonly playerId: string;
  readonly stats: {
    readonly armor: number;
    readonly health: number;
    readonly power: number;
  };
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
      "concreteType": "PieceStats",
      "kind": "LinkedField",
      "name": "stats",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "health",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "armor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "power",
          "storageKey": null
        }
      ],
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

(node as any).hash = "55f336b51cd97a5806e68de6e8f7c70e";

export default node;
