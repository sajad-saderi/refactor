import React, { useState } from "react";
import Menu from "./menu";
import Modal from "./modals";
// import "./header.scss";
// import * as logo from "../../../public/logo_sticky.svg";
import * as logo from "../../../public/logo.svg";
import * as car from "../../../public/car_logo.svg";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";

const Header = (props: IHeader) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className='header'>
      <article className='responsive header_container'>
        <section className='Logo'>
          <Link href='/' prefetch={false}>
            <a>
              <img className='car_logo' src={car} alt='سپریس لوگو خودکار' />
              <img className='text_logo' src={logo} alt='سپریس لوگو' />
            </a>
          </Link>
        </section>
        {/* logo section */}
        <section className={["Nav", showMenu ? "showMenu" : null].join(" ")}>
          <Menu />
        </section>
        {/* <section className="header_menu_bar" onClick={() => setShowMenu(true)}>
          <IoIosMenu size="3rem" color="#fff" />
        </section> */}
        {/* <div
          onClick={() => setShowMenu(false)}
          className={showMenu ? "show_menu_drawer" : "hide_menu_drawer"}
        /> */}
        {/* Menu Links */}
      </article>
      {/* NOTE Models */}
      {props.Show_Modal && (
        <Modal modal_type={props.modalType} data={props.data} />
      )}
    </header>
  );
};

interface IHeader {
  // control appearance of modal
  Show_Modal: boolean;
  // set the modal type
  modalType: string;
  // data we need in rate modals
  data?: any;
}

export default Header;
