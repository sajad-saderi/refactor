import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import _404 from '../public/image/404.png';
// import { logPageView } from "../utils/analytics";

const page_404 = ({ locale }) => {
  useEffect(() => {
    // window["dataLayer"].push({
    //   event: "page_view",
    //   pageURL: window.location.href,
    //   pagePath: "/404",
    //   pageTitle: locale.PAGE_HEADER._404.title,
    // });
    // logPageView();
  }, []);
  return (
    <Layout>
      <NextSeo
        title={locale.PAGE_HEADER._404.title}
        description={locale.PAGE_HEADER._404.description}
        openGraph={{
          title: locale.PAGE_HEADER._404.title,
          description: locale.PAGE_HEADER._404.description,
          site_name: locale.COMMON.sepris,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <article className='minHeight'>
        <img src={_404} alt='404' className='_404PageImage' />
        <Link href='/' prefetch={false}>
          <a className='_404PageAnchor Blue_BTN'>{locale.COMMON.backToHome}</a>
        </Link>
      </article>
    </Layout>
  );
};

export default page_404;
