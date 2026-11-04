import * as React from 'react';
import * as Types from '~/types';
import styles from './index.module.css';
import { Box } from '@radix-ui/themes';
import { useFragment } from 'react-relay';
import GameSelectionFragment from '~/autogen/relay/GameSelectionFragment.graphql';
import type { GameSelectionFragment$key } from '~/autogen/relay/GameSelectionFragment.graphql';
import TurnBanner from './TurnBanner';
import PieceDetails from './PieceDetails';
import { useHoveredPiece } from '../pieceHoverStore';

type Props = {
  game: Types.Game;
  pieceColors: Record<string, string>;
};

const Panel = (props: Props): React.ReactNode => {
  const { game, pieceColors } = props;
  const hoveredPiece = useHoveredPiece();
  const selection = useFragment<GameSelectionFragment$key>(
    GameSelectionFragment,
    game.state?.currentSelection,
  );

  return (
    <Box className={styles.root}>
      <TurnBanner
        players={game.players}
        currentPlayerId={game.state?.currentPlayerId}
        phase={selection?.phases[0]}
      />
      {(hoveredPiece ?? selection?.piece) && (
        <PieceDetails
          piece={(hoveredPiece ?? selection?.piece) as PieceFragment$key}
          pieceColors={pieceColors}
        />
      )}
    </Box>
  );
};

export default Panel;
