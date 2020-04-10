import React, { useEffect } from "react";
import Layout from "../src/Layout";
import backgroundImage from "../static/parking.jpg";
import insurance from "../public/image/SamanInsurance.png";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Router from "next/router";
import Join_us_content from "../src/components/calculator/Join_us_content";

const JoinUs2 = () => {
  useEffect(() => {
    if (Router.router.query.utm_source) {
      localStorage["utm_source"] = Router.query.utm_source;
      localStorage["utm_medium"] = Router.query.utm_medium;
      localStorage["utm_campaign"] = Router.query.utm_campaign;
      localStorage["utm_term"] = Router.query.utm_term;
      localStorage["utm_content"] = Router.query.utm_content;
      localStorage["utm_landing_url"] = "https://otoli.net/join-us2";
    }
  }, []);
  return (
    <Layout>
      <NextSeo
        title="اتولی | اجاره آسان خودرو"
        description="اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید."
        openGraph={{
          title: "اتولی | اجاره آسان خودرو",
          description:
            "اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید.",
          site_name: "اتولی",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      <article className="join_us">
        <section className="banner">
          <h1>اتولی، برای اوقات فراغت ماشین شما</h1>
          <h2>
            به راحتی خودروتان را در اتولی کوتاه مدت اجاره بدهید و درآمد کسب کنید
          </h2>
          <div className="addCarnow">
            <Link href="/add-car">
              <a className="Blue_BTN addCar_bottom_joinus_b">
                ماشین‌تان را اضافه کنید
              </a>
            </Link>
            <p>
              ثبت خودرو در اتولی رایگان و ساده است و به کمتر از ده دقیقه زمان
              نیاز دارد.
            </p>
          </div>
        </section>
        <Join_us_content />
      </article>
    </Layout>
  );
};

export default JoinUs2;
