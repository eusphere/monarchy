import * as React from 'react';
import styles from './index.module.css';
import UserItem from './UserItem';
import { Flex, Heading } from '@radix-ui/themes';

const Navigation = (): React.ReactNode => {
  return (
    <Flex 
      justify='between' 
      align='center' 
      px='2' 
      py='2' 
      className={styles.root}
    >
      <Heading size='4' weight='bold'>
        Monarchy
      </Heading>
      <Flex gap='4'>
        <UserItem />
      </Flex>
    </Flex>
  );
};

export default Navigation;
