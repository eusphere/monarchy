import Attack from '~/components/icons/Attack';
import Compass from '~/components/icons/Compass';
import Cursor from '~/components/icons/Cursor';
import Forfeit from '~/components/icons/Forfeit';
import Move from '~/components/icons/Move';
import Victory from '~/components/icons/Victory';
import Hourglass from '~/components/icons/Hourglass';

export type GamePhaseIconKind = 'waiting' | 'selecting' | 'moving' | 'attacking' | 'turning' | 'ending' | 'forfeit' | 'victory';

type Props = {
  kind: GamePhaseIconKind;
  size?: number;
};

const GamePhaseIcon = ({ kind, size = 18 }: Props) => {
  switch (kind) {
    case 'waiting':
      return <Hourglass size={size} />;
    case 'selecting':
      return <Cursor size={size} />;
    case 'moving':
      return <Move size={size} />;
    case 'attacking':
      return <Attack size={size} />;
    case 'turning':
      return <Compass size={size} />;
    case 'ending':
      return <Hourglass size={size} />;
    case 'forfeit':
      return <Forfeit size={size} />;
    case 'victory':
      return <Victory size={size} />;
  }
};

export default GamePhaseIcon;
