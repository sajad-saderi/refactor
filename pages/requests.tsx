import { useEffect } from "react";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
const Requests_page = dynamic(() => import("../src/containers/Requests_page"));
// import Layout from "../src/Layout";
import language from "../public/languages/fa/requestspage.json";
// import { logPageView } from "../utils/analytics";
// import Requests_page from "../src/containers/Requests_page";

const Request = () => {
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view_virtual",
      pageURL: window.location.href,
      pagePath: "/requests",
      pageTitle: language.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout>
      <NextSeo
        title={language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      <Requests_page language={language.requests_page} />
    </Layout>
  );
};

export default Request;
