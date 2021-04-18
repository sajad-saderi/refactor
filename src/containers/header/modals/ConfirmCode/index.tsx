import React, { useState, useContext, useRef } from "react";
import cell_Phone_context from "../../../../context/Cell_Phone_context";
import modal_context from "../../../../context/Modal_context";
import axios from "axios";
import { useRouter } from "next/router";
import Button from "../../../../components/form/Button";
import CountDown from "../../../../components/countDown";
import NumberSeparatedTextInput from "../../../../components/form/NumberSeparatedTextInput";
import context_user from "../../../../context/User_info";
import jsCookie from "js-cookie";

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
  const buttonRef = useRef(null);
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
    axios
      .post(DOMAIN + SEND_CONFIRM_CODE, {
        cell: cellNumber,
        code: code,
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
            router.push({
              pathname: "/complete-register",
            });
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
            if (localStorage["last_location"] !== "/add-car")
              window.history.go(-1);
            else
              router.push({
                pathname: "/add-car",
              });
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
        setLoading(false);
        set_show_count_down(true);
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
    <div className='modal_box_div confirm_code'>
      <form onSubmit={sendConfirmCode}>
        <NumberSeparatedTextInput
          error={error}
          name='code'
          onChangeHandler={(e) => {
            setCode(e);
          }}
          value={code}
          label={`${language.text_input_label_1} ${Cell_Phone_context.cell_phone} ${language.text_input_label_2}`}
          validation={{
            number: true,
            length: 4,
            messages: {
              required: language.require,
              length: language.length,
            },
            required: true,
          }}
          tabToButton={() => buttonRef.current.focus()}
        />

        {/* <TextInput
          error={error}
          name="code"
          onChangeHandler={(e) => {
            setCode(e);
          }}
          autoFocus={true}
          value={code}
          // min={4}
          // max={4}
          label={language.text_input_label}
          placeholder={language.place_holder}
          clearField={clearField}
          validation={{
            number: true,
            length: 4,
            messages: {
              required: language.require,
              length: language.length,
            },
            required: true,
          }}
        /> */}
        {/* <span className="error_message">{error.message}</span> */}
        {/* <div className='go_back'>
          {ActiveAgain ? (
            <p onClick={() => panelController()} className='send_again'>
              {language.send_again}
            </p>
          ) : (
            <div className='Count_Down_text'>
              <span>{language.send_again}</span>{" "}
              <CountDown time={20} Done={Done} />{" "}
              <span>{language.seconds}</span>
            </div>
          )}
        </div> */}
        <div
          className={[
            "go_back",
            show_count_down ? "show_the_go_back_button" : null,
          ].join(" ")}
          onClick={() => panelController()}
        >
          {/* <p className="Edit_number">{language.edit_the_number}</p> */}
          {ActiveAgain ? (
            <p onClick={() => panelController()} className='send_again'>
              {language.send_again}
            </p>
          ) : (
            <div className='Count_Down_text'>
              <span>{language.send_again}</span>{" "}
              <CountDown time={20} Done={Done} />{" "}
              <span>{language.seconds}</span>
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
          value={language.enter}
          loading={loading}
          click={() => {}}
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
