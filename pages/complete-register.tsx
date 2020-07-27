import React, { useEffect } from "react";
import Layout from "../src/Layout";
import Complete_register_container from "../src/containers/CompleteRegister";
import { NextSeo } from "next-seo";

const CompleteRegister = () => {
  useEffect(() => {
    console.log(location.pathname);
    window["ga"]("send", {
      hitType: "pageview",
      page: location.pathname,
    });
  }, []);

  return (
    <Layout>
      <NextSeo
        title="تکمیل ثبت نام | اتولی"
        description="تکمیل ثبت نام | اتولی"
        openGraph={{
          title: "افزودن خودرو | اتولی",
          description: "تکمیل ثبت نام | اتولی",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      <Complete_register_container />
    </Layout>
  );
};

export default CompleteRegister;
