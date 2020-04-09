import React from "react";
import { NextSeo } from "next-seo";
import Layout from "../../src/Layout";
import Request_page from "../../src/containers/Request_page";

const Request = () => {
  return (
    <Layout>
      <NextSeo
        title="رزرو‌های من | اتولی`"
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
      <Request_page />
    </Layout>
  );
};

export default Request;
