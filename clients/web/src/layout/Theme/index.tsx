import * as React from 'react';
import { Theme as ThemeComponent } from '@radix-ui/themes';
import styles from './index.module.css';

type Props = {
  children: React.ReactNode
};

const Theme = (props: Props) => {
  return (
    <ThemeComponent
      appearance="light"
      accentColor="amber"
      className={styles.root}
    >
      {props.children}
    </ThemeComponent>
  );
};

export default Theme;
