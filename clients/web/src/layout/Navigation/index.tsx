import * as React from 'react';
import classnames from 'classnames';
import styles from './index.module.css';
import UserItem from './UserItem';
import { Flex, Heading } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
type Props = {
  useSpace?: boolean;
};

const Navigation = ({ useSpace = true }: Props): React.ReactNode => {
  const className = classnames(styles.root, !useSpace && styles.float);
  return (
    <Flex 
      justify='between' 
      align='center' 
      px='2' 
      py='2' 
      className={className}
    >
      <Link to="/" className={styles.logo}>
        <Heading size='4' weight='bold'>
          Monarchy
        </Heading>
      </Link>
      <Flex gap='4' className={styles.settings}>
        <UserItem />
      </Flex>
    </Flex>
  );
};

export default Navigation;
