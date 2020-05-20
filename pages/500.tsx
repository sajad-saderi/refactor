import React from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import Link from "next/link";
import _500 from "../public/image/500.png";

const AboutUs = () => {
  return (
    <Layout>
      <NextSeo
        title="خطایی رخ داده است | اتولی"
        description="خطایی رخ داده است | اتولی"
        openGraph={{
          title: "خطایی رخ داده است | اتولی",
          description: "خطایی رخ داده است | اتولی",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      <article className="minHeight _500container">
        <img src={_500} alt="500" className="_404PageImage" />
        <span>
          به زودی این مشکل را برطرف خواهیم کرد. لطفا کمی بعد دوباره به ما سر
          بزنید.
        </span>
        <p>
          همیشه خوشحال می‌شویم صدای شما را از طریق تلفن بشنویم یا به وسیله چت با
          شما در تماس باشیم.
        </p>
        <p>
          شماره تماس: <a href="tel:02188567759">۰۲۱۸۸۵۶۷۷۵۹</a>
        </p>
        <Link href="/">
          <a className="_404PageAnchor Blue_BTN">بازگشت به صفحه اصلی</a>
        </Link>
      </article>
    </Layout>
  );
};

export default AboutUs;
