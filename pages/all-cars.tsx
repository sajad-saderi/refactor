import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// const Search_result = dynamic(() => import("../src/containers/Search_result"));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
// import { logPageView } from "../utils/analytics";
import { payBackInString } from '../utils/date-range-creator';
import Search_result from '../src/containers/Search_result';
import { guard_controller } from '../utils/guard_controller';
import ContentHomePage from '../src/components/contentHomePage';
import { useRouter } from 'next/router';

const AllCars = ({ content, locale }) => {
  const [authorize, set_authorize] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const searchedLocation = localStorage["searchedLocation"]
      ? localStorage["searchedLocation"]
      : router.query?.location_name
        ? router.query.location_name
        : "all";
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/all-cars',
      pageTitle: `${locale.PAGE_HEADER.search.title}`,
      searchedLocation
    });
    const guard = guard_controller();
    if (guard !== 'auth') {
      set_authorize(false);
    }
    // logPageView();
  }, []);

  return (
    <Layout>
      <NextSeo
        title={locale.PAGE_HEADER.search.title}
        description={locale.PAGE_HEADER.search.description}
        openGraph={{
          title: locale.PAGE_HEADER.search.title,
          description: locale.PAGE_HEADER.search.description,
          site_name: locale.COMMON.sepris,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <Search_result
        language={locale}
        revealRsearchbBox={true}
        showLocationTag={true}
      />
      {content == '0' ? null : (
        <ContentHomePage
          auth={authorize}
          differentStyle={true}
          language={locale}
          showSlider
        />
      )}
    </Layout>
  );
};

export async function getServerSideProps(props) {
  let content = props.query.content;

  return { props: { content: content ? content : null } };
}

export default AllCars;
