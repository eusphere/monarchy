import * as React from 'react';
import { useDebug } from '~/hooks/useDebug';

type Props = {
  children?: React.ReactNode;
};

const Debug = ({ children }: Props): React.ReactNode => {
  const [enabled] = useDebug();
  return enabled ? children : null;
};

export default Debug;
