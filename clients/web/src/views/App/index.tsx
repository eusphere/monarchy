import * as React from 'react';
import Navigation from '~/layout/Navigation';
import Splash from '~/views/Splash';

function App(): React.ReactNode {
  return (
    <>
      <Navigation />
      <Splash />
    </>
  );
};

export default App;
