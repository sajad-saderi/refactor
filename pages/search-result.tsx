import React from "react";
import Layout from "../src/Layout";
import "../src/styles/pages/search_result.module.scss";
import Search_result from "../src/containers/Search_result";

const SearchResult = () => {
  return (
    <Layout>
      <Search_result />
    </Layout>
  );
};

export default SearchResult;
