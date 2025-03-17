import * as Constants from './constants';
import * as React from 'react';
import Archer from './pieces/Archer';
import Default from './pieces/Default';
import Knight from './pieces/Knight';
import PieceFragment from '~/autogen/relay/PieceFragment.graphql';
import { useFragment } from 'react-relay';
import type { PieceFragment$key } from '~/autogen/relay/PieceFragment.graphql';

const OFFSET = [0, Constants.TILE_HEIGHT / 2, 0] as const;
const MAPPING: Record<string, React.ComponentType<any>> = {
  Scout: Archer,
  Knight: Knight,
};

type Props = {
  piece: PieceFragment$key;
};

const Piece = (props: Props): React.ReactNode => {
  const { piece } = props;
  const data = useFragment<PieceFragment$key>(PieceFragment, piece);
  const Model = MAPPING[data.order] ?? Default;

  // Convert i,j direction vector to rotation angle in radians
  // Math.atan2 gives angle from positive x-axis
  // Since i maps to z and j maps to x, we swap the order
  const rotation: [number, number, number] = React.useMemo(() => {
    const angle = Math.atan2(data.currentDirection.i, data.currentDirection.j);
    return [0, angle, 0]; // Rotate around y-axis
  }, [data.currentDirection]);

  return (
    <group position={OFFSET} rotation={rotation}>
      <Model />
    </group>
  );
};

export default Piece;
