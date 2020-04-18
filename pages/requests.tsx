import React from "react";
import { NextSeo } from "next-seo";
import Layout from "../src/Layout";
import Requests_page from "../src/containers/Requests_page";

const Request = () => {
  return (
    <Layout>
      <NextSeo
        title="رزرو‌های من | اتولی"
        description="رزرو‌های من | اتولی"
        openGraph={{
          title: `رزرو‌های من | اتولی`,
          description: `رزرو‌های من | اتولی`,
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      <Requests_page />
    </Layout>
  );
};

export default Request;
