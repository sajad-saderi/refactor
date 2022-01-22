import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import staticPage from '../public/languages/static.json';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
import Link from 'next/link';
// import { logPageView } from "../utils/analytics";

const guideRenter = ({ locale }) => {
  useEffect(() => {
    // window['dataLayer'].push({
    //   event: 'page_view',
    //   pageURL: window.location.href,
    //   pagePath: '/guide-renter',
    //   pageTitle: locale.PAGE_HEADER.guideRenter.title,
    // });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.PAGE_HEADER.guideRenter.title}
        description={locale.PAGE_HEADER.guideRenter.description}
        openGraph={{
          title: locale.PAGE_HEADER.guideRenter.title,
          description: locale.PAGE_HEADER.guideRenter.description,
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
        <h1>{staticPage.guideRenter.h1}</h1>
        <h2 id='guideForHostBeforeRent'>{staticPage.guideRenter.h2_1}</h2>
        <ul>
          <li>{staticPage.guideRenter.h2_1_li_1}</li>
          <li>{staticPage.guideRenter.h2_1_li_2}</li>
          <li>{staticPage.guideRenter.h2_1_li_3}</li>
          <li>{staticPage.guideRenter.h2_1_li_4}</li>
        </ul>
        <h2 id='guideForHostAddCar'>{staticPage.guideRenter.h2_2}</h2>
        <ul>
          <li>{staticPage.guideRenter.h2_2_li_1}</li>
          <li>{staticPage.guideRenter.h2_2_li_2}</li>
          <li>{staticPage.guideRenter.h2_2_li_3}</li>
          <li>{staticPage.guideRenter.h2_2_li_4}</li>
          <li>{staticPage.guideRenter.h2_2_li_5}</li>
          <li>{staticPage.guideRenter.h2_2_li_6}</li>
          {/* <li>
              در زمان ثبت خودرو، تمام شرایط موردنظر خود از جمله مبلغ ودیعه، مبلغ
              سفته و قوانین کنسلی رزرو را کامل شرح دهید.
            </li> */}
          <li>{staticPage.guideRenter.h2_2_li_7}</li>
          <li>{staticPage.guideRenter.h2_2_li_8}</li>
          {/* <li>
              از آنجایی که خرید بیمه از سمت مهمان هزینه خسارات را کمتر
              خواهد کرد، بهتر است برای مهمان‌هایی که بیمه می‌خرند، ودیعه
              کمتری درنظر بگیرید تا شانس اجاره خودرو شما بیشتر شود.
            </li>
            <li>
              بهتر است شما شرایط اجاره خودرو را در دو حالت «با خرید بیمه» و
              «بدون خرید بیمه» شرح دهید.
            </li> */}
          <li>{staticPage.guideRenter.h2_2_li_9}</li>
          <li>{staticPage.guideRenter.h2_2_li_10}</li>
          <li>{staticPage.guideRenter.h2_2_li_11}</li>
          <li>{staticPage.guideRenter.h2_2_li_12}</li>
        </ul>
        <h2 id='guideForHostCancelationPolicies'>
          {staticPage.guideRenter.h2_3}
        </h2>
        <p className='TextIndenter'>{staticPage.guideRenter.h2_3_p_1}</p>
        <p className='TextIndenter'>{staticPage.guideRenter.h2_3_p_2}</p>
        <p className='TextIndenter'>{staticPage.guideRenter.h2_3_p_3}</p>
        <p className='TextIndenter'>{staticPage.guideRenter.h2_3_p_4}</p>
        <p className='TextIndenter'>
          {staticPage.guideRenter.h2_3_p_have_link_1}
          <u>
            <Link href='/gps' prefetch={false}>
              <a>{staticPage.guideRenter.h2_3_p_have_link_a}</a>
            </Link>
          </u>
          {staticPage.guideRenter.h2_3_p_have_link_2}
        </p>
        <h2 id='guideForHostRequestManagment'>{staticPage.guideRenter.h2_4}</h2>
        <ul>
          <li>{staticPage.guideRenter.h2_4_li_1}</li>
          <li>{staticPage.guideRenter.h2_4_li_2}</li>
          <li>{staticPage.guideRenter.h2_4_li_3}</li>
          <li>{staticPage.guideRenter.h2_4_li_4}</li>
          <li>{staticPage.guideRenter.h2_4_li_5}</li>
          <li>{staticPage.guideRenter.h2_4_li_6}</li>
          <li>{staticPage.guideRenter.h2_4_li_7}</li>
          <li>{staticPage.guideRenter.h2_4_li_8}</li>
        </ul>
        <h2 id='guideForHostDeliverCar'>{staticPage.guideRenter.h2_5}</h2>
        <ul>
          <li>{staticPage.guideRenter.h2_5_li_1}</li>
          <li>{staticPage.guideRenter.h2_5_li_2}</li>
          <li>{staticPage.guideRenter.h2_5_li_3}</li>
          <li>{staticPage.guideRenter.h2_5_li_4}</li>
          <li>{staticPage.guideRenter.h2_5_li_5}</li>
          <li>{staticPage.guideRenter.h2_5_li_6}</li>
        </ul>
        <h2 id='guideForHostReturnCar'>{staticPage.guideRenter.h2_6}</h2>
        <ul>
          <li>{staticPage.guideRenter.h2_6_li_1}</li>
          <li>{staticPage.guideRenter.h2_6_li_2}</li>
          <li>{staticPage.guideRenter.h2_6_li_3}</li>
          <li>{staticPage.guideRenter.h2_6_li_4}</li>
          <li>{staticPage.guideRenter.h2_6_li_5}</li>
        </ul>
      </section>
    </Layout>
  );
};

export default guideRenter;
