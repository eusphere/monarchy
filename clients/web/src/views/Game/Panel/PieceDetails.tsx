import * as React from 'react';
import { useFragment } from 'react-relay';
import PieceFragment from '~/autogen/relay/PieceFragment.graphql';
import type { PieceFragment$key } from '~/autogen/relay/PieceFragment.graphql';
import styles from './index.module.css';

type Props = {
  piece: PieceFragment$key;
  pieceColors: Record<string, string>;
};

const Stat = ({ label, value, detail }: { label: string; value: React.ReactNode; detail?: string }) => (
  <div className={styles.pieceStat}>
    <span className={styles.statLabel}>{label}</span>
    <span className={styles.statValue}>{value}</span>
    {detail && <span className={styles.statDetail}>{detail}</span>}
  </div>
);

const PieceDetails = ({ piece: pieceRef, pieceColors }: Props): React.ReactNode => {
  const piece = useFragment<PieceFragment$key>(PieceFragment, pieceRef);
  return (
    <div className={styles.pieceDetails} aria-label={`${piece.name} details`}>
      <div className={styles.pieceHeading}>
        <div className={styles.ownerIndicator} style={{ backgroundColor: pieceColors[piece.playerId] ?? '#9a9a9a' }} aria-hidden='true' />
        <span className={styles.pieceName}>{piece.name}</span>
      </div>
      <div className={styles.pieceStats}>
        <Stat label='Health' value={piece.currentHealth} />
        <Stat label='Blocking' value={piece.currentBlocking.toFixed(1)} detail='effective' />
        {piece.currentWait > 0 && <Stat label='Wait' value={piece.currentWait} />}
      </div>
    </div>
  );
};

export default PieceDetails;
