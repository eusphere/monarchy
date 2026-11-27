import { colorForeground } from './colorForeground';
import styles from './index.module.css';

type Props = { username: string; color: string; size?: 'small' | 'large' };

const PlayerAvatar = ({ username, color, size = 'small' }: Props) => (
  <span aria-hidden='true' className={`${styles.avatar} ${styles[size]}`}
    style={{ backgroundColor: color, color: colorForeground(color) }}>
    {username.trim().slice(0, 2).toUpperCase() || '??'}
  </span>
);

export default PlayerAvatar;
