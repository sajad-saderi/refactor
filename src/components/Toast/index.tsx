import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

let setTimer = null;

const Toast = (props: IToast) => {
  useEffect(() => {
    if (props.autoClose) {
      setTimer = setTimeout(() => props.closeHandler(), props.time*1000+500);
    }
    return () => {
      clearTimeout(setTimer);
    };
  }, []);

  return (
    <div className="toast_container">
      <div className="toast_div">
        <IoMdClose
          size="2rem"
          color="#fafafa"
          onClick={() => props.closeHandler()}
        />
        <p className="message">{props.message}</p>
        <span
          style={{
            animationDuration: `${props.time}s`,
          }}
          className="time_bar"
        ></span>
      </div>
    </div>
  );
};

interface IToast {
  message: string;
  closeHandler: any;
  time?: number;
  autoClose?: boolean;
}

export default Toast;
