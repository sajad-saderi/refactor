import React, { useContext, useEffect, useState } from "react";
// import "./please_login.scss";
// import Modal_context from "../../context/Modal_context";

import GetUserCellPhone from "../../containers/header/modals/GetUserCellPhone";
import ConfirmCode from "../../containers/header/modals/ConfirmCode";
import Icon from "../Icons";

const PleaseLogin = ({ language }: IPleaseLogin) => {
  const [change, setChange] = useState(false);
  // const MODAL_CONTEXT = useContext(Modal_context);
  const panelController = () => {
    setChange(!change);
  };

  return (
    <div className="Please_login_container minHeight">
      {/* {!change ? (
        <div className="caption">
          <FiLogIn color="#4ba3ce" size="30px" />
          <p>برای دسترسی به این بخش، ابتدا وارد شوید.</p>
        </div>
      ) : null} */}
      <div
        className={["modal_box", change ? "confirm_code" : "login_modal"].join(
          " "
        )}
      >
        {change ? (
          <div className="login_modal_title_confirm_code">
            <span onClick={panelController} className="login_person_icon">
              <Icon
                name="chevronUp"
                rotate={90}
                width="20px"
                height="20px"
                color="#4ba3ce"
              />
            </span>
            <h2>{language.ConfirmCode.confirm_code_title}</h2>
          </div>
        ) : (
          <div className="login_modal_title">
            <span className="login_person_icon">
              <Icon name="avatar" width="20px" height="20px" color="#fff" />
            </span>
            <h2>{language.GetUserCellPhone.log_sigh}</h2>
          </div>
        )}
        {/* {change ? (
          <ConfirmCode
            language={language.ConfirmCode}
            panelController={panelController}
            customModalControl={true}
          />
        ) : (
          <GetUserCellPhone
            language={language.GetUserCellPhone}
            data-test-id='GetUserCellPhone'
            panelController={panelController}
          />
        )} */}
      </div>
    </div>
  );
};

interface IPleaseLogin {
  language: any;
}
export default PleaseLogin;
