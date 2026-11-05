import { Text } from '@radix-ui/themes';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Text>;

const Caption = (props: Props) => (
  <Text {...props} as='div' size='1' color='gray' />
);

export default Caption;
