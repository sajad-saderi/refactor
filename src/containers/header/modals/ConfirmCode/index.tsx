import React, { useState, useContext } from "react";
import TextInput from "../../../../components/form/TextInput";
import cell_Phone_context from "../../../../context/Cell_Phone_context";
import axios from "axios";
import Router from "next/router";
import jsCookie from "js-cookie";

const ConfirmCode = () => {
  const [code, setCode] = useState("");
  const Cell_Phone_context = useContext(cell_Phone_context);
  const sendConfirmCode = e => {
    e.preventDefault();

    const DOMAIN = process.env.PRODUCTION_ENDPOINT;
    const SEND_CONFIRM_CODE = "/core/device/login";
    axios
      .post(DOMAIN + SEND_CONFIRM_CODE, {
        cell: Cell_Phone_context.cell_phone,
        code: code
      })
      .then(response => {
        if (response.data.token && !response.data.has_name) {
          //TODO:   save Data on cache and add heap to project

          // actions.signin({
          //   user_id: response.data.user_profile.id,
          //   token: response.data.token,
          //   phone: this.state.phone,
          //   // =====>
          //   complete_register: false
          //   // =====>
          // });

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
          jsCookie.set("token", data.token);
          jsCookie.set("phone", data.user_profile.cell);
          jsCookie.set("complete_register", data.has_name);
          jsCookie.set("first_name", data.user_profile.name);
          jsCookie.set("last_name", data.user_profile.last_name);
          jsCookie.set("company_name", data.user_profile.company_name);
          jsCookie.set("user_id", data.user_profile.id);
          jsCookie.set("thumbnail_url", data.user_profile.thumbnail_url);
          // TODO: save data in cache and active heap
          //       if(window.heap){
          //         window.heap.identify(`${this.state.phone}`);
          //         window.heap.addUserProperties({Name: `${response2.data.data.first_name}-${response2.data.data.last_name}`});
          //         console.log('window.heap',this.state.phone);
          //       }

          console.log(response.data);
        } else {
          // TODO: handle errors
          console.error("error");
        }
      })
      .catch(error => {
        console.error("Error in LoginModal Happend:");
        console.error(error.response.data);
      });
  };

  return (
    <>
      <form onSubmit={sendConfirmCode}>
        <TextInput
          name="code"
          onChangeHandler={e => {
            setCode(e);
          }}
          value={code}
          min={4}
          max={4}
        />
        <button>ورود</button>
      </form>
    </>
  );
};

export default ConfirmCode;
