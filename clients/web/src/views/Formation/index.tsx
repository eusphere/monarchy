import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import type { Group, Object3D } from 'three';
import { useLazyLoadQuery } from 'react-relay';
import FormationQuery from '~/autogen/relay/FormationQuery.graphql';
import type { FormationQuery as FormationQueryType } from '~/autogen/relay/FormationQuery.graphql';
import * as Constants from '~/views/Game/constants';
import * as Pieces from '~/views/Game/pieces';
import { activePieceColor, PIECE_OFFSET } from '~/views/Game/pieceConstants';
import styles from './index.module.css';
import BoardTile from '~/views/common/BoardTile';
import { pointKey } from '~/views/common/board';
import PieceStats from './PieceStats';
import { createHoverStore } from '~/util/hoverStore';

const CAMERA_DISTANCE = 6;
const CAMERA_POSITION = [0, CAMERA_DISTANCE * 1.35, -CAMERA_DISTANCE] as const;
const HALF_BOARD_WIDTH = 5;
const HALF_BOARD_DEPTH = 11;
const BOARD_TILE_COLOR = '#d0d0d0';

type Point = { i: number, j: number };

const FormationPiece = ({ piece, color, active, position }: { piece: string, color: string, active: boolean, position?: [number, number, number] }): React.ReactNode => {
  const visual = Pieces.visuals[piece];
  const Model = visual?.component ?? Pieces.Default;
  const rotation = visual?.rotationOffset ?? 0;
  return (
    <group position={position ?? PIECE_OFFSET} rotation={[0, Math.PI / 2 + rotation, 0]}>
      <Model color={active ? activePieceColor(color) : color} />
    </group>
  );
};

type FormationTile = FormationQueryType['response']['formation']['tiles'][number];
type FormationEntry = FormationTile & { piece: NonNullable<FormationTile['piece']> };
const formationHoverStore = createHoverStore<FormationEntry>();

