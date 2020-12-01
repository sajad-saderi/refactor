import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import language from "../../../../public/languages/fa/header.json";
import context_user from "../../../context/User_info";
import Spinner from "../../../components/Spinner";
import { useRouter } from "next/router";

let token = null;
let complete_register = null;
let company_name = null;
let img_profile = null;
let profile = null;
let user_id = null;

const Menu = () => {
  const [spinner, set_spinner] = useState(false);
  const user = useContext(context_user);
  const router = useRouter();

  useEffect(() => {
    if (window["auth"] && !user.data) {
      set_spinner(true);
    }
  }, []);

  useEffect(() => {    
    if (user.data) {
      const {
        first_name,
        last_name,
        name,
        thumbnail_url,
        company_name,
        username,
        id,
      } = user.data;
      set_spinner(false);

      token = user.data?.token;
      if (first_name) {
        complete_register = true;
      }
      img_profile = thumbnail_url;
      user_id = username ? username : id;
      profile = company_name
        ? company_name
        : username
        ? username
        : first_name
        ? name
        : "";
    } else if (!window["auth"] && !user.data) {
      token = null;
      complete_register = null;
      company_name = null;
      img_profile = null;
      profile = null;
      user_id = null;
    }
  }, [user.data]);

  return (
    <ul>
      {token ? (
        spinner ? (
          <li className='header_spinner'>
            <Spinner display='inline-block' color='#dcdcdc' width={20} />
          </li>
        ) : (
          <li className='first_element_li'>
            <Link href={`/user/[id]`} as={`/user/${user_id}`}>
              <a>
                <img
                  className='profile_icon'
                  // show user image or chow account icon
                  src={
                    img_profile ||
                    "https://core.otoli.net/static/core/default_profile_pic.png"
                  }
                  alt={profile}
                />
                <span className='user-name'>{profile && profile}</span>
                {localStorage["red_dot"] === "1" && (
                  <span className='red_dot' />
                )}
              </a>
            </Link>
          </li>
        )
      ) : spinner ? (
        <li className='header_spinner'>
          <Spinner display='inline-block' color='#dcdcdc' width={20} />
        </li>
      ) : (
        <li
          className='HEAP_Header_Btn_Login'
          onClick={() => {
            localStorage["last_location"] = router.asPath;
          }}
        >
          <Link href={`/login`}>
            <a>
              <span className='user-name'>{language.li}</span>
            </a>
          </Link>
        </li>
      )}
      {/* if the user had registered completely, can access to orders history */}
      {complete_register && (
        <li>
          <Link href='/requests'>
            <a className='HEAP_Header_Link_MyOrders'>{language.a_1}</a>
          </Link>
        </li>
      )}
      <li className='Drop_Down'>
        <span>{language.a_2}</span>
        <ul className='Sub_Nav_Level_2'>
          <li>
            <Link href='/otoli'>
              <a>{language.a_3}</a>
            </Link>
          </li>
          <li>
            <Link href='/faq'>
              <a>{language.a_4}</a>
            </Link>
          </li>
          <li>
            <Link href='/guide-for-rent'>
              <a>{language.a_5}</a>
            </Link>
          </li>
          <li>
            <Link href='/guide-renter'>
              <a>{language.a_6}</a>
            </Link>
          </li>
          <li>
            <Link href='/car-insurance'>
              <a>{language.a_7}</a>
            </Link>
          </li>
          <li>
            <Link href='/assurance'>
              <a>{language.a_8}</a>
            </Link>
          </li>
          <li>
            <Link href='/evaluation'>
              <a>{language.a_9}</a>
            </Link>
          </li>
          <li>
            <Link href='/guide-picture'>
              <a>{language.a_10}</a>
            </Link>
          </li>
          <li>
            <Link href='/gps'>
              <a>{language.a_11}</a>
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Menu;
