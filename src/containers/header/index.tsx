import React, { useState } from "react";
import Menu from "./menu";
import Modal from "./modals";
import * as logo from "../../../public/logo_sticky.svg";
// import "./header.scss";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";

const Header = (props: IHeader) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="header">
      <article className="responsive">
        <section className="Logo">
          <Link href="/">
            <a>
              <img src={logo} alt="اتولی لوگو" />
            </a>
          </Link>
        </section>
        {/* <section className="header_menu_bar" onClick={() => setShowMenu(true)}>
          <IoIosMenu size="3rem" color="#fff" />
        </section> */}
        {/* <div
          onClick={() => setShowMenu(false)}
          className={showMenu ? "show_menu_drawer" : "hide_menu_drawer"}
        /> */}
        <section className={["Nav", showMenu ? "showMenu" : null].join(" ")}>
          <Menu />
        </section>
      </article>
      {props.Show_Modal && (
        <Modal modal_type={props.modalType} data={props.data} />
      )}
    </header>
  );
};

interface IHeader {
  Show_Modal: boolean;
  modalType: string;
  data?: any;
}

export default Header;
