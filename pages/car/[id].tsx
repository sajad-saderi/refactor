import React from "react";
import Layout from "../../src/Layout";
import CarPage from "../../src/containers/car/carpage";
import { NextSeo } from "next-seo";

const Car = () => {
  return (
    <Layout>
      <NextSeo
        noindex={true}
      />
      <CarPage />
    </Layout>
  );
};
export default Car;
