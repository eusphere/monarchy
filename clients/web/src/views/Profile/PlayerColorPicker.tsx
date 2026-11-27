import * as React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import Query from '~/autogen/relay/PlayerColorsQuery.graphql';
import type { PlayerColorsQuery } from '~/autogen/relay/PlayerColorsQuery.graphql';
import ColorPicker from '~/components/ColorPicker';
import styles from './index.module.css';

type Props = {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
};

const PlayerColorPicker = ({ color, onChange, onClose }: Props): React.ReactNode => {
  const { playerColorFamilies } = useLazyLoadQuery<PlayerColorsQuery>(Query, {});
  return <div className={styles.colorEditor} onKeyDown={event => {
    if (event.key === 'Escape') { event.preventDefault(); onClose(); }
  }}>
    <ColorPicker autoFocus families={playerColorFamilies} value={color} onChange={onChange} />
  </div>;
};
export default PlayerColorPicker;
