import React, { useState, useContext } from "react";
import TextInput from "../../../../components/form/TextInput";
import axios from "axios";
import cell_Phone_context from "../../../../context/Cell_Phone_context";

const GetUserCellPhone = () => {
  const [cellPhone, setCellPhone] = useState("");
  const Cell_Phone_context = useContext(cell_Phone_context);
  const sendConfirmCode = e => {
    e.preventDefault();

    const DOMAIN = process.env.PRODUCTION_ENDPOINT;
    const SEND_CONFIRM_CODE = "/core/device/send-code";
    axios
      .post(DOMAIN + SEND_CONFIRM_CODE, {
        cell: cellPhone,
        utm_source: localStorage["utm_source"]
          ? localStorage["utm_source"]
          : "",
        utm_medium: localStorage["utm_medium"]
          ? localStorage["utm_medium"]
          : "",
        utm_campaign: localStorage["utm_campaign"]
          ? localStorage["utm_campaign"]
          : "",
        utm_term: localStorage["utm_term"] ? localStorage["utm_term"] : "",
        utm_content: localStorage["utm_content"]
          ? localStorage["utm_content"]
          : "",
        utm_landing_url: localStorage["utm_landing_url"]
          ? localStorage["utm_landing_url"]
          : ""
      })
      .then(response => {
        if (response.data.success) {
          Cell_Phone_context.cell_phone = cellPhone;
          console.log(response.data);
        }
      })
      .catch(error => {
        console.error("Error in LoginModal Happend:");
        console.error(error.response.data);
      });
    console.log("logloglog");
  };

  return (
    <>
      <form onSubmit={sendConfirmCode}>
        <TextInput
          name="cell Phone"
          onChangeHandler={e => {
            setCellPhone(e);
          }}
          value={cellPhone}
          min={11}
          max={11}
        />
        <button>ارسال کد ورود</button>
      </form>
    </>
  );
};

export default GetUserCellPhone;
