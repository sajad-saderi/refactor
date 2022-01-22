import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import net_CTX from '../src/context/internetConnectionCTX';
import HelpCenterContainer from '../src/containers/helpCenterContainer';
const Layout = dynamic(() => import('../src/Layout'));
import { NextSeo } from 'next-seo';

const HelpCenter = ({ locale }) => {
  const [UrlList, UrlSetter] = useState([]);
  const netCTX = useContext(net_CTX);

  useEffect(() => {
    // window['dataLayer'].push({
    //   event: 'page_view',
    //   pageURL: window.location.href,
    //   pagePath: '/help-center',
    //   pageTitle: locale.PAGE_HEADER.helpCenter.title,
    // });
    // logPageView();
  }, []);

  return (
    <Layout>
      <NextSeo
        title={locale.PAGE_HEADER.helpCenter.title}
        description={locale.PAGE_HEADER.helpCenter.description}
        openGraph={{
          title: locale.PAGE_HEADER.helpCenter.title,
          description: locale.PAGE_HEADER.helpCenter.description,
          site_name: locale.COMMON.site_name,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <article className='responsive  minHeight help_center'>
        <HelpCenterContainer />
      </article>
    </Layout>
  );
};

export default HelpCenter;
