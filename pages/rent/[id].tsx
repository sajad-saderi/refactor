import { useEffect } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../../src/Layout"));
const Landing_Page_Content = dynamic(() =>
  import("../../src/containers/LandignPageContainer/landingPageContent")
);
// import Layout from "../../src/Layout";
import { REQUEST_GET_LANDING_PAGE } from "../../src/API";
import { NextSeo } from "next-seo";
// import Landing_Page_Content from "../../src/containers/LandignPageContainer/landingPageContent";
import Router from "next/router";
import language from "../../public/languages/fa/dynamic_pages.json";
// import { logPageView } from "../../utils/analytics";

// const Landing_page_container = dynamic(() =>
// import("../../src/containers/LandignPageContainer")
// );
import Landing_page_container from "../../src/containers/LandignPageContainer";

const Rent_dynamic = ({ Landing_page, content }) => {
  useEffect(() => {
    if (!Landing_page) {
      Router.push("/404");
    } else {
      window["dataLayer"].push({
        event: "page_view",
        pageURL: window.location.href,
        pagePath: `/rent/${Landing_page.unique_id}`,
        pageTitle: Landing_page.meta_title,
        searchedLocation: Landing_page.search_params?.location_name
          ? Landing_page.search_params?.location_name
          : "all",
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
      {content === "0" ? null : (
        <Landing_Page_Content data={Landing_page} language={language} />
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
