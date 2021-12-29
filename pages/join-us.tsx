import { useCallback, useContext, useEffect, useState } from 'react';
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
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { captcha } from '../src/helpers/capchaHelper';
// import { logPageView } from "../utils/analytics";
import languageCTX from '../src/context/languageCTX'
let isSent = false
const JoinUs = ({ BotScore, locale }) => {
  const [shouldHideCommnets, setShouldHideCommnets] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [Score, SetScore] = useState(null);
  const [token, setToken] = useState(null);
  const { activeLanguage } = useContext(languageCTX)
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/join-us',
      pageTitle: locale.PAGE_HEADER.joinUs.title,
    });
    setShouldHideCommnets(
      window.location.search.includes('show_comment') ? false : true,
    );
    setShowVideo(window.location.search.includes('show_video') ? true : false);
    // logPageView();
  }, []);

  useEffect(() => {
    if (token && !isSent) {
      captcha(token)
      isSent = true
    }
  })

  return (
    <Layout LinkControl={true}>
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
      <GoogleReCaptcha
        onVerify={googletoken => {
          if (!token)
            setToken(googletoken);
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
        </section>
        <Join_us_content
          shouldHideCommnets={shouldHideCommnets}
          showVideo={showVideo}
          language={locale}
          AbText={locale.COMMON.goToAddCar}
        />
      </article>
    </Layout>
  );
};

export default JoinUs;
