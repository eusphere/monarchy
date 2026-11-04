import type { ReactNode } from 'react';
import { Card } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

type Props = { to: string; status?: ReactNode; children: ReactNode };

/** Linked summary with an optional full-height leading status cell. */
const SummaryTile = ({ to, status, children }: Props) => (
  <Card size='1' asChild className={styles.tile}>
    <Link to={to} data-has-status={status ? 'true' : undefined}>
      {status && <div className={styles.status}>{status}</div>}
      <div className={styles.content}>{children}</div>
    </Link>
  </Card>
);

export default SummaryTile;
