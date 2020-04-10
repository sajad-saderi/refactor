import React from "react";
import Layout from "../src/Layout";
import Set_car_timing from "../src/containers/Set_car_timing";
import { NextSeo } from "next-seo";

const SetTimeAndPrice = () => {
  return (
    <Layout>
      <NextSeo
        title="تعیین شرایط اجاره | اتولی"
        description="تعیین شرایط اجاره | اتولی"
        openGraph={{
          title: `تعیین شرایط اجاره | اتولی`,
          description: `تعیین شرایط اجاره | اتولی`,
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      <Set_car_timing />
    </Layout>
  );
};

export default SetTimeAndPrice;
