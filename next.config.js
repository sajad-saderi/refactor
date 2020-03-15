// next.config.js

const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const withFonts = require("next-fonts");

module.exports = withFonts(
  withCSS(
    withSass(
      withImages({
        /* config options here */
        env: {
          SITE_URL: "https://otoli.net",
          PRODUCTION_ENDPOINT: "https://core.otoli.net"
        },
        webpack(config, options) {
          return config;
        }
      })
    )
  )
);
