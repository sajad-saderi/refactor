import React, { useState, useContext } from "react";
import TextInput from "../../../../components/form/TextInput";
import cell_Phone_context from "../../../../context/Cell_Phone_context";
import modal_context from "../../../../context/Modal_context";
import Auth_context from "../../../../context/Auth_context";
import axios from "axios";
import Router from "next/router";
import jsCookie from "js-cookie";
import Button from "../../../../components/form/Button";
import CountDown from "../../../../components/countDown";

const ConfirmCode = (props: IConfirmCode) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [ActiveAgain, setActiveAgain] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: ""
  });
  const Cell_Phone_context = useContext(cell_Phone_context);
  const Modal_context = useContext(modal_context);
  const AUTH_CONTEXT = useContext(Auth_context);
  const sendConfirmCode = e => {
    e.preventDefault();

    setLoading(true);
    const DOMAIN = process.env.PRODUCTION_ENDPOINT;
    const SEND_CONFIRM_CODE = "/core/device/login";
    axios
      .post(DOMAIN + SEND_CONFIRM_CODE, {
        cell: Cell_Phone_context.cell_phone,
        code: code
      })
      .then(response => {
        setLoading(false);
        Modal_context.modalHandler("SET");
        if (response.data.token && !response.data.has_name) {
          const data = response.data;
          jsCookie.set("token", data.token);
          jsCookie.set("phone", data.user_profile.cell);
          jsCookie.set("complete_register", data.has_name);
          jsCookie.set("user_id", data.user_profile.id);

          // TODO: save data in cache and active heap
          // if(window.heap){
          //   window.heap.identify(`${this.state.phone}`);
          //   console.log('window.heap',this.state.phone);
          // }

          Router.push(
            {
              pathname: "/complete-register"
            },
            {
              pathname: "/complete-register"
            }
          );
        } else if (response.data.token && response.data.has_name) {
          const data = response.data;
          const cook_option = {
            expires: 100
          };
          jsCookie.set("token", data.token, cook_option);
          jsCookie.set("phone", data.user_profile.cell, cook_option);
          jsCookie.set("complete_register", data.has_name, cook_option);
          jsCookie.set("first_name", data.user_profile.name, cook_option);
          jsCookie.set("last_name", data.user_profile.last_name, cook_option);
          jsCookie.set(
            "company_name",
            data.user_profile.company_name,
            cook_option
          );
          jsCookie.set("user_id", data.user_profile.id, cook_option);
          jsCookie.set(
            "thumbnail_url",
            data.user_profile.thumbnail_url,
            cook_option
          );
          // TODO: save data in cache and active heap
          //       if(window.heap){
          //         window.heap.identify(`${this.state.phone}`);
          //         window.heap.addUserProperties({Name: `${response2.data.data.first_name}-${response2.data.data.last_name}`});
          //         console.log('window.heap',this.state.phone);
          //       }
          AUTH_CONTEXT.Auth_Manager(true);
          console.log(response.data);
        } else {
          // TODO: handle errors
          console.error("error");
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error.response.data);
        setError({
          status: true,
          message: error.response.data.message
        });
      });
  };

  const Done = () => {
    setActiveAgain(true);
  };

  const clearField = () => {
    setCode("");
  };

  return (
    <div className="modal_box_div">
      <form onSubmit={sendConfirmCode}>
        <TextInput
          error={error}
          name="code"
          onChangeHandler={e => {
            setCode(e);
          }}
          autoFocus={true}
          value={code}
          min={4}
          max={4}
          label="کد چهار رقمی که به موبایل شما اس‌ام‌اس شده را وارد کنید"
          placeholder="لطفا کد را وارد کنید"
          clearField={clearField}
        />
        <span className="error_message">{error.message}</span>
        <div className="go_back">
          {ActiveAgain ? (
            <p onClick={() => props.panelController()} className="send_again">
              ارسال مجدد
            </p>
          ) : (
            <div className="Count_Down_text">
              <span>ارسال مجدد</span> <CountDown time={20} Done={Done} />{" "}
              <span>ثانیه</span>
            </div>
          )}
        </div>
        <div className="go_back" onClick={() => props.panelController()}>
          <p className="Edit_number">ویرایش شماره</p>
        </div>
        <Button class="Blue_BTN login_submit" value="ورود" loading={loading} />
      </form>
    </div>
  );
};

interface IConfirmCode {
  panelController: any;
}
export default ConfirmCode;
