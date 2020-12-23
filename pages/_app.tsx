import React from "react";
import App from "next/app";
import Router from "next/router";
import * as Sentry from "@sentry/browser";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import Axios from "axios";
// import { initGA } from "../utils/analytics";
import { REQUEST_GET_USER_INFO } from "../src/API";
import jsCookie from "js-cookie";
import user_context from "../src/context/User_info";

Sentry.init({
  dsn: process.env.SENTRY,
});

Router.events.on("routeChangeError", (err, url) => {
  //console.log(`Error loading: ${url}`);
  // Router.push("/500");
});

Router.events.on("routeChangeComplete", (url) => {
  if (url.indexOf("/rent/") !== -1 || url.indexOf("/search-result?") !== -1) {
    return;
  }
  window.scrollTo(0, 0);
  // copied from https://github.com/zeit/next-plugins/issues/282#issuecomment-480740246
});

// Send the Data Layer to the GTA on a route starting to change
// Router.events.on('routeChangeStart', url => {
//     console.log("dataLayer", `${url}`);
//     // window["dataLayer"].push({ 'event': 'virtualPageView' });
//     window["dataLayer"].push({
//         'event': 'virtualPageView',
//         'page': {
//             'url': `${url}`
//         }
//     });
// });

class App_Otoli extends App {
  state = {
    token: null,
    BotScore: null,
    user_data: null,
  };
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV !== "development") {
      Sentry.withScope((scope) => {
        Object.keys(errorInfo).forEach((key) => {
          scope.setExtra(key, errorInfo[key]);
        });

        Sentry.captureException(error);
      });
      super.componentDidCatch(error, errorInfo);
    }
  }

  Captcha = (token) => {
    let scoreData = null;
    try {
      window["__recaptchaCallback"] = () => {
        if (window["grecaptcha"]) {
          window["grecaptcha"]
            .execute(process.env.GOOGLE_CAPTCHA, {
              action: window.location.pathname.slice(1).replace(/-/, ""),
            })
            .then(() => {
              var url = "https://recaptchaotoli.herokuapp.com/recaptcha/";
              Axios.get(url + "?g-recaptcha-response=" + token)
                .then((res) => {
                  this.setState({ BotScore: res.data.recaptcha.score });
                  scoreData = res;
                  window["dataLayer"].push({
                    event: "recaptcha",
                    recaptchaAnswer: res.data.status,
                    recaptchaScore: res.data.recaptcha.score,
                  });
                })
                .then(() => {
                  Axios.post("https://recaptchaotoli.herokuapp.com/verify/", {
                    success: true, // whether this request was a valid reCAPTCHA token for your site
                    score: scoreData.data.recaptcha.score, // the score for this request (0.0 - 1.0)
                    action: window.location.pathname.slice(1).replace(/-/, ""), // the action name for this request (important to verify)
                    hostname: window.location.href, // the hostname of the site where the reCAPTCHA was solved
                  })
                    .then((res) => {
                      if (window["heap"]) {
                        window["heap"].addUserProperties({
                          RecaptchaScore: scoreData.data.recaptcha.score,
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
      window["__recaptchaCallback"]();
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount = () => {
    const userId = jsCookie.get("user_id");
    const token = jsCookie.get("token");
    const first_name = jsCookie.get("first_name");
    if (userId) {
      this.get_user_data(userId, token);
      window["auth"] = true;

      if (first_name) {
        window["complete_register"] = true;
      }
    } else {
      window["auth"] = false;
      window["complete_register"] = false;
    }
    /*
        It checks the current URL if there are any UTM values in there
        NOTE 
          If user login, these information will sended to API
            "/core/device/send-code"
      */
    if (Router.router.query.utm_source) {
      localStorage["utm_source"] = Router.query.utm_source;
      localStorage["utm_medium"] = Router.query.utm_medium;
      localStorage["utm_campaign"] = Router.query.utm_campaign;
      localStorage["utm_term"] = Router.query.utm_term;
      localStorage["utm_content"] = Router.query.utm_content;
    }
    alert(document.referrer);
    localStorage["utm_landing_url"] = Router.router.asPath;
    localStorage["utm_referrer"] = document.referrer;
  };

  get_user_data = async (id, token) => {
    try {
      const response: any = await REQUEST_GET_USER_INFO({ id });
      if (response.first_name)
        jsCookie.set("first_name", response.first_name, {
          expires: 100,
        });
      this.setState({ user_data: { ...response, token } });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <GoogleReCaptchaProvider reCaptchaKey={process.env.GOOGLE_CAPTCHA}>
        <user_context.Provider
          value={{
            update_user_data: (v) => {
              this.setState({
                user_data: v,
              });
            },
            data: this.state.user_data,
          }}
        >
          <Component {...pageProps} BotScore={this.state.BotScore} />
        </user_context.Provider>

        <GoogleReCaptcha
          onVerify={(token) => {
            this.Captcha(token);
            this.setState({ token });
          }}
        />
      </GoogleReCaptchaProvider>
    );
  }
}

export default App_Otoli;
