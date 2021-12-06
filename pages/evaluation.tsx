import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import staticPage from '../public/languages/static.json'

const Layout = dynamic(() => import('../src/Layout'));
import { NextSeo } from 'next-seo';
// import Layout from "../src/Layout";
// import { logPageView } from "../utils/analytics";

const evaluation = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/evaluation',
      pageTitle: locale.PAGE_HEADER.evaluation.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.PAGE_HEADER.evaluation.title}
        description={locale.PAGE_HEADER.evaluation.description}
        openGraph={{
          title: locale.PAGE_HEADER.evaluation.title,
          description: locale.PAGE_HEADER.evaluation.description,
          site_name: locale.COMMON.site_name,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <article className="responsive static_pages minHeight">
        <h1>{staticPage.evaluation.h1}</h1>
        <p>{staticPage.evaluation.p_1}</p>
        <p>{staticPage.evaluation.p_2}</p>
        <ul>
          <li>{staticPage.evaluation.li_1}</li>
          <li>{staticPage.evaluation.li_2}</li>
          <li>{staticPage.evaluation.li_3}</li>
          <li>{staticPage.evaluation.li_4}</li>
          <li>{staticPage.evaluation.li_5}</li>
          <li>{staticPage.evaluation.li_6}</li>
        </ul>
        <p>{staticPage.evaluation.p_3}</p>
        <ul>
          <li>{staticPage.evaluation.li_7}</li>
          <li>{staticPage.evaluation.li_8}</li>
          <li>{staticPage.evaluation.li_9}</li>
        </ul>
        <p>{staticPage.evaluation.p_4}</p>
      </article>
    </Layout>
  );
};

export default evaluation;
