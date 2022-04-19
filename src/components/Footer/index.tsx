import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import * as car from "../../../public/car_logo_black.svg";
import {
  IoIosArrowDropup,
  IoLogoTwitter,
  IoLogoInstagram,
} from "react-icons/io";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { supportedLanguages } from "../../../types";
import { addingCountryCodeToNumber } from "../../helpers/addingCountryCodeToNumber";
import { numberChanger } from "../../../utils/numberChanger";

const Footer = ({
  hide,
  showToTop,
  LinkControl,
  language,
  locale,
}: IFooter) => {
  const [hidden, setHidden] = useState(false);
  const [activeToTop, setActiveToTop] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // Because the layout render once you should track the hide props for change
  useEffect(() => {
    if (hide) setHidden(true);
    if (showToTop) setActiveToTop(true);
  }, [hide]);

  // Add an event listener on scroll to show the "Go To Top" button
  useEffect(() => {
    document.addEventListener("scroll", scrollCheck);
    return () => {
      document.removeEventListener("scroll", scrollCheck);
    };
  }, []);

  const scrollCheck = () => {
    /**
     * window.@scroll
     *  if it's bigger than 400px "GoToTop" will shown
     */
    if (window.scrollY > 400) {
      setShowTop(true);
    } else {
      setShowTop(false);
    }
  };

  // GoToTop functionality
  const toTop = () => {
    scrollTo(0, 0);
  };

  return (
    <footer
      data-test-id="footer"
      className={hidden ? "hide_footer" : null}
      dir={locale === "fa" ? "rtl" : "ltr"}
    >
      {activeToTop ? (
        <div
          className={["toTop", showTop ? "showTop" : null].join(" ")}
          onClick={toTop}
        >
          <IoIosArrowDropup size="4rem" color="#4ba3ce" />
        </div>
      ) : null}
      <div className=" responsive plus_border">
        <ul className="links">
          {/* <li>
            <Link href="/about-us" prefetch={false}>
              <a>{language.LINKS.aboutUs}</a>
            </Link>
          </li> */}
          <li>
            <Link href="/faq" prefetch={false}>
              <a>{language.LINKS.faq}</a>
            </Link>
          </li>
          {locale === "fa" && (
            <>
              <li>
                <Link href="/sepris" prefetch={false}>
                  <a>{language.LINKS.sepris}</a>
                </Link>
              </li>
              {LinkControl ? (
                <li>
                  <Link href="/guide-renter" prefetch={false}>
                    <a>{language.LINKS.host}</a>
                  </Link>
                </li>
              ) : null}
              {LinkControl ? (
                <li>
                  <Link href="/evaluation" prefetch={false}>
                    <a>{language.LINKS.evaluation}</a>
                  </Link>
                </li>
              ) : null}
              <li>
                <Link href="/our-policies" prefetch={false}>
                  <a>{language.LINKS.ourPolicies}</a>
                </Link>
              </li>
              <li>
                <Link href="/insurance-policies" prefetch={false}>
                  <a>{language.LINKS.insurancePolicies}</a>
                </Link>
              </li>
              {LinkControl ? null : (
                <li>
                  <Link href="/rent" prefetch={false}>
                    <a>{language.LINKS.rent}</a>
                  </Link>
                </li>
              )}
              {LinkControl ? null : (
                <li>
                  <Link href="/site-map" prefetch={false}>
                    <a>{language.LINKS.siteMap}</a>
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>

        <div className="social_container_footer">
          <h3>{language.FOOTER.followUs}</h3>
          <div>
            <a target="_black" href="https://www.instagram.com/sepris.rent/">
              <IoLogoInstagram size="3rem" color="#4ba3ce" />
            </a>
            <a target="_black" href="https://twitter.com/Seprisrent">
              <IoLogoTwitter size="3rem" color="#4ba3ce" />
            </a>
            <a target="_black" href="https://wa.me/message/C3U7RO7ADABWF1">
              <FaWhatsapp size="3rem" color="#4ba3ce" />
            </a>
          </div>
          <p>
            {" "}
            {language.FOOTER.customerService}
            <a
              href={`tel:${addingCountryCodeToNumber(language.COMMON.number1)}`}
              className="HEAP_Footer_Link_Phone"
            >
              {numberChanger(language.COMMON.number1, locale)}
            </a>
            {/* -
            <a
              href={`tel:${addingCountryCodeToNumber(language.COMMON.number2)}`}
              className="HEAP_Footer_Link_Phone"
            >
              {numberChanger(language.COMMON.number2,locale)}
            </a> */}
            -
            <a
              href={`tel:${addingCountryCodeToNumber(language.COMMON.number3)}`}
              className="HEAP_Footer_Link_Phone"
            >
              {numberChanger(language.COMMON.number3, locale)}
            </a>
          </p>
          <br />
          <br />
          <p className="brand_description">
            <img src={car} alt="logo image" />
            {language.COMMON.seprisDefinition}
          </p>
          <br />
          <br />
        </div>
        <div className="enamadContainer">
          <a
            referrerPolicy="origin"
            target="_blank"
            href="https://trustseal.enamad.ir/?id=266639&amp;Code=Qeni4CAkxd51laL0SZTW"
          >
            <img
              referrerPolicy="origin"
              src="https://Trustseal.eNamad.ir/logo.aspx?id=266639&amp;Code=Qeni4CAkxd51laL0SZTW"
              alt=""
              id="Qeni4CAkxd51laL0SZTW"
            />
          </a>
        </div>
      </div>
      <div className="signature">
        <span className="ver">2.0.0</span>
        <p>{language.FOOTER.signature}</p>
      </div>
    </footer>
  );
};
interface IFooter {
  // true === Hide -> the footer on the page
  hide?: boolean;
  showToTop?: boolean;
  LinkControl?: boolean;
  language: any;
  locale: supportedLanguages;
}
export default Footer;
