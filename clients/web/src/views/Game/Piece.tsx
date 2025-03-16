import * as React from 'react';
import { useFragment } from 'react-relay';
import PieceFragment from '~/autogen/relay/PieceFragment.graphql';
import type { PieceFragment$key } from '~/autogen/relay/PieceFragment.graphql';

type Props = {
  piece: PieceFragment$key;
};

const Piece = (props: Props): React.ReactNode => {
  const { piece } = props;
  const data = useFragment<PieceFragment$key>(PieceFragment, piece);
  return (
    <mesh onClick={() => console.log(data)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
    </mesh>
  );
};

export default Piece;
