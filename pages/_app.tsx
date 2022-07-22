import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import * as Sentry from '@sentry/browser';
import { REQUEST_GET_USER_INFO } from '../src/API';
import '../src/components/datePicker/DatePicker.css';

import Image from 'next/image';
import jsCookie from 'js-cookie';
import user_context from '../src/context/User_info';
import LanguageCTX, {
  ChangeLanguageContextProvider
} from '../src/context/languageCTX';
import logo from '../public/android-icon-48x48.png';
import '../src/styles/main.scss';
import { InternetConnectionContextProvider } from '../src/context/internetConnectionCTX';
import fa from '../public/languages/fa.json';
import en from '../public/languages/en.json';
import CssController from '../src/containers/CssController';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import {
//   GoogleReCaptchaProvider,
//   GoogleReCaptcha,
// } from "react-google-recaptcha-v3";
import Axios from 'axios';
// import { initGA } from "../utils/analytics";
import { AppStoreWrapper } from '../src/context/app';
import Icon from '../src/components/Icons';

Sentry.init({
  dsn: process.env.SENTRY
});

Router.events.on('routeChangeComplete', (url) => {
  if (url.indexOf('/rent/') !== -1 || url.indexOf('/search-result?') !== -1) {
    return;
  }
  window.scrollTo(0, 0);
});

let deferredPrompt = null;
let pwa_flag = false;

class App_Otoli extends App {
  state = {
    token: null,
    BotScore: null,
    user_data: null,
    showPwaBanner: false,
    colorArray: ['#EC7F00', '#14808E', '#7A3B69', '#2A562A', '#116B98'],
    backgroundColor: '',
    language: fa
  };
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV !== 'development') {
      Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });

        Sentry.captureException(error);
        window['ga']('send', 'exception', {
          exDescription: error.message
        });
      });
      super.componentDidCatch(error, errorInfo);
    }
  }

  Captcha = (token) => {
    let scoreData = null;
    try {
      window['__recaptchaCallback'] = () => {
        if (window['grecaptcha']) {
          window['grecaptcha']
            .execute(process.env.GOOGLE_CAPTCHA, {
              action: window.location.pathname.slice(1).replace(/-/, '')
            })
            .then(() => {
              var url = 'https://recaptchaotoli.herokuapp.com/recaptcha/';
              Axios.get(url + '?g-recaptcha-response=' + token)
                .then((res) => {
                  this.setState({ BotScore: res.data.recaptcha.score });
                  scoreData = res;
                  window['dataLayer'].push({
                    event: 'recaptcha',
                    recaptchaAnswer: res.data.status,
                    recaptchaScore: res.data.recaptcha.score
                  });
                })
                .then(() => {
                  Axios.post('https://recaptchaotoli.herokuapp.com/verify/', {
                    success: true, // whether this request was a valid reCAPTCHA token for your site
                    score: scoreData.data.recaptcha.score, // the score for this request (0.0 - 1.0)
                    action: window.location.pathname.slice(1).replace(/-/, ''), // the action name for this request (important to verify)
                    hostname: window.location.href // the hostname of the site where the reCAPTCHA was solved
                  })
                    .then((res) => {
                      if (window['heap']) {
                        window['heap'].addUserProperties({
                          RecaptchaScore: scoreData.data.recaptcha.score
                        });
                      }
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                })
                .catch((e) => {
                  console.log(e);
                });
            })
            .catch((e) => {
              console.log(e);
            });
        }
      };
      window['__recaptchaCallback']();
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount = () => {
    const userId = jsCookie.get('user_id');
    const token = jsCookie.get('token');
    const first_name = jsCookie.get('first_name');
    window['locale'] = {
      fa: { textInputComponent: fa.COMMON.notValid },
      en: { textInputComponent: en.COMMON.notValid }
    };
    if (userId) {
      this.get_user_data(userId, token);
      window['auth'] = true;

      if (first_name) {
        window['complete_register'] = true;
      }
    } else {
      window['auth'] = false;
      window['complete_register'] = false;
    }
    /*
        It checks the current URL if there are any UTM values in there
        NOTE 
          If user login, these information will sended to API
            "/core/device/send-code"
      */
    localStorage['utm_landing_url'] = Router.router.pathname;
    localStorage['utm_referrer'] = document.referrer;

    sessionStorage['guid'] = window
      .btoa(
        Array.from(window.crypto.getRandomValues(new Uint8Array(20 * 2)))
          .map((b) => String.fromCharCode(b))
          .join('')
      )
      .replace(/[+/]/g, '')
      .substring(0, 20);

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      if (!pwa_flag) {
        this.AnalyticsEvent('pwa', 'install-banner', 'shown');
        this.setState({
          showPwaBanner: true
        });
      }
      return false;
    });

    this.setState({
      backgroundColor: this.state.colorArray[
        Math.floor(Math.random() * this.state.colorArray.length)
      ]
    });
  };

  AnalyticsEvent = (eventCategory, eventAction, eventLabel) => {
    if (window['ga']) {
      window['ga']('send', {
        hitType: 'event',
        eventCategory,
        eventAction,
        eventLabel
      });
    }
  };

  customPwaPrompt = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          this.AnalyticsEvent('pwa', 'install-prompt', 'accepted');
          window['dataLayer'].push({
            event: 'GAEvent',
            eventCategory: 'pwa',
            eventAction: 'install-prompt',
            eventLabel: 'accepted',
            eventValue: ''
          });
        } else {
          window['dataLayer'].push({
            event: 'GAEvent',
            eventCategory: 'pwa',
            eventAction: 'install-prompt',
            eventLabel: 'rejected',
            eventValue: ''
          });
          this.AnalyticsEvent('pwa', 'install-prompt', 'rejected');
        }
        pwa_flag = true;
        deferredPrompt = null;
        this.setState({
          showPwaBanner: false
        });
      });
    }
  };

  get_user_data = async (id, token) => {
    try {
      const response: any = await REQUEST_GET_USER_INFO({ id });
      if (response.first_name)
        jsCookie.set('first_name', response.first_name, {
          expires: 100
        });
      this.setState({ user_data: { ...response, token } });
    } catch (error) {
      if (error === 111) {
        alert(this.state.language.COMMON.internetConnectionError);
      } else alert(this.state.language.COMMON.errorInUserInfo);
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          {/* <meta
           name='viewport'
           content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1'
         /> */}
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1,shrink-to-fit=no'
          />
          <meta name='enamad' content='145408' />
          <meta name='thumbnail' content='../public/image/for_journey.jpeg' />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
          {/* Android  */}
          <meta name='theme-color' content='#000000' />
          <meta name='mobile-web-app-capable' content='yes' />

          {/* iOS */}
          <meta name='apple-mobile-web-app-title' content='Sepris' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='default'
          />
          {/* Windows   */}
          <meta name='msapplication-navbutton-color' content='red' />
          <meta name='msapplication-TileImage' content='ms-icon-144x144.png' />
          <meta name='msapplication-config' content='browserconfig.xml' />

          {/* Pinned Sites   */}
          <meta name='application-name' content='Sepris' />
          <meta name='msapplication-tooltip' content='Tooltip Text' />
          <meta name='msapplication-starturl' content='/' />

          {/* Tap highlighting   */}
          <meta name='msapplication-tap-highlight' content='no' />

          {/* UC Mobile Browser   */}
          <meta name='full-screen' content='yes' />
          <meta name='browsermode' content='application' />

          {/* Disable night mode for this page   */}
          <meta name='nightmode' content='enable/disable' />

          {/* Fitscreen   */}
          <meta name='viewport' content='uc-fitscreen=yes' />

          {/* Layout mode  */}
          <meta name='layoutmode' content='fitscreen/standard' />

          {/* imagemode - show image even in text only mode   */}
          <meta name='imagemode' content='force' />

          {/* Orientation   */}
          <meta name='screen-orientation' content='portrait' />
          <meta name='msapplication-TileColor' content='#000000' />
        </Head>
        {/* <GoogleReCaptchaProvider reCaptchaKey={process.env.GOOGLE_CAPTCHA}> */}
        <ChangeLanguageContextProvider>
          <LanguageCTX.Consumer>
            {(value) => (
              <>
                {this.state.showPwaBanner ? (
                  <section
                    className={`pwa_invitation_banner ${
                      Router.router.locale === 'fa' ? '' : 'pwaLtr'
                    }`}>
                    <div
                      className='pwa_content HEAP_PWA_INVITATION'
                      onClick={this.customPwaPrompt}>
                      <div className='logPwa'>
                        <Image
                          src={logo}
                          alt='pwa logo icon'
                          height={36}
                          width={36}
                        />
                      </div>
                      {Router.router.locale === 'fa'
                        ? fa.COMMON.installApp
                        : en.COMMON.installApp}
                    </div>
                    <p
                      className='close_pwa_invitation'
                      onClick={() => {
                        this.AnalyticsEvent('pwa', 'install-banner', 'closed');
                        this.setState({
                          showPwaBanner: false
                        });
                      }}>
                      <Icon
                        name='close'
                        width='16px'
                        height='16px'
                        color='#ffffff'
                      />
                      {Router.router.locale === 'fa'
                        ? fa.COMMON.close
                        : en.COMMON.close}
                    </p>
                  </section>
                ) : null}
                <InternetConnectionContextProvider>
                  <AppStoreWrapper>
                    <user_context.Provider
                      value={{
                        update_user_data: (v) => {
                          this.setState({
                            user_data: v
                          });
                        },
                        data: this.state.user_data,
                        avatartBackgroundColor: this.state.backgroundColor
                      }}>
                      <CssController locale={value.activeLanguage}>
                        <Component
                          {...pageProps}
                          BotScore={this.state.BotScore}
                          locale={this.props.router.locale === 'fa' ? fa : en}
                        />
                      </CssController>
                    </user_context.Provider>
                  </AppStoreWrapper>
                </InternetConnectionContextProvider>
              </>
            )}
          </LanguageCTX.Consumer>
        </ChangeLanguageContextProvider>
        {/* </GoogleReCaptchaProvider > */}
      </>
    );
  }
}

export default App_Otoli;
