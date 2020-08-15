import React from "react";
import App from "next/app";
import Router from "next/router";
import * as Sentry from "@sentry/browser";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

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
    window["__recaptchaCallback"] = () => {
      if (window["grecaptcha"]) {
        window["grecaptcha"]
          .execute("6LcJG78ZAAAAAD3u-1dQGeApdBcQeMoTe9ju17SJ", {
            action: "homepage",
          })
          .then(() => {
            var url = "https://recaptchaotoli.herokuapp.com/recaptcha/";
            var xhr = new XMLHttpRequest();
            xhr.open(
              "GET",
              url + "?g-recaptcha-response=" + this.state.token,
              true
            );
            xhr.onreadystatechange = function (data) {
              if (
                this.readyState === XMLHttpRequest.DONE &&
                this.status === 200
              ) {
                var responseJson = JSON.parse(xhr.response);
                window["dataLayer"].push({
                  event: "recaptcha",
                  recaptchaAnswer: responseJson.status,
                  recaptchaScore: responseJson.recaptcha.score,
                });
              }
            };
            xhr.send();
          });
      }
    };

    window["__recaptchaCallback"]();
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <GoogleReCaptchaProvider reCaptchaKey={process.env.GOOGLE_CAPTCHA}>
        <Component {...pageProps} />
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
