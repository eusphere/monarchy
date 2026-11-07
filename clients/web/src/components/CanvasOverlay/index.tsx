import * as React from 'react';
import classnames from 'classnames';
import styles from './index.module.css';

type Props = Pick<React.HTMLAttributes<HTMLDivElement>, 'onPointerEnter' | 'onPointerLeave'> & {
  children: React.ReactNode;
  className?: string;
};

const CanvasOverlay = ({ children, className, ...pointerEvents }: Props): React.ReactNode => (
  <div className={classnames(styles.root, className)} {...pointerEvents}>{children}</div>
);

export default CanvasOverlay;
