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
// import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { captcha } from '../src/helpers/capchaHelper';
// import { logPageView } from "../utils/analytics";
import { load } from 'recaptcha-v3'
import axios from 'axios';


const JoinUs = ({ BotScore }) => {
  const [shouldHideCommnets, setShouldHideCommnets] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [Score, SetScore] = useState(null);
  // const { executeRecaptcha } = useGoogleReCaptcha();
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/join-us',
      pageTitle: language.next_seo.title,
    });
    // logPageView();
    setShouldHideCommnets(
      window.location.search.includes('show_comment') ? false : true,
    );
    setShowVideo(window.location.search.includes('show_video') ? true : false);
    console.log(BotScore);
    load(process.env.GOOGLE_CAPTCHA).then((recaptcha) => {
      console.log(recaptcha);

      recaptcha.execute(window.location.pathname.slice(1).replace(/-/, "")).then((token) => {
        var url = "https://recaptchaotoli.herokuapp.com/recaptcha/";
        axios.get(url + "?g-recaptcha-response=" + token)
          .then((res) => {
            console.log(res);

            window["dataLayer"].push({
              event: "recaptcha",
              recaptchaAnswer: res.data.status,
              recaptchaScore: res.data.recaptcha.score,
            });
            console.log({ BotScore: res.data.recaptcha.score });
          })// Will print the token
      }).catch(e => console.log(e))
    }).catch(e => console.log(e))
  }, []);
  useEffect(() => {
    // handleReCaptchaVerify()
  }, [BotScore]);


  // Create an event handler so you can call the verification on button click event or form submit
  // const handleReCaptchaVerify = async () => {
  //   if (!executeRecaptcha) {
  //     console.log('Execute recaptcha not yet available');
  //     return;
  //   }

  //   const token = await executeRecaptcha();
  //   console.log('==>', token);
  //   // Do whatever you want with the token
  // };



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
