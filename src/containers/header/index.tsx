import React, { useReducer, useState } from "react";
import Menu from "./menu";
import Modal from "./modals";
import * as logo from "../../../public/logo_sticky.svg";
import "./header.module.scss";

import modal_context from "../../context/Modal_context";

const ShowModalReducer = (current, action) => {
  if (action.type === "SET") return !current;
};

const Header = () => {
  const [modalType, setModalType] = useState("Login");
  const [Show_Modal, dispatch] = useReducer(ShowModalReducer, false);

  const modal_handler = type => {
    dispatch({ type: "SET" });
    setModalType(type);
  };

  return (
    <header className="header">
      <modal_context.Provider
        value={{
          show_modal: Show_Modal,
          modalHandler: type => {
            modal_handler(type);
          }
        }}
      >
        <article className="responsive">
          <section className="Logo">
            <a>
              <img src={logo} alt="اتولی لوگو" />
            </a>
          </section>
          <section className="Nav">
            <Menu />
          </section>
        </article>
        {Show_Modal && <Modal modal_type={modalType} />}
      </modal_context.Provider>
    </header>
  );
};

export default Header;
