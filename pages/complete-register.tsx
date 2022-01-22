import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Complete_register_container = dynamic(() =>
  import('../src/containers/CompleteRegister')
);
// import Layout from "../src/Layout";
// import Complete_register_container from "../src/containers/CompleteRegister";
import { NextSeo } from 'next-seo';
// import { logPageView } from "../utils/analytics";

const CompleteRegister = ({ locale }) => {
  useEffect(() => {
    // window['dataLayer'].push({
    //   event: 'page_view',
    //   pageURL: window.location.href,
    //   pagePath: '/complete-register',
    //   pageTitle: locale.PAGE_HEADER.completeRegister.title,
    // });
    // logPageView();
  }, []);

  return (
    <Layout>
      <NextSeo
        title={locale.PAGE_HEADER.completeRegister.title}
        description={locale.PAGE_HEADER.completeRegister.description}
        openGraph={{
          title: locale.PAGE_HEADER.completeRegister.title,
          description: locale.PAGE_HEADER.completeRegister.description,
          site_name: locale.COMMON.site_name,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <Complete_register_container language={locale} />
    </Layout>
  );
};

export default CompleteRegister;
