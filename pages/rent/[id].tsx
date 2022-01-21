import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../../src/Layout'));
const Landing_Page_Content = dynamic(() =>
  import('../../src/containers/LandignPageContainer/landingPageContent')
);
// import Layout from "../../src/Layout";
import { REQUEST_GET_LANDING_PAGE } from '../../src/API';
import { NextSeo } from 'next-seo';
// import Landing_Page_Content from "../../src/containers/LandignPageContainer/landingPageContent";
import Router from 'next/router';
// import { logPageView } from "../../utils/analytics";

// const Landing_page_container = dynamic(() =>
// import("../../src/containers/LandignPageContainer")
// );
import Landing_page_container from '../../src/containers/LandignPageContainer';
import { guard_controller } from '../../utils/guard_controller';
import ContentHomePage from '../../src/components/contentHomePage';
import appState from '../../src/context/app';

const Rent_dynamic = ({ Landing_page, content, locale }) => {
  const [authorize, set_authorize] = useState(true);
  const { setLocation } = useContext(appState);
  useEffect(() => {
    if (!Landing_page) {
      Router.push('/404');
    } else {
      window['dataLayer'].push({
        event: 'page_view',
        pageURL: window.location.href,
        pagePath: `/rent/${Landing_page.unique_id}`,
        pageTitle: Landing_page.meta_title,
        searchedLocation: Landing_page.search_params?.location_name
          ? Landing_page.search_params?.location_name
          : 'all',
      });
      console.log(Landing_page);

      if (Landing_page.search_params?.location_id) {
        setLocation({
          value: Landing_page.search_params.location_id,
          text: Landing_page.search_params.location_name,
          en: Landing_page.search_params.location_name,
        });
      }
    }
    const guard = guard_controller();
    if (guard !== 'auth') {
      set_authorize(false);
    }
  }, []);

  return Landing_page ? (
    <Layout>
      <NextSeo
        title={Landing_page.meta_title}
        description={Landing_page.meta_description}
        canonical={Landing_page.canonical_url}
        openGraph={{
          title: `${Landing_page.meta_title}`,
          description: Landing_page.meta_description,
          site_name: locale.COMMON.sepris,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <Landing_page_container
        landing_data={Landing_page}
        language={locale}
        content={content === '0' ? false : true}
      />
      {content === '0' ? (
        <ContentHomePage
          auth={authorize}
          differentStyle={true}
          language={locale}
        />
      ) : (
        <Landing_Page_Content data={Landing_page} language={locale} />
      )}
    </Layout>
  ) : null;
};

/**
 *
 * @param props
 *  This page needs to render server-side and get the id of dynamic route
 *  At incoming data there are meta data for dynamic page that should set on Next-Seo
 *  With the id we do rest of work
 */
export async function getServerSideProps(props) {
  let content = props.query.content;
  try {
    const landing_res: any = await REQUEST_GET_LANDING_PAGE({
      name: props.query.id,
    });
    return {
      props: {
        Landing_page: landing_res.data,
        content: content ? content : null,
      },
    };
  } catch (error) {
    return {
      props: {
        Landing_page: false,
        content: null,
      },
    };
  }
}

export default Rent_dynamic;
