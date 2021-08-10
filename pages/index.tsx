import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
const Search = dynamic(() => import("../src/containers/Search"));
import Recommendation_section from "../src/components/recommendation_section/recommendation_section";
// import Layout from "../src/Layout";
// import Search from "../src/containers/Search";
import insurance from "../public/image/SamanInsurance.png";
import Link from "next/link";
import language from "../public/languages/fa/homepage.json";
import { guard_controller } from "../utils/guard_controller";
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
        <div className="responsive second_part_container">
          <div className="insuranceBox">
            <p>با همکاری بیمه‌های اتومبیل سامان</p>
            <img
              src={insurance}
              alt="تصویر بیمه سامان"
              width="115"
              height="47"
            />
          </div>
          <div className="second_container">
            <div className="full_width">
              <h2>{language.second_container_full_width_h2}</h2>
              <p>{language.second_container_full_width_p}</p>
            </div>
            <h2>{language.second_container_h2_2}</h2>
            <div className="three_columns">
              <section>
                <h3>{language.second_container_three_columns_2_h3_1}</h3>
                <p>{language.second_container_three_columns_2_p_1}</p>
              </section>
              <section>
                <h3>{language.second_container_three_columns_2_h3_2}</h3>
                <p>{language.second_container_three_columns_2_p_2}</p>
              </section>
              <section>
                <h3>{language.second_container_three_columns_2_h3_3}</h3>
                <p>{language.second_container_three_columns_2_p_3}</p>
              </section>
            </div>
            <Recommendation_section />
            <h2>{language.second_container_h2_1}</h2>
            <div className="three_columns">
              <section>
                <h3>{language.second_container_three_columns_h3_1}</h3>
                <p>{language.second_container_three_columns_p_1}</p>
              </section>
              <section>
                <h3>{language.second_container_three_columns_h3_2}</h3>
                <p>{language.second_container_three_columns_p_2}</p>
              </section>
              <section>
                <h3>{language.second_container_three_columns_h3_3}</h3>
                <p>{language.second_container_three_columns_p_3}</p>
              </section>
            </div>
            <div
              className="add_car_section"
              onClickCapture={() => {
                if (!authorize) {
                  localStorage["last_location"] = "/add-car";
                }
              }}
            >
              {/* <Link href={authorize ? "/add-car" : "/login"}>
              <a className='Blue_BTN add_car_custom'>
                {language.second_container_add_car_section_a_1}
              </a>
            </Link> */}
              <Link href="/join-us" prefetch={false}>
                <a className="Blue_BTN add_car_custom">
                  {language.second_container_add_car_section_a_2}
                </a>
              </Link>
              <Link href="/add-car" prefetch={false}>
                <a>{language.second_container_add_car_section_a_1}</a>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default HomePage;
