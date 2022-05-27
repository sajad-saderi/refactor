import React, { useContext, useState } from "react";
import Menu from "./menu";
import Modal from "./modals";
// import "./header.scss";
// import * as logo from "../../../public/logo_sticky.svg"; 
import Link from "next/link";
import languageCTX from "../../context/languageCTX";
import { SeprisCarLogo } from "../../components/Icons/svg/seprisCarLogo";
import { SeprisTextFa } from "../../components/Icons/svg/seprisTextFa";
import { SeprisTextEn } from "../../components/Icons/svg/seprisTextEn";

const Header = ({ language, Show_Modal, modalType, data }: IHeader) => {
  const [showMenu, setShowMenu] = useState(false);
  const { activeLanguage } = useContext(languageCTX);
  return (
    <header className='header' dir={activeLanguage === "fa" ? "rtl" : "ltr"}>
      <article className='responsive header_container'>
        <section className='Logo'>
          <Link href='/' prefetch={false}>
            <a className='homeLink'>
              <span className="carLogo">
                <SeprisCarLogo width='40px' height='26px' color='#ffffff' rotate={activeLanguage === 'fa' ? 0 : -180} />
              </span>
              <span className="textLogo">
                {activeLanguage === 'fa' ? (
                  <SeprisTextFa width='93px' height='15px' color='#ffffff' />
                ) : (
                  <SeprisTextEn width='98px' height='25px' color='#ffffff' />
                )}
              </span>
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
