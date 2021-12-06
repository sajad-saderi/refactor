import { useState, useEffect, useContext } from "react";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import net_CTX from "../src/context/internetConnectionCTX";
import languageCTX from "../src/context/languageCTX";

const Layout = dynamic(() => import("../src/Layout"));
const Accordion = dynamic(() => import("../src/components/Accordion"));

const Spinner = dynamic(() => import("../src/components/Spinner"));
// import Layout from "../src/Layout";
import { REQUEST_GET_FAQ } from "../src/API";
// import Accordion from "../src/components/Accordion";
// import Spinner from "../src/components/Spinner"; 
// import { logPageView } from "../utils/analytics";

const FAQ = ({ locale }) => {
  const [items, setItems] = useState([]);
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/faq",
      pageTitle: locale.PAGE_HEADER.faq.title,
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
        title={locale.PAGE_HEADER.faq.title}
        description={locale.PAGE_HEADER.faq.description}
        openGraph={{
          title: locale.PAGE_HEADER.faq.title,
          description: locale.PAGE_HEADER.faq.description,
          site_name: locale.COMMON.site_name,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <article className="responsive minHeight FAQ_Page" dir={activeLanguage === 'fa' ? 'rtl' : 'lrt'}>
        <h1>{locale.COMMON.faqTitle}</h1>
        {/* {items.length > 0 ? ( */}
        {false ? (
          items.map((item, i) => {
            return (
              <div className="FQ_WRAPPER" key={item.id}>
                {/* The first box shouldn't have title */}
                {i === 0 ? null : <h2>{item.name.fa}</h2>}
                <Accordion question_set={item.question_set} activeLanguage={activeLanguage} />
              </div>
            );
          })
        ) : (
          <div className="load_content">
            <Spinner display="inline-block" width={20} color="#737373" />
            <span>{locale.COMMON.loading}</span>
          </div>
        )}
      </article>
    </Layout>
  );
};

export default FAQ;
