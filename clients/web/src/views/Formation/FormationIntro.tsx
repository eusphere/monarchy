import * as React from 'react';
import CanvasOverlay from '~/components/CanvasOverlay';
import styles from './index.module.css';

const FormationIntro = (): React.ReactNode => (
  <CanvasOverlay className={styles.intro}>
    <h1 className={styles.introHeading}>Formation</h1>
    <p className={styles.introText}>
      Change your starting formation by dragging pieces to different tiles. A general rule of thumb is to have your hardier pieces protect the more vulnerable ones behind. <strong>Hover or click</strong> units to learn more about their strengths and weaknesses.
    </p>
  </CanvasOverlay>
);

export default FormationIntro;
