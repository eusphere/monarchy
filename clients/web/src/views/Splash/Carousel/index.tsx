import * as React from 'react';
import styles from './index.module.css';

const IMAGE_HOST = 'https://monarchy1.com/static/concept';
const IMAGES = [
  'arboreal-summoner-1.png',
  'arboreal-summoner-2.png',
  'arboreal-summoner-3.png',
  'dark-mages-1.png',
  'dark-mages-2.png',
  'dark-mages-3.png',
  'dark-mages-4.png',
  'piety-1.png',
  'piety-2.png',
  'piety-3.png',
  'white-cloak-1.png',
  'white-cloak-2.png',
  'white-cloak-3.png',
  'white-cloak-4.png',
].sort(() => Math.random() - 0.5);

const Carousel = (): React.ReactNode => {
  return (
    <div className={styles.root}>
      <div className={styles.carousel}>
        {IMAGES.map((image, idx) => (
          <img key={idx} src={`${IMAGE_HOST}/${image}`} alt={`Concept ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
