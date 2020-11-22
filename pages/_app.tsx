import React, { Context } from "react";
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
  // static async getInitialProps({ Component, ctx }) {
  //     let pageProps = {};

  //     if (Component.getInitialProps) {
  //         pageProps = await Component.getInitialProps(ctx);
  //     }

  //     return { pageProps };
  // }

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

  Captcha = () => {
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
              Axios.get(url + "?g-recaptcha-response=" + this.state.token)
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
    // Initial React GA library after the mount
    // if (!window["GA_INITIALIZED"]) {
    //   initGA();
    //   window["GA_INITIALIZED"] = true;
    // }
    const userId = jsCookie.get("user_id");
    if (userId && sessionStorage["flag"] !== "true") {
      sessionStorage["flag"] = true;
      this.get_user_data(userId);
    }
  };

  get_user_data = async (id) => {
    try {
      const response: any = await REQUEST_GET_USER_INFO({ id });
      jsCookie.set("complete_register", response.first_name ? true : null);
      jsCookie.set("name", response.name);
      jsCookie.set("company_name", response.company_name);
      if (response.username) {
        jsCookie.set("username", response.username);
      }
      jsCookie.set(
        "thumbnail_url",
        response.thumbnail_url
          ? response.thumbnail_url
          : "https://core.otoli.net/static/core/default_profile_pic.png"
      );
      this.setState({ user_data: { ...response } });
    } catch (error) {
      sessionStorage["flag"] = false;
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
            user_data: this.state.user_data,
          }}
        >
          <Component {...pageProps} BotScore={this.state.BotScore} />
        </user_context.Provider>

        <GoogleReCaptcha
          onVerify={(token) =>
            this.setState({ token }, () => {
              this.Captcha();
            })
          }
        />
      </GoogleReCaptchaProvider>
    );
  }
}

export default App_Otoli;
