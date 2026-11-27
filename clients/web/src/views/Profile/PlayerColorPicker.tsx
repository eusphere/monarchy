import * as React from 'react';
import { playerColorFamilies } from './playerColors';
import ColorPicker from '~/components/ColorPicker';
import styles from './index.module.css';

type Props = {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
};

const PlayerColorPicker = ({ color, onChange, onClose }: Props): React.ReactNode => {
  return <div className={styles.colorEditor} onKeyDown={event => {
    if (event.key === 'Escape') { event.preventDefault(); onClose(); }
  }}>
    <ColorPicker autoFocus families={playerColorFamilies} value={color} onChange={onChange} />
  </div>;
};
export default PlayerColorPicker;
