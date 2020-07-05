import React, { useContext } from "react";
import Link from "next/link";
import modal_context from "../../../context/Modal_context";
import jsCookie from "js-cookie";
import Router from "next/router";

const Menu = () => {
  const MODAL_CONTEXT = useContext(modal_context);

  let complete_register = jsCookie.get("complete_register");
  let token = jsCookie.get("token");
  let img_profile = jsCookie.get("thumbnail_url");
  let company_name = jsCookie.get("company_name");
  let profile =
    company_name && company_name !== "null"
      ? company_name
      : `${jsCookie.get("user_name")}`;
  let user_id = jsCookie.get("user_id");

  return (
    <ul>
      {token ? (
        <li className="first_element_li">
          <Link href="/user/[id]" as={`/user/${user_id}`}>
            <a>
              <img
                className="profile_icon"
                // show user image or chow account icon
                src={
                  img_profile ||
                  "https://core.otoli.net/static/core/default_profile_pic.png"
                }
                alt={profile}
              />
              <span>{profile}</span>
            </a>
          </Link>
        </li>
      ) : (
        <li
          className="HEAP_Header_Btn_Login"
          onClick={() => {
            // set the 'login' model to appear
            MODAL_CONTEXT.modalHandler("Login");
          }}
        >
          ورود/ثبت نام
        </li>
      )}
      {/* if the user had registered completely, can access to orders history */}
      {complete_register === "true" && (
        <li>
          <Link href="/requests">
            <a className="HEAP_Header_Link_MyOrders">رزروهای من</a>
          </Link>
        </li>
      )}
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
            <Link href="/assurance">
              <a>مدارک و ضمانت های لازم</a>
            </Link>
          </li>
          <li>
            <Link href="/evaluation">
              <a>اعتبار سنجی مشتریان</a>
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
