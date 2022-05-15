import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import ReactDOM from "react-dom";
import CountDown from "../countDown";
import { IoMdRefresh } from "react-icons/io";
import Icon from "../../../utils/Icon";
import toast_context from "../../context/Toast_context";

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
    <div className={`internet-connection ${router.locale === 'fa' ? '' : 'internetConnectionLtr'}`}>
      <Icon name="warning" />
      <div>
        <p>{language.COMMON.youDeviceIsNotConnected}</p>
        {startTimer ? (
          <p className="automatic-retry">
            {language.COMMON.checkingConnectionLater}{" "}
            {<CountDown time={time} Done={checkTheConnection} />} {language.COMMON.seconds}.
          </p>
        ) : (
          <p className="automatic-retry">{language.COMMON.checkInternetConnection}...</p>
        )}
      </div>
      <p className="retry" onClick={checkTheConnection}>
        <IoMdRefresh size="20px" color="" />
        {language.COMMON.checkConnection}
      </p>
    </div>,
    document.getElementById("portal_notification")
  );
};

export default InternetConnection;
