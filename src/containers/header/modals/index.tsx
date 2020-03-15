import React, { useContext } from "react";
import GetUserCellPhone from "./GetUserCellPhone";
import ConfirmCode from "./ConfirmCode";
import modal_context from "../../../context/Modal_context";

const Modals = props => {
  const Modal_context = useContext(modal_context);

  return (
    <div className="Modal" onClick={() => Modal_context.modalHandler()}>
      {props.modal_type === "Login" && (
        <>
          <GetUserCellPhone />
          <ConfirmCode />
        </>
      )}
    </div>
  );
};

export default Modals;
