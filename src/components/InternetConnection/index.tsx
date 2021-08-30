import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import ReactDOM from "react-dom";
import CountDown from "../countDown";
import { IoIosWarning, IoMdRefresh } from "react-icons/io";
import toast_context from "../../context/Toast_context";

const InternetConnection = () => {
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
    <div className="internet-connection">
      <p>
        <IoIosWarning size="2rem" color="" />
        دستگاه شما به اینترنت متصل نیست.
      </p>
      {startTimer ? (
        <p className="automatic-retry">
          بررسی خودکار اتصال به شبکه تا{" "}
          {<CountDown time={time} Done={checkTheConnection} />} ثانیه دیگر{" "}
        </p>
      ) : null}
      {time > 5 && (
        <p className="retry" onClick={checkTheConnection}>
          <IoMdRefresh size="2rem" color="" />
          بررسی مجدد
        </p>
      )}
    </div>,
    document.getElementById("portal_notification")
  );
};

export default InternetConnection;
