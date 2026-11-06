import * as React from 'react';
import { DropdownMenu } from '@radix-ui/themes';
import styles from './index.module.css';

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

const Dropdown = (props: Props): React.ReactNode => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <button type='button' className={styles.trigger}>
        {props.trigger}
      </button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align='end'>
      {props.children}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);

export default Dropdown;
