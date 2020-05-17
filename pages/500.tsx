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
      <article className="minHeight">
        <section className="_500container">
          <img src={_500} alt="500" className="_404PageImage" />
          <p>
            مکشلی از سمت رخ داده است، لطفا بعد از چند دقیقه مجددا تلاش کنید.
          </p>
        </section>
        <Link href="/">
          <a className="_404PageAnchor Blue_BTN">بازگشت به صفحه اصلی</a>
        </Link>
      </article>
    </Layout>
  );
};

export default AboutUs;