const FormationBoard = ({ tiles, color, onMove }: { tiles: FormationQueryType['response']['formation']['tiles'], color: string, onMove: (from: Point, to: Point) => void }): React.ReactNode => {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [dragging, setDragging] = React.useState<Point | null>(null);
  const [dragPosition, setDragPosition] = React.useState<[number, number, number] | null>(null);
  const boardRef = React.useRef<Group>(null);

  const setDragState = React.useCallback((point: Point | null) => {
    setDragging(point);
    setDragPosition(point ? [point.j * Constants.TILE_SIZE, PIECE_OFFSET[1], point.i * Constants.TILE_SIZE] : null);
  }, []);
  const offset: [number, number, number] = [
    -((HALF_BOARD_WIDTH - 1) * Constants.TILE_SIZE) / 2,
    0,
    -((HALF_BOARD_DEPTH - 1) * Constants.TILE_SIZE) / 2,
  ];
  const boardPoint = React.useCallback((event: ThreeEvent<PointerEvent>): Point | null => {
    if (!boardRef.current) return null;
    const point = boardRef.current.worldToLocal(event.point.clone());
    const i = Math.round(point.z / Constants.TILE_SIZE);
    const j = Math.round(point.x / Constants.TILE_SIZE);
    const valid = i >= 0 && i < HALF_BOARD_DEPTH && j >= 0 && j < HALF_BOARD_WIDTH && !(
      ((i === 0 || i === HALF_BOARD_DEPTH - 1) && j < 2) ||
      ((i === 1 || i === HALF_BOARD_DEPTH - 2) && j === 0)
    );
    return valid ? { i, j } : null;
  }, []);
  const updateDragPosition = React.useCallback((event: ThreeEvent<PointerEvent>) => {
    if (!boardRef.current || !dragging) return null;
    const point = boardRef.current.worldToLocal(event.point.clone());
    setDragPosition([point.x, PIECE_OFFSET[1], point.z]);
    return boardPoint(event);
  }, [boardPoint, dragging]);

  const tileObjectFromEvent = React.useCallback((event: ThreeEvent<PointerEvent>): Object3D | undefined => {
    const candidates = [event.object, ...event.intersections.map((intersection) => intersection.object)];
    for (const candidate of candidates) {
      let object: Object3D | undefined = candidate;
      while (object && !object.userData.tileKey) object = object.parent ?? undefined;
      if (object?.userData.tileKey) return object;
    }
    return undefined;
  }, []);

  const draggedPiece = dragging ? tiles.find((entry) => entry.piece && pointKey(entry.point) === pointKey(dragging)) : undefined;

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      <group ref={boardRef} position={offset}>
        <group
          onPointerMove={(event) => {
            const tileObject = tileObjectFromEvent(event);
            const tileKey = tileObject?.userData.tileKey as string | undefined;
            const point = tileKey ? null : boardPoint(event);
            setHovered(tileKey ?? (point ? pointKey(point) : null));
            const hoveredTile = tileKey ? tiles.find((tile) => pointKey(tile.point) === tileKey) : undefined;
            const piece = hoveredTile?.piece ? hoveredTile as FormationEntry : null;
            if (piece) formationHoverStore.set(piece, piece.piece.id);
            else formationHoverStore.clear();
            if (dragging) updateDragPosition(event);
          }}
          onPointerLeave={() => {
            setHovered(null);
            formationHoverStore.clear();
          }}
        >
        <mesh
          position={[(HALF_BOARD_WIDTH - 1) / 2, -0.05, (HALF_BOARD_DEPTH - 1) / 2]}
          rotation={[-Math.PI / 2, 0, 0]}
          onPointerUp={(event) => {
            if (!dragging) return;
            event.stopPropagation();
            const target = updateDragPosition(event);
            if (target) onMove(dragging, target);
            setDragState(null);
          }}
        >
          <planeGeometry args={[30, 30]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        {tiles.map((tile) => {
          const key = pointKey(tile.point);
          const piece = tile.piece ? tile : undefined;
          const isSource = Boolean(dragging && piece && pointKey(piece.point) === pointKey(dragging));
          const displayPiece: FormationEntry | undefined = isSource || !piece?.piece ? undefined : piece as FormationEntry;
          const isMissingCorner = (
            (tile.point.i === 0 || tile.point.i === HALF_BOARD_DEPTH - 1) && tile.point.j < 2
          ) || (
            (tile.point.i === 1 || tile.point.i === HALF_BOARD_DEPTH - 2) && tile.point.j === 0
          );
          if (isMissingCorner) return null;
          const isHovered = hovered === key;
          return (
            <group
              key={key}
              position={[tile.point.j * Constants.TILE_SIZE, 0, tile.point.i * Constants.TILE_SIZE]}
              userData={{ tileKey: key }}
              onPointerDown={(event) => {
                if (!piece) return;
                event.stopPropagation();
                setDragState(piece.point);
                updateDragPosition(event);
              }}
              onPointerUp={(event) => {
                if (!dragging) return;
                event.stopPropagation();
                onMove(dragging, tile.point);
                setDragState(null);
              }}
            >
              <BoardTile color={(tile.point.i + tile.point.j) % 2 === 0 ? BOARD_TILE_COLOR : '#dddddd'} hovered={isHovered} userData={{ tileKey: key }} />
              {displayPiece && <FormationPiece piece={displayPiece.piece.order} color={color} active={false} />}
            </group>
          );
        })}
        {draggedPiece?.piece && dragPosition && <FormationPiece piece={draggedPiece.piece.order} color={color} active position={dragPosition} />}
        </group>
      </group>
    </group>
  );
};

const Formation = (): React.ReactNode => {
  const data = useLazyLoadQuery<FormationQueryType>(FormationQuery, {}, { fetchPolicy: 'network-only' });
  const [tiles, setTiles] = React.useState(data.formation.tiles);
  const hoveredPiece = formationHoverStore.useValue();
  const movePiece = React.useCallback((from: Point, to: Point) => {
    if (pointKey(from) === pointKey(to)) return;
    setTiles((current) => {
      const movingPiece = current.find((tile) => pointKey(tile.point) === pointKey(from))?.piece;
      if (!movingPiece) return current;
      return current.map((tile) => {
        if (pointKey(tile.point) === pointKey(from)) return { ...tile, piece: null };
        if (pointKey(tile.point) === pointKey(to)) return { ...tile, piece: movingPiece };
        return tile;
      });
    });
  }, []);
  return (
    <div className={styles.root}>
      <Canvas camera={{ position: CAMERA_POSITION, fov: 45 }} style={{ background: '#f0f0f0' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 20, 10]} castShadow />
        <directionalLight position={[5, 5, 5]} castShadow />
        <FormationBoard
          tiles={tiles}
          color={data.self?.profile?.color ?? '#4f46e5'}
          onMove={movePiece}
        />
      </Canvas>
      {hoveredPiece?.piece && (
        <PieceStats
          name={hoveredPiece.piece.name}
          color={data.self?.profile?.color ?? '#4f46e5'}
          stats={hoveredPiece.piece.stats}
        />
      )}
    </div>
  );
};

export default Formation;
