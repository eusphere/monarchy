import * as React from 'react';
import { Theme as ThemeComponent } from '@radix-ui/themes';

type Props = {
  children: React.ReactNode
};

const Theme = (props: Props) => {
  return (
    <ThemeComponent
      appearance="dark"
      accentColor="amber"
    >
      {props.children}
    </ThemeComponent>
  );
};

export default Theme;
