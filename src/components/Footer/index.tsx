import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import language from "../../../public/languages/fa/footer.json";
import * as car from "../../../public/car_logo_black.svg";
// import "./footer.scss";
import {
  IoIosArrowDropup,
  IoLogoTwitter,
  IoLogoInstagram,
} from "react-icons/io";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";

const Footer = (props: IFooter) => {
  const [hide, setHide] = useState(false);
  const [activeToTop, setActiveToTop] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // Because the layout render once you should track the hide props for change
  useEffect(() => {
    if (props.hide) setHide(true);
  }, [props.hide]);

  // Because the layout render once you should track the hide props for change
  useEffect(() => {
    if (props.showToTop) setActiveToTop(true);
  }, [props.hide]);

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
    <footer data-test-id="footer" className={hide ? "hide_footer" : null}>
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
          <li>
            <Link href="/about-us" prefetch={false}>
              <a>{language.about_us}</a>
            </Link>
          </li>
          <li>
            <Link href="/sepris" prefetch={false}>
              <a>{language.otoli}</a>
            </Link>
          </li>
          {props.LinkControl ? (
            <li>
              <Link href="/guide-renter" prefetch={false}>
                <a>{language.guide_renter}</a>
              </Link>
            </li>
          ) : null}
          {props.LinkControl ? (
            <li>
              <Link href="/evaluation" prefetch={false}>
                <a>{language.evaluation}</a>
              </Link>
            </li>
          ) : null}
          <li>
            <Link href="/faq" prefetch={false}>
              <a>{language.faq}</a>
            </Link>
          </li>
          <li>
            <Link href="/our-policies" prefetch={false}>
              <a>{language.our_policies}</a>
            </Link>
          </li>
          <li>
            <Link href="/insurance-policies" prefetch={false}>
              <a>{language.insurance_policies}</a>
            </Link>
          </li>
          {props.LinkControl ? null : (
            <li>
              <Link href="/rent" prefetch={false}>
                <a>{language.rent}</a>
              </Link>
            </li>
          )}
          {props.LinkControl ? null : (
            <li>
              <Link href="/site-map" prefetch={false}>
                <a>{language.site_map}</a>
              </Link>
            </li>
          )}
        </ul>

        <div className="social_container_footer">
          <h3>{language.social_container_footer_h3}</h3>
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
            {language.social_container_footer_p}
            <a
              href={`tel:${language.social_container_footer_a_1}`}
              className="HEAP_Footer_Link_Phone"
            >
              {language.social_container_footer_a_1}
            </a>
            ,
            <a
              href={`tel:${language.social_container_footer_a_2}`}
              className="HEAP_Footer_Link_Phone"
            >
              {language.social_container_footer_a_2}
            </a>
          </p>
          <br />
          <br />
          <p className="brand_description">
            <img src={car} alt="logo image" />
            سِپریس نامی ایرانی و به معنی «میدان اسب‌دوانی» است.
          </p>
        </div>
      </div>
      <div className="signature">
        <span className="ver">2.0.0</span>
        <p>{language.signature}</p>
      </div>
    </footer>
  );
};
interface IFooter {
  // true === Hide -> the footer on the page
  hide?: boolean;
  showToTop?: boolean;
  LinkControl?: boolean;
}
export default Footer;
