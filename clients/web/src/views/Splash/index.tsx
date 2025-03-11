import * as React from 'react';
import Carousel from './Carousel';
import Login from './Login';
import styles from './index.module.css';

const Splash = (): React.ReactNode => {
  return (
    <div className={styles.root}>
      <Carousel />
      <Login />
    </div>
  );
};

export default Splash;
