import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
// const Search_result = dynamic(() => import("../src/containers/Search_result"));
// import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/searchresult.json";
// import { logPageView } from "../utils/analytics";
import { payBackInString } from "../utils/date-range-creator";
import Search_result from "../src/containers/Search_result";
import { guard_controller } from "../utils/guard_controller";
import ContentHomePage from "../src/components/contentHomePage";

const AllCars = ({ content }) => {
  const [authorize, set_authorize] = useState(true);

  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/all-cars",
      pageTitle: `${language.next_seo.title.start}${language.next_seo.title.otoli}`,
    });
    const guard = guard_controller();
    if (guard !== "auth") {
      set_authorize(false);
    }
    // logPageView();
  }, []);

  return (
    <Layout>
      <NextSeo
        title={`${language.next_seo.title.start}${language.next_seo.title.otoli}`}
        description={language.nextSeo_description}
        openGraph={{
          title: `${language.next_seo.title.start}${language.next_seo.title.otoli}`,
          description: language.next_seo.description,
          site_name: language.next_seo.site_name,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      <Search_result
        language={language}
        revealRsearchbBox={true}
        showLocationTag={true}
      />
      {content == "0" ? null : (
        <ContentHomePage auth={authorize} differentStyle={true} />
      )}
    </Layout>
  );
};

export async function getServerSideProps(props) {
  let content = props.query.content;

  return { props: { content: content ? content : null } };
}

export default AllCars;
