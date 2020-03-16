import React, { useContext, useState } from "react";
import GetUserCellPhone from "./GetUserCellPhone";
import ConfirmCode from "./ConfirmCode";
import modal_context from "../../../context/Modal_context";
import { IoMdClose } from "react-icons/io";

const Modals = props => {
  const [change, setChange] = useState(false);
  const Modal_context = useContext(modal_context);

  const panelController = () => {
    setChange(!change);
  };

  return (
    <div className="Modal">
      {props.modal_type === "Login" && (
        <div className="modal_box login_modal">
          <div className="modal_box_div">
            <IoMdClose
              color="rgb(165, 165, 165)"
              size="2rem"
              onClick={() => Modal_context.modalHandler()}
            />
          </div>
          {!change ? (
            <ConfirmCode panelController={panelController} />
          ) : (
            <GetUserCellPhone panelController={panelController} />
          )}
        </div>
      )}
      <div className="back_draw" onClick={() => Modal_context.modalHandler()} />
    </div>
  );
};

export default Modals;
