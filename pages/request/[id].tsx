import React from "react";
import { NextSeo } from "next-seo";
import Layout from "../../src/Layout";
import Request_page from "../../src/containers/Request_page";
import language from "../../public/languages/fa/requestpage.json";
// import { logPageView } from "../../utils/analytics";

const Request = () => {
  React.useEffect(() => {
    window["dataLayer"].push({
      event: "virtualPageView",
      pageURL: window.location.href,
      pagePath: "/request",
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
      <Request_page language={language.request_page} />
    </Layout>
  );
};

export default Request;
