import React from "react";
import Layout from "../src/Layout";
import "../src/styles/pages/search_result.scss";
import Search_result from "../src/containers/Search_result";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/searchresult.json";
import { logPageView } from "../utils/analytics";

const SearchResult = () => {
  React.useEffect(() => {
    logPageView();
  }, []);
  return (
    <Layout>
      <NextSeo
        title={language.nextSeo_title}
        description={language.nextSeo_description}
      />
      <Search_result language={language} />
    </Layout>
  );
};

export default SearchResult;
