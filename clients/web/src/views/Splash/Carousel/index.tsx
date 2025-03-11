import * as React from 'react';
import styles from './index.module.css';

const IMAGE_HOST = 'https://monarchy1.com/static/concept';
const IMAGES = [
  'piety-3.png',
  'dark-mages-2.png',
  'arboreal-summoner-2.png',
  // 'white-cloak-2.png',
  // 'arboreal-summoner-1.png',
  // 'arboreal-summoner-3.png',
  // 'dark-mages-1.png',
  // 'dark-mages-3.png',
  // 'dark-mages-4.png',
  // 'piety-1.png',
  // 'piety-2.png',
  // 'white-cloak-1.png',
  // 'white-cloak-3.png',
  // 'white-cloak-4.png',
];

const Carousel = (): React.ReactNode => {
  const path = React.useMemo(() => IMAGES[Math.floor(Math.random() * IMAGES.length)], []);

  return (
    <div className={styles.root}>
      <img src={`${IMAGE_HOST}/${path}`} alt="Concept" />
    </div>
  );
};

export default Carousel;
