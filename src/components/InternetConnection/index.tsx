import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import ReactDOM from 'react-dom';
import CountDown from '../countDown';
import toast_context from '../../context/Toast_context';
import Icon from '../Icons';
import styles from './internetConnection.module.scss';

const InternetConnection = ({ language }) => {
  const [time, setTime] = useState(5);
  const [startTimer, setStartTimer] = useState(true);
  const toastCTX = useContext(toast_context);

  let coefficient = 5;
  let timeTocheckNet;
  const router = useRouter();

  useEffect(() => {
    toastCTX.show_toast = false;
    return () => {
      coefficient = 5;
      clearTimeout(timeTocheckNet);
    };
  }, []);

  const checkTheConnection = () => {
    setStartTimer(false);
    timeTocheckNet = setTimeout(() => {
      if (!window.navigator.onLine) {
        setStartTimer(true);
        coefficient = 5 + coefficient;
        setTime((time) => time + coefficient);
      } else {
        router.reload();
      }
    }, 1000);
    timeTocheckNet = null;
  };

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.content}>
        <Icon name='warning' width='20px' height='20px' color='#ec7f00' />
        <div>
          <p>{language.COMMON.youDeviceIsNotConnected}</p>
          {startTimer ? (
            <p className={styles.automaticRetry}>
              {language.COMMON.checkingConnectionLater}{' '}
              {<CountDown time={time} Done={checkTheConnection} />}{' '}
              {language.COMMON.seconds}.
            </p>
          ) : (
            <p className={styles.automaticRetry}>
              {language.COMMON.checkInternetConnection}...
            </p>
          )}
        </div>
      </div>
      <p className={styles.retry} onClick={checkTheConnection}>
        <Icon name='refresh' width='20px' height='20px' color='#3fa6da' />
        {language.COMMON.checkConnection}
      </p>
    </div>,
    document.getElementById('portal_notification')
  );
};

export default InternetConnection;
