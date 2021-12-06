import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import staticPage from '../public/languages/static.json'

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
// import { logPageView } from "../utils/analytics";

const gps = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/gps',
      pageTitle: locale.PAGE_HEADER.gps.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.PAGE_HEADER.gps.title}
        description={locale.PAGE_HEADER.gps.description}
        openGraph={{
          title: locale.PAGE_HEADER.gps.title,
          description: locale.PAGE_HEADER.gps.description,
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
        <h1>{staticPage.gps.h1}</h1>
        <p>{staticPage.gps.p_1}</p>
        <ul>
          <li>{staticPage.gps.li_1}</li>
          <li>{staticPage.gps.li_2}</li>
          <li>{staticPage.gps.li_3}</li>
          <li>{staticPage.gps.li_4}</li>
          <li>{staticPage.gps.li_5}</li>
          <li>{staticPage.gps.li_6}</li>
          <li>{staticPage.gps.li_7}</li>
          <li>{staticPage.gps.li_8}</li>
        </ul>
      </article>
    </Layout>
  );
};

export default gps;
