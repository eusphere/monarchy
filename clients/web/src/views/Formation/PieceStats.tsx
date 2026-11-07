import * as React from 'react';
import CanvasOverlay from '~/components/CanvasOverlay';
import styles from '~/views/Game/Panel/index.module.css';
import BlockingDiagram from '~/views/common/BlockingDiagram';

export type PieceStatsType = {
  health: number;
  wait: number;
  power: number;
  armor: number;
  blocking: number;
};

type Props = Pick<React.HTMLAttributes<HTMLDivElement>, 'onPointerEnter' | 'onPointerLeave'> & {
  name: string;
  color: string;
  stats: PieceStatsType;
};

const Stat = ({ label, value }: { label: string; value: React.ReactNode }): React.ReactNode => (
  <div className={styles.pieceStat}>
    <span className={styles.statLabel}>{label}</span>
    <span className={styles.statValue}>{value}</span>
  </div>
);

const PieceStats = ({ name, color, stats, ...pointerEvents }: Props): React.ReactNode => (
  <CanvasOverlay className={styles.pieceDetails} {...pointerEvents}>
    <div className={styles.pieceHeading}>
      <div className={styles.ownerIndicator} style={{ backgroundColor: color }} aria-hidden='true' />
      <span className={styles.pieceName}>{name}</span>
    </div>
    <div className={styles.pieceStats}>
      <Stat label='Health' value={stats.health} />
      <Stat label='Cooldown' value={stats.wait} />
      <div className={styles.blockingStat}>
        <span className={styles.statLabel}>Blocking</span>
        <BlockingDiagram blocking={stats.blocking} />
      </div>
      <Stat label='Power' value={stats.power} />
      <Stat label='Armor' value={`${Math.round(stats.armor * 100)}%`} />
    </div>
  </CanvasOverlay>
);

export default PieceStats;
