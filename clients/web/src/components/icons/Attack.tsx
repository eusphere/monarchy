type Props = { size?: number };

const Attack = ({ size = 18 }: Props) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' style={{ flexShrink: 0 }}>
    <g transform='rotate(45 12 12)'>
      <path d='M12 1 13.5 5 14.5 14.5H9.5L10.5 5Z' />
      <rect x='6.5' y='14.5' width='11' height='2.5' rx='0.75' />
      <rect x='10.5' y='17' width='3' height='4' />
      <rect x='9.5' y='21' width='5' height='2' rx='0.75' />
    </g>
  </svg>
);

export default Attack;
