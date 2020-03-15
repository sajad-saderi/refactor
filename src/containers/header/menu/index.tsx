import React, { useContext } from "react";
import Link from "next/link";
import modal_context from "../../../context/Modal_context";
import jsCookie from "js-cookie";

const Menu = () => {
  const MODAL_CONTEXT = useContext(modal_context);
  const complete_register = jsCookie.get("complete_register");
  const token = jsCookie.get("token");
  const img_profile = jsCookie.get("thumbnail_url");
  const profile = jsCookie.get("company_name")
    ? jsCookie.get("company_name")
    : `${jsCookie.get("first_name")} ${jsCookie.get("last_name")}`;

  return (
    <ul>
      {token ? (
        <li>
          <img
            src={
              img_profile ||
              "https://core.otoli.net/static/core/default_profile_pic.png"
            }
            alt={profile}
          />
          <span>{profile}</span>
        </li>
      ) : (
        <li
          onClick={() => {
            MODAL_CONTEXT.modalHandler("Login");
          }}
        >
          ورود/ثبت نام
        </li>
      )}
      {complete_register && <li>رزروهای من</li>}
      <li className="Drop_Down">
        راهنما
        <ul className="Sub_Nav_Level_2">
          <li>
            <Link href="/otoli">
              <a>اتولی چگونه کار می‌کند؟</a>
            </Link>
          </li>
          <li>
            <Link href="/faq">
              <a>سوالات پرتکرار</a>
            </Link>
          </li>
          <li>
            <Link href="/guide-for-rent">
              <a>راهنمای اجاره گیرنده</a>
            </Link>
          </li>
          <li>
            <Link href="/guide-renter">
              <a>راهنمای اجاره دهنده</a>
            </Link>
          </li>
          <li>
            <Link href="/guide-picture">
              <a>راهنمای عکس گرفتن</a>
            </Link>
          </li>
          <li>
            <Link href="/gps">
              <a>راهنمای انتخاب ردیاب</a>
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Menu;
