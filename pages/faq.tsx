import { useState, useEffect, useContext } from "react";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import net_CTX from "../src/context/internetConnectionCTX";
const Layout = dynamic(() => import("../src/Layout"));
const Accordion = dynamic(() => import("../src/components/Accordion"));

const Spinner = dynamic(() => import("../src/components/Spinner"));
// import Layout from "../src/Layout";
import { REQUEST_GET_FAQ } from "../src/API";
// import Accordion from "../src/components/Accordion";
// import Spinner from "../src/components/Spinner";
import language from "../public/languages/fa/faq.json";
// import { logPageView } from "../utils/analytics";

const FAQ = () => {
  const [items, setItems] = useState([]);
  const netCTX = useContext(net_CTX);
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view_virtual",
      pageURL: window.location.href,
      pagePath: "/faq",
      pageTitle: language.next_seo.title,
    });
    // logPageView();
    fetchAPI();
  }, []);
  const fetchAPI = async () => {
    try {
      const faq_res: any = await REQUEST_GET_FAQ();
      setItems(faq_res.items);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
    }
  };
  return (
    <Layout showToTop={true}>
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
      <article className="responsive minHeight FAQ_Page">
        <h1>{language.h1}</h1>
        {items.length > 0 ? (
          items.map((item, i) => {
            return (
              <div className="FQ_WRAPPER" key={item.id}>
                {/* The first box shouldn't have title */}
                {i === 0 ? null : <h2>{item.name.fa}</h2>}
                <Accordion question_set={item.question_set} />
              </div>
            );
          })
        ) : (
          <div className="load_content">
            <Spinner display="inline-block" width={20} color="#737373" />
            <span>{language.loading}</span>
          </div>
        )}
      </article>
    </Layout>
  );
};

export default FAQ;
