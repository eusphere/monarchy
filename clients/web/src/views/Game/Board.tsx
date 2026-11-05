import * as Constants from './constants';
import * as React from 'react';
import * as Types from '~/types';
import Tile from './Tile';
import GameSelectionFragment from '~/autogen/relay/GameSelectionFragment.graphql';
import type { GameSelectionFragment$key } from '~/autogen/relay/GameSelectionFragment.graphql';
import { setHoveredPiece } from './pieceHoverStore';
import { clearHoveredPiece } from './pieceHoverStore';
import type { ThreeEvent } from '@react-three/fiber';
import { useFragment } from 'react-relay';
import type { Object3D } from 'three';

type Props = {
  state: Types.GameState;
  pieceColors: Record<string, string>;
  onSelect: (point: { i: number; j: number }) => void;
  onDeselect: () => void;
  onMove: (point: { i: number; j: number }) => void;
  activePhase?: import('~/autogen/relay/GameSelectionFragment.graphql').Phase;
  selfPlayerId?: string;
};

type LegalAction = 'MOVE' | 'ATTACK' | 'EFFECT';
const pointKey = (point: { i: number; j: number }) => `${point.i}-${point.j}`;

// Basic board component
const Board = (props: Props): React.ReactNode => {
  const tiles = props.state.tiles;
  const selection = useFragment<GameSelectionFragment$key>(
    GameSelectionFragment,
    props.state.currentSelection,
  );
  const phase = props.activePhase ?? selection?.phases[0];
  const canSelect = selection?.phases.includes('SELECT') || selection?.phases.includes('MOVE') || false;
  const canDeselect = canSelect;
  const selectedPieceId = selection?.selection ? selection.piece : undefined;
  const legalTargets = React.useMemo(() => {
    const targets = new Map<string, LegalAction>();
    if (!selection) return targets;
    if (phase === 'MOVE') selection.movements.forEach((point) => targets.set(pointKey(point), 'MOVE'));
    if (phase === 'ATTACK') selection.attacks.forEach((attack) => attack.tiles.forEach((point) => targets.set(pointKey(point), 'ATTACK')));
    return targets;
  }, [phase, selection]);
  const [hoveredTile, setHoveredTile] = React.useState<string | null>(null);
  const offset: [number, number, number] = React.useMemo(() => {
    const minI = Math.min(...tiles.map((_) => _.point.i));
    const minJ = Math.min(...tiles.map((_) => _.point.j));
    const maxI = Math.max(...tiles.map((_) => _.point.i));
    const maxJ = Math.max(...tiles.map((_) => _.point.j));
    const xOffset = (maxJ - minJ) * Constants.TILE_SIZE / 2;
    const zOffset = (maxI - minI) * Constants.TILE_SIZE / 2;
    return [-xOffset, 0, -zOffset];
  }, [tiles]);

  const onPointerMove = React.useCallback((event: ThreeEvent<PointerEvent>) => {
    let tileObject: Object3D | undefined = event.object;
    while (tileObject && !tileObject.userData.tileKey) tileObject = tileObject.parent!;
    if (!tileObject?.userData.tileKey) {
      tileObject = event.intersections.find((intersection) => intersection.object.userData.tileKey)?.object;
    }
    if (!tileObject) return;
    setHoveredTile(tileObject?.userData.tileKey ?? null);
    if (tileObject.userData.pieceRef) {
      setHoveredPiece(tileObject.userData.pieceRef, tileObject.userData.pieceId ?? null);
    } else {
      clearHoveredPiece();
    }
  }, []);

  return (
    <group position={offset} onPointerMove={onPointerMove} onPointerLeave={() => {
      setHoveredTile(null);
      clearHoveredPiece();
    }}>
      {tiles.map((tile) => {
        const { point } = tile;
        const key = `${point.i}-${point.j}`;
        return (
          <Tile
            key={key}
            tile={tile}
            pieceColors={props.pieceColors}
            currentPlayerId={props.state.currentPlayerId}
            phase={phase}
            canSelect={canSelect}
            canDeselect={canDeselect}
            selectedPiece={selectedPieceId ?? undefined}
            hovered={hoveredTile === key}
            selfPlayerId={props.selfPlayerId}
            legalAction={legalTargets.get(key)}
            selected={selection?.selection ? pointKey(selection.selection) === key : false}
            hasSelection={Boolean(selection?.selection)}
            onSelect={props.onSelect}
            onDeselect={props.onDeselect}
            onMove={props.onMove}
          />
        );
      })}
    </group>
  );
};

export default Board;
