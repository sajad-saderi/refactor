import { ISpinner } from '../../../types';
import styles from './spinner.module.scss';

const Spinner = ({ display, color, width }: ISpinner) => {
  return (
    <span
      data-test-id='span'
      style={{
        display: display,
        borderTopColor: color,
        borderBottomColor: color,
        width: width + 'px',
        height: width + 'px'
      }}
      className={styles.loading}></span>
  );
};

export default Spinner;
