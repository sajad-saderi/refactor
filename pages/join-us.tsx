import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const Layout = dynamic(() => import('../src/Layout'));
const Calculator = dynamic(() => import('../src/components/calculator'));
const Join_us_content = dynamic(() =>
  import('../src/components/calculator/Join_us_content'),
);
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
// import Calculator from "../src/components/calculator";
// import Join_us_content from "../src/components/calculator/Join_us_content";
import language from '../public/languages/fa/joinus.json';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { captcha } from '../src/helpers/capchaHelper';
// import { logPageView } from "../utils/analytics";

const JoinUs = ({ BotScore }) => {
  const [shouldHideCommnets, setShouldHideCommnets] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [Score, SetScore] = useState(null);
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/join-us',
      pageTitle: language.next_seo.title,
    });
    setShouldHideCommnets(
      window.location.search.includes('show_comment') ? false : true,
    );
    setShowVideo(window.location.search.includes('show_video') ? true : false);
    console.log(BotScore);
    // logPageView();
  }, []);

  return (
    <Layout LinkControl={true}>
      <NextSeo
        title={language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      <GoogleReCaptcha
        onVerify={token => {
          captcha(token);
        }}
      />
      <article className="join_us">
        <section className="banner">
          <h1>{language.h1}</h1>
          <h2>{language.h2} </h2>
          <div className="responsive calculator_container">
            {/* You can set the Button text when you call the Calculator component */}
            <Calculator
              language={language.calculator}
              AbText={language.calculator_text}
            />
          </div>
          <p className="temporary_score">{Score}</p>
        </section>
        <Join_us_content
          shouldHideCommnets={shouldHideCommnets}
          showVideo={showVideo}
          language={language.join_us_content}
          AbText={language.join_us_content_text}
        />
      </article>
    </Layout>
  );
};

export default JoinUs;
