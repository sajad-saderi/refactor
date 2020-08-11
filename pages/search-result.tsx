import React from "react";
import Layout from "../src/Layout";
import "../src/styles/pages/search_result.scss";
import Search_result from "../src/containers/Search_result";
import { NextSeo } from "next-seo";

const SearchResult = () => {
  return (
    <Layout>
      <NextSeo
        title="جستجو | اتولی"
        description="اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید."
      />
      <Search_result />
    </Layout>
  );
};

export default SearchResult;
