import React, { useEffect } from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import Router from "next/router";
import Calculator from "../src/components/calculator";
import Join_us_content from "../src/components/calculator/Join_us_content";

const JoinUs1 = () => {
  return (
    <Layout>
      <NextSeo
        title="کسب درآمد از خودرو | اتولی"
        description="اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید."
        openGraph={{
          title: "کسب درآمد از خودرو | اتولی",
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
          <div className="responsive calculator_container">
            {/* You can set the Button text when you call the Calculator component */}
            <Calculator AbText="شروع کسب درآمد" />
          </div>
        </section>
        <Join_us_content AbText="شروع کسب درآمد"/>
      </article>
    </Layout>
  );
};

export default JoinUs1;