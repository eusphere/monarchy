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
import type { PieceFragment$key } from '~/autogen/relay/PieceFragment.graphql';
import { formatGraphqlError } from '~/util/graphqlError';

type Props = {
  game: Types.Game;
  pieceColors: Record<string, string>;
  actionError: string | null;
};

const Panel = (props: Props): React.ReactNode => {
  const { game, pieceColors, actionError } = props;
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
      {actionError && <div className={styles.actionError} role='alert'>{formatGraphqlError(new Error(actionError))}</div>}
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
