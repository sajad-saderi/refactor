import React from "react";
import Menu from "./menu";
import Modal from "./modals";
import * as logo from "../../../public/logo_sticky.svg";
import "./header.module.scss";
const Header = () => {
  return (
    <header>
      <a>
        <img src={logo} alt="اتولی لوگو" />
      </a>
      <Modal />
      <div className="Nav">
        <Menu />
      </div>
    </header>
  );
};

export default Header;
