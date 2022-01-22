import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import staticPage from '../public/languages/static.json';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
// import { logPageView } from "../utils/analytics";
const car_insurance_page = ({ locale }) => {
  useEffect(() => {
    // window['dataLayer'].push({
    //   event: 'page_view',
    //   pageURL: window.location.href,
    //   pagePath: '/car-insurance',
    //   pageTitle: locale.PAGE_HEADER.carInsurance.title,
    // });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.PAGE_HEADER.carInsurance.title}
        description={locale.PAGE_HEADER.carInsurance.description}
        openGraph={{
          title: locale.PAGE_HEADER.carInsurance.title,
          description: locale.PAGE_HEADER.carInsurance.description,
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
        <h1>{staticPage.carInsurance.h1}</h1>
        <h2>{staticPage.carInsurance.h2}</h2>
        <p>{staticPage.carInsurance.p_1}</p>
        <ul>
          <li>
            <strong>{staticPage.carInsurance.string_1} </strong>
            {staticPage.carInsurance.li_1}
          </li>
          <li>
            <strong>{staticPage.carInsurance.string_2} </strong>{' '}
            {staticPage.carInsurance.li_2}
          </li>
          <li>
            <strong>{staticPage.carInsurance.string_3} </strong>
            {staticPage.carInsurance.li_3}
          </li>
          <li>
            <strong>{staticPage.carInsurance.li_4}</strong>
          </li>
          <li>
            <strong>{staticPage.carInsurance.li_5}</strong>
          </li>
        </ul>
        <p> {staticPage.carInsurance.li_6}</p>
      </article>
    </Layout>
  );
};

export default car_insurance_page;
