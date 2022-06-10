import classNames from 'classnames';
import { IButton } from '../../../../types';
import Spinner from '../../Spinner';
import styles from './buttons.module.scss';

const Button = ({
  value,
  customClass,
  loading,
  disable,
  click,
  reference
}: IButton) => {
  return (
    <button
      ref={reference}
      className={classNames(styles.button, customClass)}
      disabled={disable || loading}
      onClick={click}>
      {loading ? <Spinner display='block' width={20} color='#fefefe' /> : value}
    </button>
  );
};

export default Button;
