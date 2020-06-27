import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import * as Sentry from '@sentry/browser';

Sentry.init({
    dsn: 'https://5457324b508844abba775737bc14838e@sentry.io/1547488'
});

Router.events.on('routeChangeError', (err, url) => {
    //console.log(`Error loading: ${url}`);
    Router.push('/500')
});

Router.events.on('routeChangeStart', url => {
    console.log("dataLayer", `${url}`);
    window["dataLayer"].push({ 'event': 'virtualPageView' });
});

class App_Otoli extends App {

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

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

    render() {
        const { Component, pageProps } = this.props
        return (
            <Component {...pageProps} />
        );
    }
}

export default App_Otoli;
