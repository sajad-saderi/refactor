import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
const Search = dynamic(() => import("../src/containers/Search"));
// import Layout from "../src/Layout";
// import Search from "../src/containers/Search";
import language from "../public/languages/fa/homepage.json";
import { guard_controller } from "../utils/guard_controller";
import ContentHomePage from "../src/components/contentHomePage";
// import { logPageView } from "../utils/analytics";

const HomePage = () => {
  const [authorize, set_authorize] = useState(true);
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/",
      pageTitle: language.next_seo.title,
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
        canonical="https://sepris.com/"
        title={language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
          site_name: language.next_seo.site_name,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      <article className="Homepage">
        <div className="banner">
          <h1>{language.banner_h1}</h1>
          <h2>{language.banner_h2}</h2>
          <div className="search_container responsive">
            {/* Render search box in the Home page */}
            <Search language={language} />
          </div>
        </div>
        <ContentHomePage auth={authorize} />
      </article>
    </Layout>
  );
};

export default HomePage;
