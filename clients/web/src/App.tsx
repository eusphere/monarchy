import { useState } from 'react';
import { Flex, Button, Heading } from '@radix-ui/themes';
import Navigation from './layout/Navigation';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navigation />
      <Flex p="4" style={{ minHeight: 'calc(100vh - var(--header-height))' }}>
        <Flex direction="column" gap="6" align="center" style={{ width: '100%' }}>
          <Heading size="6" weight="bold">
            Monarchy
          </Heading>

          <Flex direction="column" gap="4" align="center">
            <Button size="3" variant="soft" onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default App;
