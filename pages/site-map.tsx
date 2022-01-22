import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import net_CTX from '../src/context/internetConnectionCTX';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { REQUEST_GET_URLS_FOR_SITE_MAP } from '../src/API';
// import { logPageView } from "../utils/analytics";

const Site_map = ({ locale }) => {
  const [UrlList, UrlSetter] = useState([]);
  const netCTX = useContext(net_CTX);

  useEffect(() => {
    // window['dataLayer'].push({
    //   event: 'page_view',
    //   pageURL: window.location.href,
    //   pagePath: '/site-map',
    //   pageTitle: locale.PAGE_HEADER.siteMap.title,
    // });
    // logPageView();
    fetchAPIs();
  }, []);

  /**
   * Get the list of Dynamic Urls
   */
  const fetchAPIs = async () => {
    try {
      const res: any = await REQUEST_GET_URLS_FOR_SITE_MAP();
      UrlSetter(res.items);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
    }
  };

  return (
    <Layout>
      <NextSeo
        title={locale.PAGE_HEADER.siteMap.title}
        description={locale.PAGE_HEADER.siteMap.title}
        openGraph={{
          title: locale.PAGE_HEADER.siteMap.title,
          description: locale.PAGE_HEADER.siteMap.title,
          site_name: locale.COMMON.sepris,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <article className='responsive static_pages minHeight site_map_page'>
        {UrlList.length > 0 && (
          <ul>
            {UrlList.map((i) => {
              return (
                <li style={{ margin: '5px 0' }} key={i.unique_id}>
                  <Link
                    href='/rent/[id]'
                    as={`/rent/${i.unique_id}`}
                    prefetch={false}
                  >
                    <a>{i.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </article>
    </Layout>
  );
};

export default Site_map;
