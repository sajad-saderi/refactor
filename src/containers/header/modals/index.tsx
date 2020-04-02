import React, { useContext, useState } from "react";
import GetUserCellPhone from "./GetUserCellPhone";
import ConfirmCode from "./ConfirmCode";
import modal_context from "../../../context/Modal_context";
import { IoMdClose } from "react-icons/io";
import TellMe from "./Tell_me";
import Renter from "./Renter";
import Owner from "./Owner";

const Modals = props => {
  const [change, setChange] = useState(false);
  const Modal_context = useContext(modal_context);

  const panelController = () => {
    setChange(!change);
  };

  return (
    <div className="Modal">
      <div
        className={[
          "modal_box",
          props.modal_type === "Login"
            ? "login_modal"
            : props.modal_type === "TellMe"
            ? "Tell_me"
            : props.modal_type === "Renter"
            ? "Renter"
            : props.modal_type === "Owner"
            ? "Owner"
            : null
        ].join(" ")}
      >
        <div className="modal_box_div">
          <IoMdClose
            color="rgb(165, 165, 165)"
            size="2rem"
            onClick={() => Modal_context.modalHandler()}
          />
        </div>
        {props.modal_type === "Login" ? (
          change ? (
            <ConfirmCode panelController={panelController} />
          ) : (
            <GetUserCellPhone panelController={panelController} />
          )
        ) : props.modal_type === "TellMe" ? (
          <TellMe />
        ) : props.modal_type === "Renter" ? (
          <Renter data={props.data} />
        ) : props.modal_type === "Owner" ? (
          <Owner data={props.data} />
        ) : null}
      </div>
      <div className="back_draw" onClick={() => Modal_context.modalHandler()} />
    </div>
  );
};

export default Modals;
