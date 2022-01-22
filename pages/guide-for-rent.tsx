import React, { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import languageCTX from '../src/context/languageCTX';
import staticPage from '../public/languages/static.json';
const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
import Link from 'next/link';
// import { logPageView } from "../utils/analytics";

const guideForRent = ({ locale }) => {
  const { activeLanguage } = useContext(languageCTX);
  useEffect(() => {
    // window['dataLayer'].push({
    //   event: 'page_view',
    //   pageURL: window.location.href,
    //   pagePath: '/guide-for-rent',
    //   pageTitle: locale.PAGE_HEADER.guideForRent.title,
    // });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.PAGE_HEADER.guideForRent.title}
        description={locale.PAGE_HEADER.guideForRent.description}
        openGraph={{
          title: locale.PAGE_HEADER.guideForRent.title,
          description: locale.PAGE_HEADER.guideForRent.description,
          site_name: locale.COMMON.site_name,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className='responsive static_pages minHeight'>
        {activeLanguage === 'fa' ? (
          <>
            <h1>{locale.GUIDE_FOR_GUESTS_PAGE.h1}</h1>
            <h2 id='guideForRentReserve'>
              {locale.GUIDE_FOR_GUESTS_PAGE.h2_1}
            </h2>
            <h3>{locale.GUIDE_FOR_GUESTS_PAGE.h3_1}</h3>
            <ul>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_1_li_1}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_1_li_2}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_1_li_3}</li>
            </ul>
            <h3>{locale.GUIDE_FOR_GUESTS_PAGE.h3_2}</h3>
            <ul>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_2_li_1}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_2_li_2}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_2_li_3}</li>
            </ul>
            <h3>{locale.GUIDE_FOR_GUESTS_PAGE.h3_3}</h3>
            <ul>
              <li>
                {locale.GUIDE_FOR_GUESTS_PAGE.h3_3_li_1_a_1}
                <Link href='/insurance-policies' prefetch={false}>
                  <a>{locale.GUIDE_FOR_GUESTS_PAGE.h3_3_li_1_insurance}</a>
                </Link>
                {locale.GUIDE_FOR_GUESTS_PAGE.h3_3_li_1_a_2}
              </li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_3_li_2}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_3_li_3}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_3_li_4}</li>
            </ul>
            <h3>{locale.GUIDE_FOR_GUESTS_PAGE.h3_4}</h3>
            <ul>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_4_li_1}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_4_li_2}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_4_li_3}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_4_li_4}</li>
            </ul>
            <h3>{locale.GUIDE_FOR_GUESTS_PAGE.h3_5}</h3>
            <ul>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_5_li_1}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_5_li_2}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_5_li_3}</li>
            </ul>
            <h2 id='guideForRentCarDelivery'>
              {locale.GUIDE_FOR_GUESTS_PAGE.h2_2}
            </h2>
            <h3>{locale.GUIDE_FOR_GUESTS_PAGE.h3_6}</h3>
            <ul>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_6_li_1}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_6_li_2}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_6_li_3}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_6_li_4}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_6_li_5}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_6_li_6}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_6_li_7}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_6_li_8}</li>
            </ul>
            <h3>{locale.GUIDE_FOR_GUESTS_PAGE.h3_7}</h3>
            <ul>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_7_li_1}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_7_li_2}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_7_li_3}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_7_li_4}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_7_li_5}</li>
            </ul>
            <h2 id='guideForRentTimeTravel'>
              {locale.GUIDE_FOR_GUESTS_PAGE.h2_3}
            </h2>
            <h3>{locale.GUIDE_FOR_GUESTS_PAGE.h3_8}</h3>
            <ul>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_8_li_1}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_8_li_2}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_8_li_3}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_8_li_4}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_8_li_5}</li>
            </ul>
            <h2 id='guideForRentEndOfJourney'>
              {locale.GUIDE_FOR_GUESTS_PAGE.h2_4}
            </h2>
            <h3>{locale.GUIDE_FOR_GUESTS_PAGE.h3_9}</h3>
            <ul>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_9_li_1}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_9_li_2}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_9_li_3}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_9_li_4}</li>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_9_li_5}</li>
            </ul>
            <h3>{locale.GUIDE_FOR_GUESTS_PAGE.h3_10}</h3>
            <ul>
              <li>{locale.GUIDE_FOR_GUESTS_PAGE.h3_10_li}</li>
            </ul>
          </>
        ) : (
          <>
            <h1>{locale.GUIDE_FOR_GUESTS_PAGE.h1}</h1>
            <h2>{locale.GUIDE_FOR_GUESTS_PAGE.h2_1}</h2>
            <p>{locale.GUIDE_FOR_GUESTS_PAGE.p1_1}</p>
            <br />
            <h2>{locale.GUIDE_FOR_GUESTS_PAGE.h2_2}</h2>
            <h3>
              <strong>{locale.GUIDE_FOR_GUESTS_PAGE.h3_1}</strong>
            </h3>
            <p>{locale.GUIDE_FOR_GUESTS_PAGE.p1_2}</p>
            <br />
            <h3>
              <strong>{locale.GUIDE_FOR_GUESTS_PAGE.h3_2}</strong>
            </h3>
            <p>{locale.GUIDE_FOR_GUESTS_PAGE.p1_3}</p>
            <br />
            <h3>
              <strong>{locale.GUIDE_FOR_GUESTS_PAGE.h3_3}</strong>
            </h3>
            <p>{locale.GUIDE_FOR_GUESTS_PAGE.p1_4}</p>
            <br />
            <h2>{locale.GUIDE_FOR_GUESTS_PAGE.h2_3}</h2>
            <p>{locale.GUIDE_FOR_GUESTS_PAGE.p2_1}</p>
            <p>{locale.GUIDE_FOR_GUESTS_PAGE.p2_2}</p>
            <br />
            <h2>{locale.GUIDE_FOR_GUESTS_PAGE.h2_4}</h2>
            <p>{locale.GUIDE_FOR_GUESTS_PAGE.p3_1}</p>
          </>
        )}
      </section>
    </Layout>
  );
};

export default guideForRent;
