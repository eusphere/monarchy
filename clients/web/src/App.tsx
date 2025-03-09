import { useState } from 'react';
import { Container, Flex, Button, Heading } from '@radix-ui/themes';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container size="2" p="4">
      <Flex direction="column" gap="6" align="center">
        <Heading size="6" weight="bold">
          Monarchy
        </Heading>

        <Flex direction="column" gap="4" align="center">
          <Button size="3" variant="soft" onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default App;
