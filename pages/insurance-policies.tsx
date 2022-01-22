import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import staticPage from '../public/languages/static.json';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
// import { logPageView } from "../utils/analytics";

const InsurancePolicies = ({ locale }) => {
  useEffect(() => {
    // window['dataLayer'].push({
    //   event: 'page_view',
    //   pageURL: window.location.href,
    //   pagePath: '/insurance-policies',
    //   pageTitle: locale.PAGE_HEADER.insurancePolicies.title,
    // });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.PAGE_HEADER.insurancePolicies.title}
        description={locale.PAGE_HEADER.insurancePolicies.description}
        openGraph={{
          title: locale.PAGE_HEADER.insurancePolicies.title,
          description: locale.PAGE_HEADER.insurancePolicies.description,
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
        <h1>{staticPage.insurancePolicies.h1}</h1>
        <p>{staticPage.insurancePolicies.p_1}</p>
        <p>
          <strong>
            <u>{staticPage.insurancePolicies.p_2}</u>
          </strong>
        </p>
        <h2>
          <u>{staticPage.insurancePolicies.h2_1}</u>
        </h2>
        <p>{staticPage.insurancePolicies.p_3}</p>
        <ul>
          <li>{staticPage.insurancePolicies.p_3_ul_li_1}</li>
          <li>{staticPage.insurancePolicies.p_3_ul_li_2}</li>
          <li>{staticPage.insurancePolicies.p_3_ul_li_3}</li>
          <li>{staticPage.insurancePolicies.p_3_ul_li_4}</li>
          <li>{staticPage.insurancePolicies.p_3_ul_li_5}</li>
        </ul>
        <h2>{staticPage.insurancePolicies.h2_2}</h2>
        <p>{staticPage.insurancePolicies.p_4}</p>
        <p>
          <strong>{staticPage.insurancePolicies.p_5_strong} </strong>
          {staticPage.insurancePolicies.p_5}
        </p>
        <p>
          <strong>{staticPage.insurancePolicies.p_6_strong} </strong>
          {staticPage.insurancePolicies.p_6}
        </p>
        <p>
          <strong>{staticPage.insurancePolicies.p_7_strong} </strong>
          {staticPage.insurancePolicies.p_7}
        </p>
        <p>
          <strong>{staticPage.insurancePolicies.p_8_strong} </strong>
          {staticPage.insurancePolicies.p_8}
        </p>
        <p>
          <strong>{staticPage.insurancePolicies.p_9_strong} </strong>
          {staticPage.insurancePolicies.p_9}
        </p>
        <p>
          <strong>{staticPage.insurancePolicies.p_10_strong} </strong>
          {staticPage.insurancePolicies.p_10}
        </p>
        <p>
          <strong>{staticPage.insurancePolicies.p_11_strong} </strong>
          {staticPage.insurancePolicies.p_11}
        </p>
        <h2>
          <u>{staticPage.insurancePolicies.h2_3}</u>
        </h2>
        <h3>{staticPage.insurancePolicies.h2_3_h3_1}</h3>
        <p>{staticPage.insurancePolicies.p_12}</p>
        <ul>
          <li>{staticPage.insurancePolicies.p_12_ul_li_1}</li>
          <li>{staticPage.insurancePolicies.p_12_ul_li_2}</li>
          <li>{staticPage.insurancePolicies.p_12_ul_li_3}</li>
          <li>{staticPage.insurancePolicies.p_12_ul_li_4}</li>
          <li>{staticPage.insurancePolicies.p_12_ul_li_5}</li>
        </ul>
        <h3>{staticPage.insurancePolicies.h2_3_h3_2}</h3>
        <p>{staticPage.insurancePolicies.p_13}</p>
        <h2>
          <u>{staticPage.insurancePolicies.h2_4}</u>
        </h2>
        <h3>{staticPage.insurancePolicies.h2_4_h3_1}</h3>
        <p>{staticPage.insurancePolicies.p_14}</p>
        <ul>
          <li>{staticPage.insurancePolicies.p_14_ul_li_1}</li>
          <li>{staticPage.insurancePolicies.p_14_ul_li_2}</li>
          <li>{staticPage.insurancePolicies.p_14_ul_li_3}</li>
          <li>{staticPage.insurancePolicies.p_14_ul_li_4}</li>
          <li>{staticPage.insurancePolicies.p_14_ul_li_5}</li>
          <li>{staticPage.insurancePolicies.p_14_ul_li_6}</li>
        </ul>
        <h3>{staticPage.insurancePolicies.h2_4_h3_2}</h3>
        <p>{staticPage.insurancePolicies.p_15}</p>
        <ul>
          <li>{staticPage.insurancePolicies.p_15_ul_li_1}</li>
          <li>{staticPage.insurancePolicies.p_15_ul_li_2}</li>
          <li>{staticPage.insurancePolicies.p_15_ul_li_3}</li>
          <li>{staticPage.insurancePolicies.p_15_ul_li_4}</li>
          <li>{staticPage.insurancePolicies.p_15_ul_li_5}</li>
          <li>{staticPage.insurancePolicies.p_15_ul_li_6}</li>
          <li>{staticPage.insurancePolicies.p_15_ul_li_7}</li>
          <li>{staticPage.insurancePolicies.p_15_ul_li_8}</li>
          <li>{staticPage.insurancePolicies.p_15_ul_li_9}</li>
        </ul>
        <h2>
          <u>{staticPage.insurancePolicies.h2_5}</u>
        </h2>
        <h3>{staticPage.insurancePolicies.h2_5_h3_1}</h3>
        <p>{staticPage.insurancePolicies.p_16}</p>
        <h3>{staticPage.insurancePolicies.h2_5_h3_2}</h3>
        <p>{staticPage.insurancePolicies.p_17}</p>
        <h3>{staticPage.insurancePolicies.h2_5_h3_3}</h3>
        <p>{staticPage.insurancePolicies.p_18}</p>
        <h2>{staticPage.insurancePolicies.h2_6}</h2>
        <p>{staticPage.insurancePolicies.p_19}</p>
        <h2>{staticPage.insurancePolicies.h2_7}</h2>
        <p>{staticPage.insurancePolicies.p_20}</p>
        <h2>{staticPage.insurancePolicies.h2_8}</h2>
        <p>{staticPage.insurancePolicies.p_21}</p>
        <h2>
          <u>{staticPage.insurancePolicies.h2_9}</u>
        </h2>
        <h3>{staticPage.insurancePolicies.h2_9_h3_1}</h3>
        <p>{staticPage.insurancePolicies.p_22}</p>
        <h4>{staticPage.insurancePolicies.h2_9_h4_1}</h4>
        <ul>
          <li>{staticPage.insurancePolicies.h2_9_h4_1_li_1}</li>
          <li>{staticPage.insurancePolicies.h2_9_h4_1_li_2}</li>
          <li>{staticPage.insurancePolicies.h2_9_h4_1_li_3}</li>
        </ul>
        <h4>{staticPage.insurancePolicies.h2_9_h4_2}</h4>
        <ul>
          <li>{staticPage.insurancePolicies.h2_9_h4_2_li_1}</li>
          <li>{staticPage.insurancePolicies.h2_9_h4_2_li_2}</li>
        </ul>
        <h4>{staticPage.insurancePolicies.h2_9_h4_3}</h4>
        <p>{staticPage.insurancePolicies.p_23}</p>
        <h2>{staticPage.insurancePolicies.h2_10}</h2>
        <h3>{staticPage.insurancePolicies.h2_10_h3_1}</h3>
        <p>{staticPage.insurancePolicies.p_24}</p>
        <h3>{staticPage.insurancePolicies.h2_10_h3_2}</h3>
        <p>{staticPage.insurancePolicies.p_25}</p>
        <p>
          <strong>{staticPage.insurancePolicies.p_26_strong} </strong>
          {staticPage.insurancePolicies.p_26}
        </p>
        <p>
          <strong>{staticPage.insurancePolicies.p_27_strong} </strong>
          {staticPage.insurancePolicies.p_27}
        </p>
        <p>
          <strong>{staticPage.insurancePolicies.p_28_strong} </strong>
          {staticPage.insurancePolicies.p_28}
        </p>
        <p>
          <strong>{staticPage.insurancePolicies.p_29_strong} </strong>
          {staticPage.insurancePolicies.p_29}
        </p>
        <h3>{staticPage.insurancePolicies.h2_10_h3_3}</h3>
        <p>{staticPage.insurancePolicies.p_30}</p>
        <h2>
          <u>{staticPage.insurancePolicies.h2_11}</u>
        </h2>
        <p>{staticPage.insurancePolicies.p_31}</p>
        <p>
          <strong>{staticPage.insurancePolicies.p_32_strong} </strong>
          {staticPage.insurancePolicies.p_32}
        </p>
        <p>
          <u>
            <strong>{staticPage.insurancePolicies.p_33_strong} </strong>
            {staticPage.insurancePolicies.p_33}
          </u>
        </p>
        <h2>
          <u>{staticPage.insurancePolicies.h2_12}</u>
        </h2>
        <h3>{staticPage.insurancePolicies.h2_12_h3_1}</h3>
        <p>{staticPage.insurancePolicies.p_34}</p>
        <h3>{staticPage.insurancePolicies.h2_12_h3_2}</h3>
        <p>{staticPage.insurancePolicies.p_35}</p>
        <h3>{staticPage.insurancePolicies.h2_12_h3_3}</h3>
        <p>{staticPage.insurancePolicies.p_36}</p>
        <h3>{staticPage.insurancePolicies.h2_12_h3_4}</h3>
        <p>{staticPage.insurancePolicies.p_37}</p>

        <h2>{staticPage.insurancePolicies.h2_13}</h2>
        <h3>{staticPage.insurancePolicies.h2_13_h3}</h3>
        <p>
          <strong>{staticPage.insurancePolicies.p_38_strong} </strong>
          {staticPage.insurancePolicies.p_38}
        </p>
        <h2>{staticPage.insurancePolicies.h2_14}</h2>
        <ul>
          <li>
            <strong>{staticPage.insurancePolicies.h2_14_li_1}</strong>
          </li>
          <p className='intends'>{staticPage.insurancePolicies.p_39}</p>
          <li>
            <strong>{staticPage.insurancePolicies.h2_14_li_2}</strong>
          </li>
          <ul className='intends'>
            <li>{staticPage.insurancePolicies.h2_14_li_2_li_1}</li>
            <li>{staticPage.insurancePolicies.h2_14_li_2_li_2}</li>
            <li>{staticPage.insurancePolicies.h2_14_li_2_li_3}</li>
            <li>{staticPage.insurancePolicies.h2_14_li_2_li_4}</li>
            <li>{staticPage.insurancePolicies.h2_14_li_2_li_5}</li>
            <li>{staticPage.insurancePolicies.h2_14_li_2_li_6}</li>
            <li>{staticPage.insurancePolicies.h2_14_li_2_li_7}</li>
            <li>{staticPage.insurancePolicies.h2_14_li_2_li_8}</li>
            <li>{staticPage.insurancePolicies.h2_14_li_2_li_9}</li>
          </ul>

          <p>
            <strong>{staticPage.insurancePolicies.p_40_strong} </strong>
            {staticPage.insurancePolicies.p_40}
          </p>
          <p>
            <strong>{staticPage.insurancePolicies.p_41_strong} </strong>
            {staticPage.insurancePolicies.p_41}
          </p>
          <p>{staticPage.insurancePolicies.p_42}</p>
          <p>
            <strong>{staticPage.insurancePolicies.p_43_strong} </strong>
            {staticPage.insurancePolicies.p_43}
          </p>
          <li>
            <strong>{staticPage.insurancePolicies.h2_14_li_3}</strong>
          </li>
          <p>{staticPage.insurancePolicies.p_44}</p>
          <li>
            <strong>{staticPage.insurancePolicies.h2_14_li_4}</strong>
          </li>
          <p>{staticPage.insurancePolicies.p_45}</p>
          <ul className='intends'>
            <li>{staticPage.insurancePolicies.p_45_li_1}</li>
            <li>{staticPage.insurancePolicies.p_45_li_2}</li>
          </ul>
          <p>
            <strong>{staticPage.insurancePolicies.p_46_strong}</strong>
            {staticPage.insurancePolicies.p_46}
          </p>
          <li>
            <strong>{staticPage.insurancePolicies.p_45_li_3}</strong>
          </li>
          <p>{staticPage.insurancePolicies.p_47}</p>
          <li>
            <u>
              <strong>{staticPage.insurancePolicies.p_45_li_4}</strong>
            </u>
          </li>
          <p>{staticPage.insurancePolicies.p_48}</p>
          <li>
            <strong>{staticPage.insurancePolicies.p_45_li_5}</strong>
          </li>
          <p>{staticPage.insurancePolicies.p_49}</p>
          <p>{staticPage.insurancePolicies.p_50}</p>
          <p>{staticPage.insurancePolicies.p_51}</p>
          <p>{staticPage.insurancePolicies.p_52}</p>
        </ul>
      </section>
    </Layout>
  );
};

export default InsurancePolicies;
