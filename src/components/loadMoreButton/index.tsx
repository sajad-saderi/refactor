import React from 'react';
import Icon from '../Icons';
import Spinner from '../Spinner';
import styles from './index.module.scss';

const LoadMoreButton: React.FC<{
  text: string;
  click: () => void;
  loading: boolean;
}> = ({ click, text, loading }) => {
  return (
    <button className={styles.container} onClick={click}>
      {loading ? (
        <Spinner display='block' width={20} color='#9E9E9E' />
      ) : (
        <span>
          {text}
          <Icon
            name='chevronUp'
            rotate={180}
            width='20px'
            height='20px'
            color='#6e6e6e'
          />
        </span>
      )}
    </button>
  );
};

export default LoadMoreButton;
