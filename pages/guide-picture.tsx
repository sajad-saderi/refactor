import { useEffect } from 'react';

import dynamic from 'next/dynamic';
import staticPage from '../public/languages/static.json'

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
// import { logPageView } from "../utils/analytics";

const guidePicture = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/guide-picture',
      pageTitle: locale.PAGE_HEADER.guidePicture.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.PAGE_HEADER.guidePicture.title}
        description={locale.PAGE_HEADER.guidePicture.description}
        openGraph={{
          title: locale.PAGE_HEADER.guidePicture.title,
          description: locale.PAGE_HEADER.guidePicture.description,
          site_name: locale.COMMON.site_name,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <h1>{staticPage.guidePicture.h1}</h1>
        <p>{staticPage.guidePicture.p}</p>
        <h2 id="guidePictureHowTakePicture">{staticPage.guidePicture.h2_1}</h2>
        <ul>
          <li>{staticPage.guidePicture.li_1}</li>
          <li>{staticPage.guidePicture.li_2}</li>
          <li>{staticPage.guidePicture.li_3}</li>
          <li>{staticPage.guidePicture.li_4}</li>
          <li>{staticPage.guidePicture.li_5}</li>
          <li>{staticPage.guidePicture.li_6}</li>
          <li>{staticPage.guidePicture.li_7}</li>
          <li>{staticPage.guidePicture.li_8}</li>
        </ul>
        <h2 id="guidePictureDontMakeMistake">{staticPage.guidePicture.h2_2}</h2>
        <ul>
          <li>{staticPage.guidePicture.li_9}</li>
          <li>{staticPage.guidePicture.li_10}</li>
          <li>{staticPage.guidePicture.li_11}</li>
          <li>{staticPage.guidePicture.li_12}</li>
          <li>{staticPage.guidePicture.li_13}</li>
          <li>{staticPage.guidePicture.li_14}</li>
          <li>{staticPage.guidePicture.li_15}</li>
        </ul>
      </section>
    </Layout>
  );
};

export default guidePicture;
