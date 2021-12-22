import { useState, useContext, useRef } from "react";
import cell_Phone_context from "../../../../context/Cell_Phone_context";
import modal_context from "../../../../context/Modal_context";
import toast_context from "../../../../context/Toast_context";
import axios from "axios";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("../../../../components/form/Button"));
const CountDown = dynamic(() => import("../../../../components/countDown"));
const NumberSeparatedTextInput = dynamic(() =>
  import("../../../../components/form/NumberSeparatedTextInput")
);
// import Button from "../../../../components/form/Button";
// import CountDown from "../../../../components/countDown";
// import NumberSeparatedTextInput from "../../../../components/form/NumberSeparatedTextInput";
import context_user from "../../../../context/User_info";
import jsCookie from "js-cookie";
import Error_middleware from "../../../../API/ApiUtils";
import ErrorHelper from "../../../../../utils/error_helper";
import { dynamicString } from '../../../../helpers/dynamicString';
import languageCTX from "../../../../context/languageCTX";

const ConfirmCode = ({
  panelController,
  language,
  deactivate_form,
  customModalControl,
}: IConfirmCode) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [show_count_down, set_show_count_down] = useState(false);
  const [ActiveAgain, setActiveAgain] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const Cell_Phone_context = useContext(cell_Phone_context);
  const Modal_context = useContext(modal_context);
  const router = useRouter();
  const user = useContext(context_user);
  const toastCTX = useContext(toast_context);
  const buttonRef = useRef(null);
  const { activeLanguage } = useContext(languageCTX);

  const sendConfirmCode = (e) => {
    e.preventDefault();
    if (!code) {
      return;
    }
    setLoading(true);
    const DOMAIN = process.env.PRODUCTION_ENDPOINT;
    const SEND_CONFIRM_CODE = "/core/device/login";
    let cellNumber = Cell_Phone_context.cell_phone;
    if (/^[9][0-9][0-9]{8,8}$/.test(cellNumber)) {
      cellNumber = "0" + Cell_Phone_context.cell_phone;
    }
    let utm = sessionStorage["send_utm_data"]
      ? {
        utm_source: localStorage["utm_source"]
          ? localStorage["utm_source"]
          : "",
        utm_medium: localStorage["utm_medium"]
          ? localStorage["utm_medium"]
          : "",
        utm_campaign: localStorage["utm_campaign"]
          ? localStorage["utm_campaign"]
          : "",
        utm_referrer: localStorage["utm_referrer"]
          ? localStorage["utm_referrer"]
          : "",
        utm_term: localStorage["utm_term"] ? localStorage["utm_term"] : "",
        utm_content: localStorage["utm_content"]
          ? localStorage["utm_content"]
          : "",
        utm_landing_url: localStorage["utm_landing_url"]
          ? localStorage["utm_landing_url"]
          : "",
      }
      : {};
    axios
      .post(DOMAIN + SEND_CONFIRM_CODE, {
        cell: cellNumber,
        code: code,
        ...utm,
      })
      .then((response) => {
        // setLoading(false);
        const cook_option = {
          expires: 100,
        };
        if (response.data.token) {
          // If the user hasn't completed the registration
          const data = response.data;
          if (!data.user_profile.first_name) {
            // save data in cache
            window["complete_register"] = false;
            // NOTE: save data in cache and active heap
            try {
              if (window["heap"]) {
                window["heap"].identify(`${cellNumber}`);
              }
            } catch (e) {
              console.log("Em...I think heap is not work correctly :/");
            }
            router.replace({
              pathname: "/complete-register",
            }, undefined, { locale: activeLanguage });
          }
          // if user completely registered
          else {
            jsCookie.set(
              "first_name",
              data.user_profile.first_name,
              cook_option
            );
            window["complete_register"] = true;
            // NOTE: activate heap
            try {
              if (window["heap"]) {
                window["heap"].identify(`${cellNumber}`);
                window["heap"].addUserProperties({
                  Name: `${data.user_profile.first_name}-${data.user_profile.last_name}`,
                });
              }
            } catch (e) {
              console.log("Em...I think heap is not work correctly :/");
            }
            if (localStorage["last_location"] !== "/add-car") {
              const url = decodeURIComponent(localStorage["last_location"]);

              router.replace(url, undefined, { locale: activeLanguage });
            }
            else
              router.replace({
                pathname: "/add-car",
              }, undefined, { locale: activeLanguage });
            // router.push(
            //   localStorage["last_location"]
            //     ? localStorage["last_location"]
            //     : "/"
            // );
          }
          jsCookie.set("token", response.data.token, cook_option);
          jsCookie.set("user_id", data.user_profile.id, cook_option);
          user.update_user_data({
            ...data.user_profile,
            token: response.data.token,
          });
          // set authorize to auth context
          window["auth"] = true;
        } else {
          // TODO: handle errors
          console.error("error");
        }
        if (!customModalControl) {
          Modal_context.modalHandler("SET");
        }
      })
      .catch((error) => {
        Error_middleware(e);
        setLoading(false);
        set_show_count_down(true);
        if (
          error.response.data.error === "INVALID_CODE" ||
          error.response.data.error === "EXPIRED_CODE"
        ) {
          setError({
            status: true,
            message: error.response.data.message,
          });
        } else
          toastCTX.toast_option({
            message: error.response
              ? ErrorHelper({
                errorObj: error.response,
                _400Message: language.COMMON.errorInSendingCode,
              })
              : error,
            color: "#ed9026",
            time: 0,
            autoClose: false,
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
    <div className="modal_box_div confirm_code" dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}>
      <form onSubmit={sendConfirmCode}>
        <NumberSeparatedTextInput
          error={error}
          name="code"
          onChangeHandler={(e) => {
            setCode(e);
          }}
          value={code}
          label={dynamicString([Cell_Phone_context.cell_phone], language.LOGIN.label)}
          validation={{
            number: true,
            length: 4,
            messages: {
              required: language.LOGIN.error4,
              length: language.LOGIN.error5,
            },
            required: true,
          }}
          tabToButton={() => buttonRef.current.focus()}
        />
        <div
          className={[
            "go_back",
            show_count_down ? "show_the_go_back_button" : null,
          ].join(" ")}
          onClick={() => panelController()}
        >
          {/* <p className="Edit_number">{language.edit_the_number}</p> */}
          {ActiveAgain ? (
            <p onClick={() => panelController()} className="send_again">
              {language.LOGIN.tryagain}
            </p>
          ) : (
            <div className="Count_Down_text">
              <span>{language.LOGIN.tryagain}</span>{" "}
              <CountDown time={20} Done={Done} />{" "}
              <span>{language.COMMON.seconds}</span>
            </div>
          )}
        </div>
        <Button
          reference={buttonRef}
          disable={deactivate_form}
          class={[
            "Blue_BTN login_submit HEAP_ModalConfirmCode_Btn_Login",
            deactivate_form ? "disable_BTN" : null,
          ].join(" ")}
          value={language.LOGIN.enter}
          loading={loading}
          click={() => { }}
        />
      </form>
    </div>
  );
};

interface IConfirmCode {
  panelController: any;
  language: any;
  customModalControl?: boolean;
  deactivate_form: boolean;
}
export default ConfirmCode;
