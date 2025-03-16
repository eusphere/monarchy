import * as React from 'react';
import { Plane } from '@react-three/drei';
import type { GameQuery$data } from '~/autogen/relay/GameQuery.graphql';

type GameState = NonNullable<NonNullable<GameQuery$data['game']>['state']>;
type Props = {
  state: GameState;
};

// Basic board component
const Board = (props: Props): React.ReactNode => {
  const tiles = props.state.tiles;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <Plane args={[10, 10]} />
      <meshStandardMaterial color="#404040" />
    </mesh>
  );
};

export default Board;
