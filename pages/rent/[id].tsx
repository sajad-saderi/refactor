import React from "react";
import Landing_page_container from "../../src/containers/LandignPageContainer";
import Layout from "../../src/Layout";
import { REQUEST_GET_LANDING_PAGE } from "../../src/API";
import { NextSeo } from "next-seo";
import Landing_Page_Content from "../../src/containers/LandignPageContainer/landingPageContent";
import Router from "next/router";
import language from "../../public/languages/fa/dynamic_pages.json";
// import { logPageView } from "../../utils/analytics";

const Rent_dynamic = ({ Landing_page }) => {
  React.useEffect(() => {
    if (!Landing_page) {
      Router.push("/404");
    } else {
      window["dataLayer"].push({
        event: "virtualPageView",
        pageURL: window.location.href,
        pagePath: `/rent/${Landing_page.meta_title}`,
        pageTitle: Landing_page.meta_title,
      });
      // logPageView();
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
          site_name: language.site_name,
        }}
        twitter={{
          handle: language.handle,
          site: language.site,
          cardType: language.cardType,
        }}
      />
      <Landing_page_container landing_data={Landing_page} language={language} />
      <Landing_Page_Content data={Landing_page} language={language} />
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
  try {
    const landing_res: any = await REQUEST_GET_LANDING_PAGE({
      name: props.query.id,
    });
    return {
      props: {
        Landing_page: landing_res.data,
      },
    };
  } catch (error) {
    return {
      props: {
        Landing_page: false,
      },
    };
  }
}

export default Rent_dynamic;
