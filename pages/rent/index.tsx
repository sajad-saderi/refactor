import { useState, useEffect, useContext } from 'react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../../src/Layout'));
const Search = dynamic(() => import('../../src/containers/Search'));
const Accordion = dynamic(() => import('../../src/components/Accordion'));
// import Layout from "../../src/Layout";
// import Search from "../../src/containers/Search";
import insurance from '../../public/image/SamanInsurance.png';
// import "../../src/styles/pages/index.scss";
import Link from 'next/link';
import { REQUEST_GET_LANDING_PAGE } from '../../src/API';
// import Accordion from "../../src/components/Accordion";
import language from '../../public/languages/fa/rent.json';
// import { logPageView } from "../../utils/analytics";
import net_CTX from '../../src/context/internetConnectionCTX';
import { guard_controller } from '../../utils/guard_controller';
import ContentHomePage from '../../src/components/contentHomePage';

const extraContentRentPage = (
  <>
    <h2>{language.rent_content_h2}</h2>
    <div className="rent_contnet">
      <p>{language.rent_content_p_1}</p>
      <p>{language.rent_content_p_2}</p>
      <p>{language.rent_content_p_3}</p>
      <p>
        <strong>{language.rent_content_p_4}</strong>
      </p>
      <p>{language.rent_content_p_5}</p>
      <p>{language.rent_content_p_6}</p>
      <p>{language.rent_content_p_7}</p>
      <p>{language.rent_content_p_8}</p>
      <p>{language.rent_content_p_9}</p>
      <p>{language.rent_content_p_10}</p>
    </div>
  </>
);

const question_set = [
  {
    title: "<p itemprop='name'>تفاوت سپریس با سایر مراکز اجاره خودرو چیست؟</p>",
    content:
      "<p  itemprop='text'>سِپریس اولین وتنها پلتفرم اجاره خودرو در ایران است. فرآیند اجاره خودرو در سِپریس کاملا آنلاین است و نیاز به مراجعه حضوری ندارید. برای یک روز هم می‌توانید خودرو اجاره کنید و بدون هزینه‌های پنهان و اضافه در اغلب موارد در محل خودتان تحویل بگیرید. </p>",
  },
  {
    title: "<p itemprop='name'>شرایط اجاره خودرو از سپریس چیست؟</p>",
    content:
      "<p itemprop='text'>چون در سِپریس خودرو را از مالک اجاره می‌کنید، قیمت‌ها اغلب پایین‌تر از سایز مراکز است. همین طور به دلیل همکاری نزدیک با بیمه، میزبان‌ها مدارک و ودیعه‌های کمتری از شما دریافت می‌کنند.</p>",
  },
];

const Rent = () => {
  const [dynamicLinks, setDynamicLinks] = useState(null);
  const netCTX = useContext(net_CTX);
  const [authorize, set_authorize] = useState(true);

  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/rent',
      pageTitle: language.next_seo.title,
    });
    const guard = guard_controller();
    if (guard !== 'auth') {
      set_authorize(false);
    }
    // logPageView();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const landing_res: any = await REQUEST_GET_LANDING_PAGE({
        name: 'rent',
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
            <Search language={language} />
          </div>
        </div>
        <ContentHomePage auth={authorize} extraContent={extraContentRentPage} />
        <div
          itemScope
          itemType="https://schema.org/FAQPage"
          className="responsive"
          data-test-id="QA_schema"
        >
          <Accordion question_set={question_set} />
        </div>
        <section className="responsive third_container">
          {dynamicLinks ? (
            <div className="RentPage_Dynamic_links">
              <ul>
                {dynamicLinks.map((item) => {
                  let id = item.url.split('/').pop();
                  return (
                    <li key={item.name}>
                      <Link
                        href={{
                          pathname: '/rent/[id]',
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
