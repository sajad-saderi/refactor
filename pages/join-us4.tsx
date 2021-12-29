import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Calculator = dynamic(() => import('../src/components/calculator'));
const Join_us_content = dynamic(() =>
  import('../src/components/calculator/Join_us_content'),
);
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
// import Calculator from "../src/components/calculator";
// import Join_us_content from "../src/components/calculator/Join_us_content/AbTestContent";
// import Join_us_content from "../src/components/calculator/Join_us_content";
// import { logPageView } from "../utils/analytics";
import languageCTX from '../src/context/languageCTX'
const JoinUs1 = ({ BotScore, locale }) => {
  const [Score, SetScore] = useState(null);
  const { activeLanguage } = useContext(languageCTX)
  React.useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: "/join-us4",
      pageTitle: locale.PAGE_HEADER.joinUs.title,
    });
    // logPageView();
  }, []);
  useEffect(() => {
    if (BotScore) {
      SetScore(BotScore);
    }
  }, [BotScore]);
  return (
    <Layout>
      <NextSeo
        title={locale.PAGE_HEADER.joinUs.title}
        description={locale.PAGE_HEADER.joinUs.description}
        openGraph={{
          title: locale.PAGE_HEADER.joinUs.title,
          description: locale.PAGE_HEADER.joinUs.description,
          site_name: locale.COMMON.sepris,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <article className="join_us" dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}>
        <section className="banner">
          <h1>{locale.JOIN_US_PAGE.banner}</h1>
          <h2>{locale.JOIN_US_PAGE.note} </h2>
          <div className="responsive calculator_container">
            {/* You can set the Button text when you call the Calculator component */}
            <Calculator
              language={locale}
              AbText={locale.COMMON.goToAddCar}
              locale={activeLanguage}

            />
          </div>
          <p className="temporary_score">{Score}</p>
        </section>
        <Join_us_content
          shouldHideCommnets={true}
          showVideo={false}
          language={locale}
          AbText={locale.COMMON.goToAddCar}
        />
      </article>
    </Layout>
  );
};

export default JoinUs1;
