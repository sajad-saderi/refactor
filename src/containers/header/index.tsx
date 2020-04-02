import React from "react";
import Menu from "./menu";
import Modal from "./modals";
import * as logo from "../../../public/logo_sticky.svg";
import "./header.module.scss";
import Link from "next/link";

const Header = (props: IHeader) => {
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
        <section className="Nav">
          <Menu />
        </section>
      </article>
      {props.Show_Modal && <Modal modal_type={props.modalType} data={props.data} />}
    </header>
  );
};

interface IHeader {
  Show_Modal: boolean;
  modalType: string;
  data?:any
}

export default Header;
