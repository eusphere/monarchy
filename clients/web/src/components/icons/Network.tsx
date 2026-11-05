type Props = { size?: number };

const Network = ({ size = 16 }: Props) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
    <path d='M3 12h18' />
    <path d='m8 7-5 5 5 5' />
    <path d='m16 7 5 5-5 5' />
    <circle cx='3' cy='12' r='1.5' fill='currentColor' stroke='none' />
    <circle cx='21' cy='12' r='1.5' fill='currentColor' stroke='none' />
  </svg>
);

export default Network;
