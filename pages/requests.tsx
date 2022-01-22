import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Requests_page = dynamic(() => import('../src/containers/Requests_page'));
// import Layout from "../src/Layout";
// import { logPageView } from "../utils/analytics";
// import Requests_page from "../src/containers/Requests_page";

const Request = ({ locale }) => {
  useEffect(() => {
    // window['dataLayer'].push({
    //   event: 'page_view',
    //   pageURL: window.location.href,
    //   pagePath: '/requests',
    //   pageTitle: locale.PAGE_HEADER.request.title,
    // });
    // logPageView();
  }, []);
  return (
    <Layout>
      <NextSeo
        title={locale.PAGE_HEADER.request.title}
        description={locale.PAGE_HEADER.request.description}
        openGraph={{
          title: locale.PAGE_HEADER.request.title,
          description: locale.PAGE_HEADER.request.description,
          site_name: locale.COMMON.sepris,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <Requests_page language={locale} />
    </Layout>
  );
};

export default Request;
