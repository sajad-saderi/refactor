import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import _500 from '../public/image/500.png';
import { addingCountryCodeToNumber } from '../src/helpers/addingCountryCodeToNumber';
// import { logPageView } from "../utils/analytics";

const page_500 = ({ locale }) => {
  useEffect(() => {
    // window["dataLayer"].push({
    //   event: "page_view",
    //   pageURL: window.location.href,
    //   pagePath: "/500",
    //   pageTitle: locale.PAGE_HEADER._500.title,
    // });
    // logPageView();
  }, []);
  return (
    <Layout>
      <NextSeo
        title={locale.PAGE_HEADER._500.title}
        description={locale.PAGE_HEADER._500.title}
        openGraph={{
          title: locale.PAGE_HEADER._500.title,
          description: locale.PAGE_HEADER._500.title,
          site_name: locale.COMMON.sepris,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <article className='minHeight _500container'>
        <img
          src={_500}
          alt={locale.PAGE_HEADER._500.title}
          className='_404PageImage'
        />
        <span>{locale._500_PAGE.span}</span>
        <p>{locale._500_PAGE.p1}</p>
        <p>
          <a href={`tel:${addingCountryCodeToNumber(locale.COMMON.number1)}`}>
            {locale.COMMON.number1}
          </a>
        </p>
        <Link href='/' prefetch={false}>
          <a className='_404PageAnchor Blue_BTN'>{locale.COMMON.backToHome}</a>
        </Link>
      </article>
    </Layout>
  );
};

export default page_500;
