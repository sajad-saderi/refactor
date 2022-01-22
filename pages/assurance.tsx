import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import staticPage from '../public/languages/static.json';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
// import { logPageView } from "../utils/analytics";

const assurance = ({ locale }) => {
  useEffect(() => {
    // window['dataLayer'].push({
    //   event: 'page_view',
    //   pageURL: window.location.href,
    //   pagePath: '/assurance',
    //   pageTitle: locale.PAGE_HEADER.assurance.title,
    // });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.PAGE_HEADER.assurance.title}
        description={locale.PAGE_HEADER.assurance.description}
        openGraph={{
          title: locale.PAGE_HEADER.assurance.title,
          description: locale.PAGE_HEADER.assurance.description,
          site_name: locale.COMMON.site_name,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <article className='responsive static_pages minHeight'>
        <h1>{staticPage.assurance.h3}</h1>
        <p>{staticPage.assurance.p} </p>
        <ul>
          <li>{staticPage.assurance.li_1}</li>
          <li>{staticPage.assurance.li_2}</li>
          <li>{staticPage.assurance.li_3}</li>
          <li>{staticPage.assurance.li_4}</li>
          <li>{staticPage.assurance.li_5}</li>
          <li>{staticPage.assurance.li_6}</li>
        </ul>
      </article>
    </Layout>
  );
};

export default assurance;
