import React from "react";
import { IoMdClose } from "react-icons/io";

const Toast = (props: IToast) => {
  return (
    <div className="toast_container">
      <div className="toast_div">
        <IoMdClose
          size="2rem"
          color="#fafafa"
          onClick={() => props.closeHandler()}
        />
        <p className="message">
          خودروی آریسان شما در نتایج جستجو نمایش داده خواهد شد.
        </p>
        <span
          style={{
            animationDuration: `${props.time}s`,
          }}
          className="time_bar"
        ></span>{" "}
      </div>
    </div>
  );
};

interface IToast {
  message: string;
  closeHandler: any;
  time?: number;
}

export default Toast;
