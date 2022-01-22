import axios from 'axios';

export const captcha = (token) => {
  let scoreData = null;
  try {
    window['__recaptchaCallback'] = () => {
      if (window['grecaptcha']) {
        window['grecaptcha']
          .execute(process.env.GOOGLE_CAPTCHA, {
            action: window.location.pathname.slice(1).replace(/-/, ''),
          })
          .then(() => {
            var url = 'https://recaptchaotoli.herokuapp.com/recaptcha/';
            axios
              .get(url + '?g-recaptcha-response=' + token)
              .then((res) => {
                scoreData = res;
                // window["dataLayer"].push({
                //     event: "recaptcha",
                //     recaptchaAnswer: res.data.status,
                //     recaptchaScore: res.data.recaptcha.score,
                // });
                return { BotScore: res.data.recaptcha.score };
              })
              .then(() => {
                axios.post('https://recaptchaotoli.herokuapp.com/verify/', {
                  success: true, // whether this request was a valid reCAPTCHA token for your site
                  score: scoreData.data.recaptcha.score, // the score for this request (0.0 - 1.0)
                  action: window.location.pathname.slice(1).replace(/-/, ''), // the action name for this request (important to verify)
                  hostname: window.location.href, // the hostname of the site where the reCAPTCHA was solved
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
