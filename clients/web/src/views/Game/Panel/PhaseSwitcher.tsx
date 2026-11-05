import * as React from 'react';
import type { Phase } from '~/autogen/relay/GameSelectionFragment.graphql';
import styles from './index.module.css';
import GamePhaseIcon, { type GamePhaseIconKind } from './GamePhaseIcon';

const PHASES: ReadonlyArray<{ value: Phase; label: string }> = [
  { value: 'SELECT', label: 'Select' },
  { value: 'MOVE', label: 'Move' },
  { value: 'ATTACK', label: 'Attack' },
  { value: 'DIR', label: 'Turn' },
  { value: 'END', label: 'End' },
];

const phaseIcon = (phase: Phase): GamePhaseIconKind => {
  if (phase === 'SELECT') return 'selecting';
  switch (phase) {
    case 'MOVE': return 'moving';
    case 'ATTACK': return 'attacking';
    case 'END': return 'ending';
    case 'DIR': return 'turning';
    default: return 'turning';
  }
};

type Props = {
  activePhase?: Phase;
  allowedPhases: ReadonlyArray<Phase>;
  onChange: (phase: Phase) => void;
  onEndTurn: () => void;
  compact?: boolean;
  waiting?: boolean;
};

const PhaseSwitcher = ({ activePhase, allowedPhases, onChange, onEndTurn, compact = false, waiting = false }: Props): React.ReactNode => (
  <div className={`${styles.phaseSwitcher} ${waiting ? styles.phaseSwitcherWaiting : ''}`} role='tablist' aria-label='Turn phase'>
    {(waiting ? [{ value: 'WAITING' as Phase, label: 'Waiting' }] : PHASES.filter(({ value }) => !compact || value === activePhase)).map(({ value, label }) => {
      const active = waiting || value === activePhase;
      const enabled = waiting || allowedPhases.includes(value);
      return (
        <button
          key={value}
          type='button'
          role='tab'
          aria-selected={active}
          disabled={!enabled}
          className={`${styles.phaseButton} ${active ? styles.phaseButtonActive : ''}`}
          onClick={() => value === 'END' ? onEndTurn() : value !== 'WAITING' && onChange(value)}>
          <GamePhaseIcon kind={waiting ? 'waiting' : phaseIcon(value)} size={18} />
          {active && <span>{label}</span>}
        </button>
      );
    })}
  </div>
);

export default PhaseSwitcher;
