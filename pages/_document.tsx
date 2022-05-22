import Document, { Head, Main, NextScript, Html } from 'next/document';
import * as Sentry from '@sentry/browser';

process.on('unhandledRejection', (err) => {
  if (process.env.NODE_ENV !== 'development') {
    Sentry.captureException(err);
  }
});

process.on('uncaughtException', (err) => {
  if (process.env.NODE_ENV !== 'development') {
    Sentry.captureException(err);
  }
});

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang={this.props.locale}>
        <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
          <link rel="icon" type="image/svg+xml" href="/FaviconBlack.svg" />
          <link rel="shortcut alternate icon" href="/favicon.ico" />
          
          <link href="/apple-icon.png" rel="apple-touch-icon" />
          <link
            href="/apple-icon-72x72.png"
            rel="apple-touch-icon"
            sizes="76x76"
          />
          <link
            href="/apple-icon-120x120.png"
            rel="apple-touch-icon"
            sizes="120x120"
          />
          <link
            href="/apple-icon-152x152.png"
            rel="apple-touch-icon"
            sizes="152x152"
          />

         
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          {/* Main Link Tags   */}
          <link
            href="/favicon-16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/favicon-48.png"
            rel="icon"
            type="image/png"
            sizes="48x48"
          />

          {/* Startup Image   */}
          <link
            href="/touch-icon-start-up-320x480.png"
            rel="apple-touch-startup-image"
          />

          {/* Pinned Tab   */}
          <link href="/logo.svg" rel="mask-icon" sizes="any" color="red" />

          {/* Android   */}
          <link href="/icon-192x192.png" rel="icon" sizes="192x192" />
          <link href="/icon-144x144.png" rel="icon" sizes="144x144" />
          <link href="/icon-128x128.png" rel="icon" sizes="128x128" />

          {/* UC Browser   */}
          <link
            href="/icon-52x52.png"
            rel="apple-touch-icon-precomposed"
            sizes="57x57"
          />
          <link href="/icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />

          {/* Manifest.json   */}
          <link href="/manifest.json" rel="manifest"></link>

          {/* HotJar tag */}
          {/* ANCHOR  Add Seo and Behavior tracker tags just in production mode */}
          {/* {process.env.NODE_ENV === "development" ? null : (
            <script
              defer
              dangerouslySetInnerHTML={{
                // NOTE Remove the <script> tag from the given code to work properly
                __html: `<!-- Hotjar Tracking Code for http://sepris.com/ -->
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:1564760,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
              }}
            ></script>
          )} */}
          {/* Google Analytics */}
          {/* {process.env.NODE_ENV === "development" ? null : (
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-147651642-1"
            ></script>
          )}
          {process.env.NODE_ENV === "development" ? null : (
            <script
              defer
              dangerouslySetInnerHTML={{
                __html: `<!-- Global site tag (gtag.js) - Google Analytics -->
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-147651642-1');
                `,
              }}
            ></script>
          )} */}

          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `<!-- Google Tag Manager -->
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TN3MV4L');
        <!-- End Google Tag Manager -->`,
            }}
          ></script>
          {/* NOTE Heap Development code : 3071100507 and production code: 329839554 */}
          {/* {process.env.NODE_ENV === "development" ? (
            <script
              defer
              dangerouslySetInnerHTML={{
                __html: `window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};
        heap.load("3071100507");`,
              }}
            ></script>
          ) : (
            <script
              defer
              dangerouslySetInnerHTML={{
                __html: `window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};
            heap.load("329839554");`,
              }}
            ></script>
          )} */}
          <meta
            name="google-site-verification"
            content="gFOWi46Gsw04kYqo8vIxO1JUlm0KUJjBzDpQRA9Bnto"
          />
          {/* <script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.GOOGLE_CAPTCHA}`}
            async
            defer
          ></script> */}
        </Head>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TN3MV4L"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />
          <div id="portal_notification" />
        </body>
      </Html>
    );
  }
}
