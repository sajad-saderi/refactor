import { useState, useEffect, useContext } from "react";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../../src/Layout"));
const Search = dynamic(() => import("../../src/containers/Search"));
const Accordion = dynamic(() => import("../../src/components/Accordion"));
// import Layout from "../../src/Layout";
// import Search from "../../src/containers/Search";
import insurance from "../../public/image/SamanInsurance.png";
// import "../../src/styles/pages/index.scss";
import Link from "next/link";
import { REQUEST_GET_LANDING_PAGE } from "../../src/API";
// import Accordion from "../../src/components/Accordion";
// import { logPageView } from "../../utils/analytics";
import net_CTX from "../../src/context/internetConnectionCTX";
import languageCTX from "../../src/context/languageCTX";
import { guard_controller } from "../../utils/guard_controller";
import ContentHomePage from "../../src/components/contentHomePage";

const Rent = ({ locale }) => {
  const [dynamicLinks, setDynamicLinks] = useState(null);
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);
  const [authorize, set_authorize] = useState(true);
  const question_set =
    activeLanguage === "fa"
      ? [
        {
          title: `<p itemprop='name'>${locale.RENT_PAGE.question1}</p>`,
          content: `<p  itemprop='text'>${locale.RENT_PAGE.answer1}</p>`,
        },
        {
          title: `<p itemprop='name'>${locale.RENT_PAGE.question2}</p>`,
          content: `<p itemprop='text'>${locale.RENT_PAGE.answer2}</p>`,
        },
      ]
      : [
        {
          title: `<p itemprop='name'>${locale.RENT_PAGE.question1}</p>`,
          content: `<p  itemprop='text'>${locale.RENT_PAGE.answer1}</p>`,
        },
      ];
  const extraContentRentPage = (
    <div className="rent_contnet" dir={activeLanguage === "fa" ? "rtl" : "ltr"}>
      <h2>{locale.INFORMATION.text18}</h2>
      <div>
        <p>{locale.INFORMATION.text19}</p>
        <p>{locale.INFORMATION.text20}</p>
        <p>{locale.INFORMATION.text21}</p>
        {activeLanguage === "fa" && (
          <p>
            <strong>{locale.INFORMATION.text22}</strong>
          </p>
        )}
        <p>{locale.INFORMATION.text23}</p>
        <p>{locale.INFORMATION.text24}</p>
        {activeLanguage === "fa" && (
          <>
            <p>{locale.INFORMATION.text25}</p>
            <p>{locale.INFORMATION.text26}</p>
            <p>{locale.INFORMATION.text27}</p>
            <p>{locale.INFORMATION.text28}</p>
          </>
        )}
      </div>
    </div>
  );

  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/rent",
      pageTitle: locale.PAGE_HEADER.rent.title,
    });
    const guard = guard_controller();
    if (guard !== "auth") {
      set_authorize(false);
    }
    // logPageView();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const landing_res: any = await REQUEST_GET_LANDING_PAGE({
        name: "rent",
      });
      setDynamicLinks(landing_res.data.link_set);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
    }
  };

  return (
    <Layout>
      <NextSeo
        canonical="https://sepris.com/rent"
        title={locale.PAGE_HEADER.rent.title}
        description={locale.PAGE_HEADER.rent.description}
        openGraph={{
          title: locale.PAGE_HEADER.rent.title,
          description: locale.PAGE_HEADER.rent.description,
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
          <h1>{locale.RENT_PAGE.banner}</h1>
          <h2>{locale.RENT_PAGE.note}</h2>
          <div className="search_container responsive">
            <Search language={locale} />
          </div>
        </div>
        <ContentHomePage
          showRentPageContent={true}
          auth={authorize}
          extraContent={extraContentRentPage}
          language={locale}
          showSlider
          showLink
        />
        <div
          itemScope
          itemType="https://schema.org/FAQPage"
          className="responsive"
          data-test-id="QA_schema"
        >
          <Accordion
            questions={question_set}
          />
        </div>
        <section className="responsive third_container">
          {dynamicLinks ? (
            <div className="RentPage_Dynamic_links">
              <ul>
                {dynamicLinks.map((item) => {
                  let id = item.url.split("/").pop();
                  return (
                    <li key={item.name}>
                      <Link
                        href={{
                          pathname: "/rent/[id]",
                          query: {
                            id: id,
                          },
                        }}
                        as={`/rent/${id}`}
                        prefetch={false}
                      >
                        <a className="HEAP_LandingPages_Link_RelatedLinks">
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </section>
      </article>
    </Layout>
  );
};

export default Rent;
