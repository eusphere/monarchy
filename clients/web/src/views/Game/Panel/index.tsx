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
import type { Phase } from '~/autogen/relay/GameSelectionFragment.graphql';
import PhaseSwitcher from './PhaseSwitcher';

type Props = {
  game: Types.Game;
  pieceColors: Record<string, string>;
  activePhase?: Phase;
  onPhaseChange: (phase: Phase) => void;
  onEndTurn: () => void;
  showPhaseSwitcher: boolean;
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
        phase={props.activePhase ?? selection?.phases[0]}
        phaseControls={props.showPhaseSwitcher && selection ? (
          <PhaseSwitcher
            activePhase={props.activePhase}
            allowedPhases={selection.phases}
            onChange={props.onPhaseChange}
            onEndTurn={props.onEndTurn}
          />
        ) : undefined}
        inactivePhaseControls={selection ? (
          <PhaseSwitcher
            activePhase={props.activePhase ?? selection.phases[0]}
            allowedPhases={[]}
            onChange={props.onPhaseChange}
            onEndTurn={props.onEndTurn}
            compact
            waiting
          />
        ) : undefined}
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
