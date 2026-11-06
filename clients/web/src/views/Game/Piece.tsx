import * as React from 'react';
import * as Pieces from './pieces';
import PieceFragment from '~/autogen/relay/PieceFragment.graphql';
import { useFragment } from 'react-relay';
import type { PieceFragment$key } from '~/autogen/relay/PieceFragment.graphql';
import type { Group } from 'three';
import Arrow from '~/components/geo/Arrow';
import Debug from '~/components/Debug';
import HealthBar from '~/components/geo/HealthBar';
import { PIECE_OFFSET } from './pieceConstants';
const ORIENTATION_MARKER_POSITION = [0, 0.75, 0] as const;
type Props = {
  piece: PieceFragment$key;
  color?: string;
};

const Piece = (props: Props): React.ReactNode => {
  const { piece, color } = props;
  const modelRef = React.useRef<Group>(null);
  const data = useFragment<PieceFragment$key>(PieceFragment, piece);
  const visual = Pieces.visuals[data.order];
  const Model = visual?.component ?? Pieces.Default;
  const rotationOffset = visual?.rotationOffset ?? 0;

  // The board maps i to world Z and j to world X. The imported models face
  // world +Z at zero yaw, so convert the grid direction into that model axis.
  const rotation: [number, number, number] = React.useMemo(() => {
    const angle = rotationOffset + Math.PI / 2 - Math.atan2(data.currentDirection.i, data.currentDirection.j);
    return [0, angle, 0];
  }, [data.currentDirection, rotationOffset]);

  React.useLayoutEffect(() => {
    modelRef.current?.traverse((object) => {
      if ('isMesh' in object && object.isMesh) object.raycast = () => null;
    });
  }, [data.id]);

  return (
    <group ref={modelRef} position={PIECE_OFFSET} rotation={rotation} userData={{ pieceRef: piece, pieceId: data.id }}>
      <Model color={color} />
      <HealthBar current={data.currentHealth} maximum={data.stats.health} />
      <Debug>
        <Arrow position={ORIENTATION_MARKER_POSITION} />
      </Debug>
    </group>
  );
};

export default Piece;
