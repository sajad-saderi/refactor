import React, { useContext, useEffect } from "react";
// import "./please_login.scss"; 
import Modal_context from "../../../src/context/Modal_context";
import { FiLogIn } from "react-icons/fi";

const PleaseLogin = () => {
  const MODAL_CONTEXT = useContext(Modal_context);

  return (
    <div className="Please_login_container minHeight">
      <div> 
        <FiLogIn color="#4ba3ce" size="3rem"/>
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
