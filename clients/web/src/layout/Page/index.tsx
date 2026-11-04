import * as React from 'react';
import styles from './index.module.css';

type Props = {
  children: React.ReactNode;
};

const Page = ({ children }: Props): React.ReactNode => (
  <main className={styles.root}>{children}</main>
);

export default Page;
