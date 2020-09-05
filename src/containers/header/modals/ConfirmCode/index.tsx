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
    message: "",
  });
  const Cell_Phone_context = useContext(cell_Phone_context);
  const Modal_context = useContext(modal_context);
  const AUTH_CONTEXT = useContext(Auth_context);

  const sendConfirmCode = (e) => {
    e.preventDefault();
    if (!code) {
      return;
    }
    setLoading(true);
    const DOMAIN = process.env.PRODUCTION_ENDPOINT;
    const SEND_CONFIRM_CODE = "/core/device/login";
    axios
      .post(DOMAIN + SEND_CONFIRM_CODE, {
        cell: Cell_Phone_context.cell_phone,
        code: code,
      })
      .then((response) => {
        setLoading(false);
        const cook_option = {
          expires: 100,
        };
        // If the user hasn't completed the registration
        if (response.data.token && !response.data.has_name) {
          const data = response.data;

          // save data in cache
          jsCookie.set("token", data.token, cook_option);
          jsCookie.set("phone", data.user_profile.cell, cook_option);
          jsCookie.set("complete_register", data.has_name, cook_option);
          jsCookie.set("name", " ", cook_option);
          jsCookie.set("user_id", data.user_profile.id, cook_option);

          // NOTE: save data in cache and active heap
          try {
            if (window["heap"]) {
              window["heap"].identify(`${data.user_profile.cell}`);
            }
          } catch (e) {
            console.log("Em...I think heap not work correctly :/");
          }
          Router.push({
            pathname: "/complete-register",
          });
        }
        // if user completely registered
        else if (response.data.token && response.data.has_name) {
          const data = response.data;
          jsCookie.set("token", data.token, cook_option);
          jsCookie.set("phone", data.user_profile.cell, cook_option);
          jsCookie.set("complete_register", data.has_name, cook_option);
          jsCookie.set("name", data.user_profile.name, cook_option);
          jsCookie.set(
            "company_name",
            data.user_profile.company_name,
            cook_option
          );
          jsCookie.set("user_id", data.user_profile.id, cook_option);
          jsCookie.set(
            "thumbnail_url",
            data.user_profile.thumbnail_url
              ? data.user_profile.thumbnail_url
              : "https://core.otoli.net/static/core/default_profile_pic.png",
            cook_option
          );
          // NOTE: activate heap
          try {
            if (window["heap"]) {
              window["heap"].identify(`${Cell_Phone_context.cell_phone}`);
              window["heap"].addUserProperties({
                Name: `${data.user_profile.first_name}-${data.user_profile.last_name}`,
              });
            }
          } catch (e) {
            console.log("Em...I think heap not work correctly :/");
          }
          // set authorize to auth context
          AUTH_CONTEXT.Auth_Manager(true);
        } else {
          // TODO: handle errors
          console.error("error");
        }
        if (!props.customModalControl) {
          Modal_context.modalHandler("SET");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "!Error",
          error.response ? error.response.data.message : error.message
        );
        setError({
          status: true,
          message: error.response.data.message,
        });
      });
  };

  // The user can switch to last step
  const Done = () => {
    setActiveAgain(true);
  };

  const clearField = () => {
    setCode("");
  };

  return (
    <div className="modal_box_div confirm_code">
      <form onSubmit={sendConfirmCode}>
        <TextInput
          error={error}
          name="code"
          onChangeHandler={(e) => {
            setCode(e);
          }}
          autoFocus={true}
          value={code}
          // min={4}
          // max={4}
          label="کد چهار رقمی که به موبایل شما اس‌ام‌اس شده را وارد کنید"
          placeholder="لطفا کد را وارد کنید"
          clearField={clearField}
          validation={{
            number: true,
            length: 4,
            messages: {
              required: "لطفا کد تایید را وارد کنید",
              length: "کد تایید باید 4 رقم باشد",
            },
            required: true,
          }}
        />
        {/* <span className="error_message">{error.message}</span> */}
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
        <Button
          class="Blue_BTN login_submit HEAP_ModalConfirmCode_Btn_Login"
          value="ورود"
          loading={loading}
          click={() => {}}
        />
      </form>
    </div>
  );
};

interface IConfirmCode {
  panelController: any;
  customModalControl?: boolean;
}
export default ConfirmCode;
