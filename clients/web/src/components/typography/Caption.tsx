import { Text } from '@radix-ui/themes';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

const Caption = (props: Props) => (
  <Text {...props} as='div' size='1' color='gray' />
);

export default Caption;
