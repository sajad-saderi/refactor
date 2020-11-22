import React from "react";
import Layout from "../src/Layout";
import "../src/styles/pages/search_result.scss";
import Search_result from "../src/containers/Search_result";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/searchresult.json";
// import { logPageView } from "../utils/analytics";
import { REQUEST_GET_SEARCH_FOR_RENT } from "../src/API";
import { payBackInString } from "../utils/date-range-creator";
import search_query_builder from "../utils/search-query-builder";

const SearchResult = ({ searchResponse, initialFilters }) => {
  React.useEffect(() => {
    window["dataLayer"].push({
      event: "virtualPageView",
      pageURL: window.location.href,
      pagePath: "/search-result",
      pageTitle: language.next_seo.title,
    });
    // logPageView();
  }, []);

  return (
    <Layout>
      <NextSeo
        title={`${language.next_seo.title.start}${initialFilters.start_date}${language.next_seo.title.ta}${initialFilters.end_date}${language.next_seo.title.otoli}`}
        description={language.nextSeo_description}
        openGraph={{
          title: `${language.next_seo.title.start}${initialFilters.start_date}${language.next_seo.title.ta}${initialFilters.end_date}${language.next_seo.title.otoli}`,
          description: language.next_seo.description,
          site_name: language.next_seo.site_name,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      <Search_result language={language} initialResults={searchResponse} />
    </Layout>
  );
};

export async function getServerSideProps(props) {
  let searchQuery = "";
  let initialFilters = null;
  if (Object.keys(props.query).length !== 0) {
    searchQuery = search_query_builder(props.query);
    initialFilters = props.query;
  } else {
    const { start_date, end_date } = payBackInString(6, 3);
    searchQuery = search_query_builder({ start_date, end_date });
    initialFilters = { start_date, end_date };
  }
  try {
    const res: any = await REQUEST_GET_SEARCH_FOR_RENT({
      searchQuery,
    });
    return {
      props: { searchResponse: res, initialFilters },
    };
  } catch (error) {
    return {
      props: { searchResponse: null, initialFilters },
    };
  }
}

export default SearchResult;
