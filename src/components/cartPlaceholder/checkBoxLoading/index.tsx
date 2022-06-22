import React from 'react';
import styles from './checkBoxLoading.module.scss';

const CheckBox_Loader: React.FC<{ width: string }> = ({ width }) => {
  return (
    <label
      className={styles.checkBoxLoader}
      style={{
        width: width
      }}>
      <p className='FadeInOutAnimation' />
      <span className='Gradient'></span>
    </label>
  );
};

export default CheckBox_Loader;
