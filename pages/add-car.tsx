import React from "react";
import Layout from "../src/Layout";
import Add_car from "../src/containers/Add_car";
import { NextSeo } from "next-seo";

const AddCar = () => {
  return (
    <Layout>
      <NextSeo
        title="افزودن خودرو | اتولی"
        description="افزودن خودرو | اتولی"
        openGraph={{
          title: `افزودن خودرو | اتولی`,
          description: `افزودن خودرو | اتولی`,
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      <Add_car />
    </Layout>
  );
};

export default AddCar;
