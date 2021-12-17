import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import context_user from '../../../context/User_info';
import languageCTX from '../../../context/languageCTX';
import Spinner from '../../../components/Spinner';
import { useRouter } from 'next/router';
import NameAvatar from '../../../components/name_avatar/avatar-name';

let token = null;
let complete_register = null;
let company_name = null;
let img_profile = null;
let profile = null;
let user_id = null;

const Menu = ({ language }: IMenu) => {
  const [spinner, set_spinner] = useState(false);
  const [en, setEn] = useState();
  const user = useContext(context_user);
  const local = useContext(languageCTX);
  const router = useRouter();

  useEffect(() => {
    if (window['auth'] && !user.data) {
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
            : '';
    } else if (!window['auth'] && !user.data) {
      token = null;
      complete_register = null;
      company_name = null;
      img_profile = null;
      profile = null;
      user_id = null;
    }
  }, [user.data]);

  let allowToShow = router.pathname === "/join-us"
    || router.pathname === "/join-us2"
    || router.pathname === "/join-us3"
    || router.pathname === "/join-us4"
    || router.pathname === "/add-car"
    || router.pathname === "/set-car-timing" ? false : true

  return (
    <ul>
      <li className="Drop_Down">
        <span>{language.HEADER.guide}</span>
        <ul className="Sub_Nav_Level_2">
          <li>
            <Link href="/faq" prefetch={false}>
              <a>{language.LINKS.faq}</a>
            </Link>
          </li>
          <li>
            <Link href="/guide-for-rent" prefetch={false}>
              <a>{language.LINKS.guest}</a>
            </Link>
          </li>
          {local.activeLanguage === 'fa' && (
            <>
              <li>
                <Link href="/sepris" prefetch={false}>
                  <a>{language.LINKS.sepris}</a>
                </Link>
              </li>
              <li>
                <Link href="/guide-renter" prefetch={false}>
                  <a>{language.LINKS.host}</a>
                </Link>
              </li>
              <li>
                <Link href="/car-insurance" prefetch={false}>
                  <a>{language.LINKS.insurance}</a>
                </Link>
              </li>
              <li>
                <Link href="/assurance" prefetch={false}>
                  <a>{language.LINKS.assurance}</a>
                </Link>
              </li>
              <li>
                <Link href="/evaluation" prefetch={false}>
                  <a>{language.LINKS.evaluation}</a>
                </Link>
              </li>
              <li>
                <Link href="/guide-picture" prefetch={false}>
                  <a>{language.LINKS.takingPicture}</a>
                </Link>
              </li>
              <li>
                <Link href="/gps" prefetch={false}>
                  <a>{language.LINKS.gps}</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </li>
      {/* if the user had registered completely, can access to orders history */}
      {complete_register && (
        <li>
          <Link href="/requests" prefetch={false}>
            <a className="HEAP_Header_Link_MyOrders">
              {language.HEADER.myRequests}
            </a>
          </Link>
        </li>
      )}
      {allowToShow &&
        <li
          onClick={() => {
            local.changingLanguage(local.activeLanguage === 'en' ? 'fa' : 'en');
            router.push(router.pathname, router.asPath, {
              locale: local.activeLanguage === 'en' ? 'fa' : 'en',
            });
          }}
        >
          <span>{local.activeLanguage === 'en' ? 'fa' : 'en'}</span>
        </li>}
      {token ? (
        spinner ? (
          <li className="header_spinner">
            <span className="Gradient" />
            <p className="Gradient profile_icon_place_holder" />
          </li>
        ) : (
          <li className="first_element_li">
            <Link href={`/user/[id]`} as={`/user/${user_id}`} prefetch={false}>
              <a>
                <span className="user-name">{profile && profile}</span>
                {localStorage['red_dot'] === '1' && (
                  <span className="red_dot" />
                )}
                {img_profile.search('default') === -1 ? (
                  <img
                    className="profile_icon"
                    // show user image or chow account icon
                    src={
                      img_profile ||
                      'https://core.sepris.com/static/core/default_profile_pic.png'
                    }
                    alt={profile}
                  />
                ) : (
                  <NameAvatar
                    name={profile}
                    css_display="inline-block"
                    css_with={32}
                    css_radius={50}
                    css_text_color="#ffffff"
                  />
                )}
              </a>
            </Link>
          </li>
        )
      ) : spinner ? (
        <li className="header_spinner">
          <span className="Gradient" />
          <p className="Gradient profile_icon_place_holder" />
        </li>
      ) : (
        <li
          className="HEAP_Header_Btn_Login"
          onClick={() => {
            if (
              router.asPath !== '/login' &&
              router.asPath !== '/complete-register'
            )
              localStorage['last_location'] = router.asPath;
            else {
              localStorage['last_location'] = '/';
            }
          }}
        >
          <Link href={`/login`} prefetch={false}>
            <a>
              <span className="login-out">{language.COMMON.logInOut}</span>
            </a>
          </Link>
        </li>
      )}
    </ul>
  );
};

interface IMenu {
  language: any;
}

export default Menu;
