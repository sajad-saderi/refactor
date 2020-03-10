// next.config.js

const withSass = require("@zeit/next-sass");

module.exports = withSass({
  /* config options here */
  env: {
    SITE_URL: "https://otoli.net",
    PRODUCTION_ENDPOINT: "https://core.otoli.net"
  }
});
