import React, { useEffect } from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import Link from "next/link";
import _404 from "../public/image/404.png";
import language from "../public/languages/fa/_404.json";
// import { logPageView } from "../utils/analytics";

const page_404 = () => {
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/404",
      pageTitle: language.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout>
      <NextSeo
        title={language.title}
        description={language.description}
        openGraph={{
          title: language.title,
          description: language.description,
        }}
        twitter={{
          handle: language.handle,
          site: language.site,
          cardType: language.cardType,
        }}
      />
      <article className='minHeight'>
        <img src={_404} alt='404' className='_404PageImage' />
        <Link href='/'>
          <a className='_404PageAnchor Blue_BTN'>{language.return_to_home}</a>
        </Link>
      </article>
    </Layout>
  );
};

export default page_404;
