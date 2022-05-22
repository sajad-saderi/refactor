import React, { useContext, useState } from "react";
import Menu from "./menu";
import Modal from "./modals";
// import "./header.scss";
// import * as logo from "../../../public/logo_sticky.svg";
import * as logo from "../../../public/logo.svg";
import logo_en from "../../../public/logo_en.svg";
import car from "../../../public/car_logo.svg";
import Link from "next/link";
import languageCTX from "../../context/languageCTX";
import Image from "next/image";

const Header = ({ language, Show_Modal, modalType, data }: IHeader) => {
  const [showMenu, setShowMenu] = useState(false);
  const { activeLanguage } = useContext(languageCTX);
  return (
    <header className='header' dir={activeLanguage === "fa" ? "rtl" : "ltr"}>
      <article className='responsive header_container'>
        <section className='Logo'>
          <Link href='/' prefetch={false}>
            <a>
              <span
                className={`car_logo ${
                  activeLanguage === "fa" ? null : `logo_ltr`
                }`}
              >
                <Image src={car} alt='سپریس لوگو خودکار' />
              </span>
              <Image
                className={`text_logo ${
                  activeLanguage === "fa" ? null : `text_logo_ltr`
                }`}
                src={activeLanguage === "fa" ? logo : logo_en}
                alt='سپریس لوگو'
              />
            </a>
          </Link>
        </section>
        {/* logo section */}
        <section className={["Nav", showMenu ? "showMenu" : null].join(" ")}>
          <Menu language={language} />
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
      {Show_Modal && (
        <Modal modal_type={modalType} data={data} language={language} />
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
  language: any;
}

export default Header;
