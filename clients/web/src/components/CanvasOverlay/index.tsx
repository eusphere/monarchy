import * as React from 'react';
import classnames from 'classnames';
import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const CanvasOverlay = ({ children, className }: Props): React.ReactNode => (
  <div className={classnames(styles.root, className)}>{children}</div>
);

export default CanvasOverlay;
