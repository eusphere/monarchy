import { formatRatingDelta } from '~/util/format';
import styles from './index.module.css';

type Props = {
  value: number;
};

const RatingDelta = ({ value }: Props) => (
  <span
    className={value > 0 ? styles.positive : value < 0 ? styles.negative : undefined}
  >
    {formatRatingDelta(value)}
  </span>
);

export default RatingDelta;
