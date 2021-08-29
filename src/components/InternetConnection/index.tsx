import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CountDown from "../countDown";

const InternetConnection = () => {
  const [time, setTime] = useState(5);
  const [startTimer, setStartTimer] = useState(true);
  let coefficient = 5;
  let timeTocheckNet;
  const router = useRouter();

  useEffect(() => {
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
    <div>
      <p>دستگاه شما به اینترنت متصل نیست.</p>
      {startTimer ? (
        <p>
          بررسی خودکار اتصال به شبکه تا{" "}
          {<CountDown time={time} Done={checkTheConnection} />} ثانیه دیگر{" "}
        </p>
      ) : null}
      {time > 5 && <p onClick={checkTheConnection}>بررسی مجدد</p>}
    </div>,
    document.getElementById("portal_notification")
  );
};

export default InternetConnection;
