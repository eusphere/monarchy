import * as React from 'react';
import styles from './index.module.css';

type Props = {
  blocking: number;
};

const SIZE = 144;
const CENTER = SIZE / 2;
const RADIUS = 46;
const STROKE_WIDTH = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC = CIRCUMFERENCE / 4;
const GAP = 1.5;

const percentage = (value: number): number => Math.min(100, Math.max(0, Math.round(value * 100)));

const BlockingDiagram = ({ blocking }: Props): React.ReactNode => {
  const sideBlocking = blocking / 2;
  const labels = [
    { value: percentage(blocking), x: CENTER, y: 27 },
    { value: percentage(sideBlocking), x: 119, y: CENTER },
    { value: 0, x: CENTER, y: 118 },
    { value: percentage(sideBlocking), x: 25, y: CENTER },
  ];
  const colors = ['#79a8e8', '#a8c5ef', '#d9dde5', '#a8c5ef'];

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={styles.blockingDiagram}
      role='img'
      aria-label={`Blocking: ${labels[0].value}% from the front, ${labels[1].value}% from either side, and none from behind`}
    >
      <g transform={`rotate(-45 ${CENTER} ${CENTER})`}>
        {colors.map((color, index) => (
          <circle
            key={index}
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill='none'
            stroke={labels[index].value === 0 ? '#d9dde5' : color}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${ARC - GAP} ${CIRCUMFERENCE - ARC + GAP}`}
            strokeDashoffset={-index * ARC}
            transform={`rotate(-90 ${CENTER} ${CENTER})`}
          />
        ))}
      </g>
      {labels.map((label, index) => (
        <text key={index} x={label.x} y={label.y} textAnchor='middle' dominantBaseline='middle'>
          {label.value}%
        </text>
      ))}
    </svg>
  );
};

export default BlockingDiagram;
