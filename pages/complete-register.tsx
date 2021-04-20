import React, { useEffect } from "react";
import Layout from "../src/Layout";
import Complete_register_container from "../src/containers/CompleteRegister";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/completeregister.json";
// import { logPageView } from "../utils/analytics";
import * as Sentry from "@sentry/browser";

const CompleteRegister = () => {
  useEffect(() => {
    try {
      window["dataLayer"].push({
        event: "page_view",
        pageURL: window.location.href,
        pagePath: "/complete-register",
        pageTitle: language.next_seo.title,
      });
    } catch (error) {
      if (process.env.NODE_ENV !== "development") {
        Sentry.captureException(error);
      }
    }
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
      <Complete_register_container language={language} />
    </Layout>
  );
};

export default CompleteRegister;
