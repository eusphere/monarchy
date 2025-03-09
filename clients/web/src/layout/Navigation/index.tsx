import { Flex, Button, Heading } from '@radix-ui/themes';
import { PersonIcon, GearIcon } from '@radix-ui/react-icons';
import styles from './index.module.css';

const Navigation = () => {
  return (
    <Flex 
      justify="between" 
      align="center" 
      px="4" 
      py="2" 
      className={styles.root}
    >
      <Heading size="4" weight="bold">
        Monarchy
      </Heading>

      <Flex gap="4">
        <Button variant="ghost" size="2">
          <PersonIcon width="16" height="16" />
          Profile
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navigation;
