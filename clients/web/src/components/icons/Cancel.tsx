type Props = { size?: number };

const Cancel = ({ size = 15 }: Props) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' aria-hidden='true'>
    <path d='m7 7 10 10M17 7 7 17' />
  </svg>
);

export default Cancel;
