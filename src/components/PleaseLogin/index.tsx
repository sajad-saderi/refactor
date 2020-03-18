import React, { useContext, useEffect } from "react";
import "./please_login_module.scss";
import login from "../../../public/image/login.png";
import Modal_context from "../../../src/context/Modal_context";

const PleaseLogin = () => {
  const MODAL_CONTEXT = useContext(Modal_context);

  return (
    <div className="Please_login_container">
      <div>
        <img src={login} alt="please log in" />
        <p>برای دسترسی به این بخش، لطفا ابتدا وارد شوید.</p>
      </div>
      <button
        className="Blue_BTN costume_btn_style"
        onClick={() => MODAL_CONTEXT.modalHandler("Login")}
      >
        ورود
      </button>
    </div>
  );
};
export default PleaseLogin;
