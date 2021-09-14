import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import net_CTX from "../src/context/internetConnectionCTX";
import HelpCenterContainer from "../src/containers/helpCenterContainer";
import language from "../public/languages/fa/helpCenter.json";
const Layout = dynamic(() => import("../src/Layout"));
import { NextSeo } from "next-seo";

const HelpCenter = () => {
  const [UrlList, UrlSetter] = useState([]);
  const netCTX = useContext(net_CTX);

  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/help-center",
      pageTitle: language.next_seo.title,
      userLocationInformation: JSON.parse(
        localStorage["userLocationInformation"]
      ),
    });
    // logPageView();
  }, []);

  return (
    <Layout>
      <NextSeo
        title={language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      <article className="responsive  minHeight help_center">
        <HelpCenterContainer />
      </article>
    </Layout>
  );
};

export default HelpCenter;
