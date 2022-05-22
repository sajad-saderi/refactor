// next.config.js
const withFonts = require('next-fonts');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const dev = process.env.NODE_ENV === 'production';

module.exports = withPWA(
  withFonts({
      i18n: {
        locales: ['en', 'fa'],
        defaultLocale: 'fa',
        localeDetection: false,
      },
      images: { 
        domains: ['core.sepris.com']
      },
      pwa: {
        disable: dev ? false : true,
        runtimeCaching,
        dest: 'public',
      },
      env: {
        SITE_URL: 'https://sepris.com',
        PRODUCTION_ENDPOINT: 'https://core.sepris.com',
        SENTRY:
          'https://ea691a89876c41c6b1e016d8a0f204af@o578542.ingest.sentry.io/5734819',
        // "https://5457324b508844abba775737bc14838e@sentry.io/1547488",
        GOOGLE_CAPTCHA: '6Ler8sIZAAAAAP_s64xgDM2HCm03wCuARkotJani',
      },
      webpack(config, options) {
        compress = true;
        return config;
      },
      crossOrigin: 'anonymous',
    },
  ),
);
