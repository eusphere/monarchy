import * as React from 'react';
import { Text } from '@radix-ui/themes';
type Props = {
  text: string;
};

const Note = (props: Props): React.ReactNode => {
  return <Text size='1' color='gray'>{props.text}</Text>;
};

export default Note;
