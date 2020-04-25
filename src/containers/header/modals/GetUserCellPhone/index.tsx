import React, { useState, useContext } from "react";
import TextInput from "../../../../components/form/TextInput";
import axios from "axios";
import cell_Phone_context from "../../../../context/Cell_Phone_context";
// import "./userCellphone.scss";
import Button from "../../../../components/form/Button";

const GetUserCellPhone = (props: IGetUserCellPhone) => {
  const [cellPhone, setCellPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: ""
  });
  const Cell_Phone_context = useContext(cell_Phone_context);

  const sendConfirmCode = e => {
    e.preventDefault();
    setLoading(true);
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
          setLoading(false);
          props.panelController();
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

  const clearField = () => {
    setCellPhone("");
  };

  return (
    <>
      <div className="modal_box_div">
        <form onSubmit={sendConfirmCode}>
          <TextInput
            error={error}
            name="cell Phone"
            onChangeHandler={e => {
              setCellPhone(e);
            }}
            autoFocus={true}
            value={cellPhone}
            min={11}
            max={11}
            label="شماره تلفن همراه"
            placeholder="لطفا شماره همراه خود را وارد کنید"
            clearField={clearField}
          />
          <span className="error_message">{error.message}</span>
          <Button
            class="Blue_BTN login_submit"
            value="ارسال کد ورود"
            loading={loading}
            click={() => {}}
          />
        </form>
      </div>
    </>
  );
};

interface IGetUserCellPhone {
  panelController: any;
}

export default GetUserCellPhone;
