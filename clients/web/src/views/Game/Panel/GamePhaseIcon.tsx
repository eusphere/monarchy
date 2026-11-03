export type GamePhaseIconKind = 'waiting' | 'moving' | 'attacking' | 'turning' | 'forfeit' | 'victory';

type Props = {
  kind: GamePhaseIconKind;
  size?: number;
};

const GamePhaseIcon = ({ kind, size = 18 }: Props) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (kind) {
    case 'waiting':
      return <svg {...common}><path d='M7 3h10M7 21h10M8 4c0 3 2 4 4 5 2-1 4-2 4-5M8 20c0-3 2-4 4-5 2 1 4 2 4 5' /><path d='M9.5 17h5' /></svg>;
    case 'moving':
      return <svg {...common}><path d='M4 19 19 4' /><path d='M10 4h9v9' /><path d='M5 14v5h5' /></svg>;
    case 'attacking':
      return <svg {...common}><path d='m5 4 15 15' /><path d='m5 4 3 8' /><path d='m5 4 8 3' /><path d='m8 12-4 4' /><path d='m12 16-4 4' /></svg>;
    case 'turning':
      return <svg {...common}><circle cx='12' cy='12' r='8' /><path d='m12 4 2 8-2 8-2-8 2-8Z' /><path d='M4 12h16' /></svg>;
    case 'forfeit':
      return <svg {...common}><path d='M6 21V4' /><path d='M6 5c4-3 7 3 12 0v8c-5 3-8-3-12 0' /><path d='M4 21h4' /></svg>;
    case 'victory':
      return <svg {...common}><path d='m3 6 4 4 3-6 2 6 2-6 3 6 4-4-2 12H5L3 6Z' /><path d='M5 18h14M7 21h10' /></svg>;
  }
};

export default GamePhaseIcon;
