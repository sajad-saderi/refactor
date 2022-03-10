import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Search = dynamic(() => import('../src/containers/Search'));
import { guard_controller } from '../utils/guard_controller';
import ContentHomePage from '../src/components/contentHomePage';

const HomePage = ({ locale }) => {
  const [authorize, set_authorize] = useState(true);
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/',
      pageTitle: locale.PAGE_HEADER.home.title
    });
    const guard = guard_controller();
    if (guard !== 'auth') {
      set_authorize(false);
    }
  }, []);

  return (
    <Layout>
      <NextSeo
        canonical={process.env.SITE_URL}
        title={locale.PAGE_HEADER.home.title}
        description={locale.PAGE_HEADER.home.description}
        openGraph={{
          title: locale.PAGE_HEADER.home.title,
          description: locale.PAGE_HEADER.home.description,
          site_name: locale.COMMON.sepris,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <article className="Homepage">
        <div className="banner">
          <h1>{locale.HOME_PAGE.banner}</h1>
          <h2>{locale.HOME_PAGE.note}</h2>
          <div className="search_container responsive">
            <Search language={locale} />
          </div>
        </div>
        <ContentHomePage auth={authorize} language={locale} showSlider/>
      </article>
    </Layout>
  );
};

export default HomePage;
