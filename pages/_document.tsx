import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="fa" dir="rtl">
        <Head>
          <meta charSet="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.ico" />

          {/* Android  */}
          <meta name="theme-color" content="#000000" />
          <meta name="mobile-web-app-capable" content="yes" />

          {/* iOS */}
          <meta name="apple-mobile-web-app-title" content="Otoli" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />

          {/* Windows   */}
          <meta name="msapplication-navbutton-color" content="red" />
          <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
          <meta name="msapplication-config" content="browserconfig.xml" />

          {/* Pinned Sites   */}
          <meta name="application-name" content="Otoli" />
          <meta name="msapplication-tooltip" content="Tooltip Text" />
          <meta name="msapplication-starturl" content="/" />

          {/* Tap highlighting   */}
          <meta name="msapplication-tap-highlight" content="no" />

          {/* UC Mobile Browser   */}
          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />

          {/* Disable night mode for this page   */}
          <meta name="nightmode" content="enable/disable" />

          {/* Fitscreen   */}
          <meta name="viewport" content="uc-fitscreen=yes" />

          {/* Layout mode  */}
          <meta name="layoutmode" content="fitscreen/standard" />

          {/* imagemode - show image even in text only mode   */}
          <meta name="imagemode" content="force" />

          {/* Orientation   */}
          <meta name="screen-orientation" content="portrait" />

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
          <meta name="msapplication-TileColor" content="#000000" />

          {/* Main Link Tags   */}
          <link
            href="favicon-16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          {/* <link
            href="favicon-32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          /> */}
          <link
            href="favicon-48.png"
            rel="icon"
            type="image/png"
            sizes="48x48"
          />

          {/* iOS   */}
          {/* <link href="touch-icon-iphone.png" rel="apple-touch-icon" />
          <link
            href="touch-icon-ipad.png"
            rel="apple-touch-icon"
            sizes="76x76"
          />
          <link
            href="touch-icon-iphone-retina.png"
            rel="apple-touch-icon"
            sizes="120x120"
          />
          <link
            href="touch-icon-ipad-retina.png"
            rel="apple-touch-icon"
            sizes="152x152"
          /> */}

          {/* Startup Image   */}
          <link
            href="touch-icon-start-up-320x480.png"
            rel="apple-touch-startup-image"
          />

          {/* Pinned Tab   */}
          <link
            href="path/to/icon.svg"
            rel="mask-icon"
            sizes="any"
            color="red"
          />

          {/* Android   */}
          <link href="icon-192x192.png" rel="icon" sizes="192x192" />
          <link href="icon-128x128.png" rel="icon" sizes="128x128" />

          {/* Others  */}
          <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />

          {/* UC Browser   */}
          <link
            href="images/icon-52x52.png"
            rel="apple-touch-icon-precomposed"
            sizes="57x57"
          />
          <link
            href="images/icon-72x72.png"
            rel="apple-touch-icon"
            sizes="72x72"
          />

          {/* Manifest.json   */}
          <link href="/manifest.json" rel="manifest"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}