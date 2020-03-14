/* tslint:disable */
import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

const Footer = () => {
  const [hider, setHider] = useState(false);

  useEffect(() => {
    if (Router.route === "/checkout") setHider(true);
  }, []);
  return (
    <footer>
      <div id="toTop" />
      <div className={["plus_border", hider ? "removeFooter" : ""].join(" ")}>
        <div className="container" dir="rtl">
          <div className="row">
            <div
              className="col-lg-3 col-md-6 col-sm-6"
              style={{ borderLeft: "1px solid #e8e8e8" }}
            >
              <div className="collapse show" id="collapse_ft_2">
                <ul className="links">
                  <li>
                    <Link href="/about-us">
                      <a>درباره ما</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/otoli">
                      <a>اتولی چگونه کار می‌کند؟</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq">
                      <a>سوالات متداول</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/our-policies">
                      <a>شرایط و قوانین استفاده</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/insurance-policies">
                      <a>شرایط و پوشش‌های بیمه</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/rent">
                      <a>اجاره ماشین</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/site-map">
                      <a>نقشه سایت</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 jus">
              <div className="follow_us">
                <h3 style={{ color: "#929292" }}>
                  ما را در شبکه‌های اجتماعی دنبال کنید:
                </h3>
                {/* <Icon name='facebook' /> */}
                <div className="iconContainer">
                  <a
                    style={{ margin: 0 }}
                    target="_black"
                    href="https://www.instagram.com/otoli_net/"
                  >
                    {/* <Icon size="large" name="instagram" style={{ margin: 0 }} /> */}
                  </a>
                  {/* <Icon name='google plus' /> */}
                  {/* <Icon name='vk' /> */}

                  <a target="_black" href="https://twitter.com/otoli_net">
                    {/* <Icon size="large" name="twitter" /> */}
                  </a>
                  <a target="_black" href="https://t.me/otoli_net">
                    {/* <Icon size="large" name="telegram" /> */}
                  </a>
                </div>
                <p
                  style={{
                    color: "#929292",
                    marginTop: "16px",
                    fontWeight: 500
                  }}
                >
                  شماره تماس: <a href="tel:02188567759">۰۲۱۸۸۵۶۷۷۵۹</a>
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <span className="ver">2.0.0</span>
              <Link href="/site-map">
                <a
                  style={{
                    color: "transparent",
                    display: "inline-block"
                  }}
                >
                  site map
                </a>
              </Link>
              <p>تمامی حقوق برای وب‌سایت اتولی محفوظ است.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
