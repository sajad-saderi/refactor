import React, { useEffect } from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import Link from "next/link";
import _404 from "../public/image/404.png";

const AboutUs = () => {
  useEffect(() => {
    window["hj"] =
      window["hj"] ||
      function() {
        (window["hj"].q = window["hj"].q || []).push(arguments);
      };
    window["hj"]("tagRecording", ["404 PAGE"]);
  }, []);

  return (
    <Layout>
      <NextSeo
        title="صفحه مورد نظر پیدا نشد. | اتولی"
        description="صفحه مورد نظر پیدا نشد. | اتولی"
        openGraph={{
          title: "صفحه مورد نظر پیدا نشد. | اتولی",
          description: "صفحه مورد نظر پیدا نشد. | اتولی",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      <article className="minHeight">
        <img src={_404} alt="404" className="_404PageImage" />
        <Link href="/">
          <a className="_404PageAnchor Blue_BTN">بازگشت به صفحه اصلی</a>
        </Link>
      </article>
    </Layout>
  );
};

export default AboutUs;
