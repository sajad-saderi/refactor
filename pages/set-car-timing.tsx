import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Set_car_timing = dynamic(() =>
  import('../src/containers/Set_car_timing')
);
// import Layout from "../src/Layout";
// import Set_car_timing from "../src/containers/Set_car_timing";
import { NextSeo } from 'next-seo';
// import { logPageView } from "../utils/analytics";

const SetTimeAndPrice = ({ locale }) => {
  useEffect(() => {
    // window['dataLayer'].push({
    //   event: 'page_view',
    //   pageURL: window.location.href,
    //   pagePath: '/set-car-timing',
    //   pageTitle: locale.PAGE_HEADER.carSetting.title,
    // });
    // logPageView();
  }, []);
  return (
    <Layout LinkControl={true}>
      <NextSeo
        title={locale.PAGE_HEADER.carSetting.title}
        description={locale.PAGE_HEADER.carSetting.description}
        openGraph={{
          title: locale.PAGE_HEADER.carSetting.title,
          description: locale.PAGE_HEADER.carSetting.description,
          site_name: locale.COMMON.sepris,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <Set_car_timing language={locale} />
    </Layout>
  );
};

export default SetTimeAndPrice;
