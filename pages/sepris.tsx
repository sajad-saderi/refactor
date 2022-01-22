import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
import { NextSeo } from 'next-seo';
// import Layout from "../src/Layout";
// import { logPageView } from "../utils/analytics";

const AboutUs = ({ locale }) => {
  useEffect(() => {
    // window['dataLayer'].push({
    //   event: 'page_view',
    //   pageURL: window.location.href,
    //   pagePath: '/sepris',
    //   pageTitle: locale.PAGE_HEADER.sepris.title,
    // });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.PAGE_HEADER.sepris.title}
        description={locale.PAGE_HEADER.sepris.description}
        openGraph={{
          title: locale.PAGE_HEADER.sepris.title,
          description: locale.PAGE_HEADER.sepris.description,
          site_name: locale.COMMON.site_name,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className='responsive static_pages minHeight OTILI'>
        <h1>{locale.SEPRIS_PAGE.text1}</h1>
        <div className='PartOne_OTOLI'>
          <div className='partOne_OTOLI_D1 D1_Left'>
            <h2 className='diff_color'>{locale.SEPRIS_PAGE.text2}</h2>
            <div>
              <h3>{locale.SEPRIS_PAGE.text3}</h3>
              <p>{locale.SEPRIS_PAGE.text4}</p>
            </div>
            <div>
              <h3>{locale.SEPRIS_PAGE.text5}</h3>
              <p>{locale.SEPRIS_PAGE.text6}</p>
            </div>
            <div>
              <h3>{locale.SEPRIS_PAGE.text7}</h3>
              <p>{locale.SEPRIS_PAGE.text8}</p>
            </div>
            <div>
              <h3>{locale.SEPRIS_PAGE.text9}</h3>
              <p>{locale.SEPRIS_PAGE.text10}</p>
            </div>
          </div>
          <div className='partOne_OTOLI_D1 D1_Right'>
            <h2>{locale.SEPRIS_PAGE.text11}</h2>
            <div>
              <h3>{locale.SEPRIS_PAGE.text12}</h3>
              <p>{locale.SEPRIS_PAGE.text13}</p>
            </div>
            <div>
              <h3>{locale.SEPRIS_PAGE.text14}</h3>
              <p>{locale.SEPRIS_PAGE.text15}</p>
            </div>
            <div>
              <h3>{locale.SEPRIS_PAGE.text16}</h3>
              <p>{locale.SEPRIS_PAGE.text17}</p>
            </div>
          </div>
        </div>
        <h2 className='OTOLI_MIDDLE_Dif'>{locale.SEPRIS_PAGE.text18}</h2>
        <div className='PartOne_OTOLI'>
          <div className='partOne_OTOLI_D1 D1_Left'>
            <div>
              <h3>{locale.SEPRIS_PAGE.text19}</h3>
              <p>{locale.SEPRIS_PAGE.text20}</p>
            </div>
          </div>
          <div className='partOne_OTOLI_D1 D1_Right'>
            <div>
              <h3>{locale.SEPRIS_PAGE.text21}</h3>
              <p>{locale.SEPRIS_PAGE.text22}</p>
            </div>
          </div>
        </div>
        <h2 className='OTOLI_MIDDLE_Dif'>{locale.SEPRIS_PAGE.text23}</h2>
        <div className='PartOne_OTOLI'>
          <div className='partOne_OTOLI_D1 D1_Left'>
            <div>
              <h3>{locale.SEPRIS_PAGE.text24}</h3>
              <p>{locale.SEPRIS_PAGE.text25}</p>
            </div>
          </div>
          <div className='partOne_OTOLI_D1 D1_Right'>
            <div>
              <h3>{locale.SEPRIS_PAGE.text26}</h3>
              <p>{locale.SEPRIS_PAGE.text27}</p>
            </div>
            <div>
              <h3>{locale.SEPRIS_PAGE.text28}</h3>
              <p>{locale.SEPRIS_PAGE.text29}</p>
            </div>
          </div>
        </div>
        <h2 className='OTOLI_MIDDLE_Dif'>{locale.SEPRIS_PAGE.text30}</h2>
        <div className='PartOne_OTOLI'>
          <div className='partOne_OTOLI_D1 D1_Left'>
            <div>
              <h3>{locale.SEPRIS_PAGE.text31}</h3>
              <p>{locale.SEPRIS_PAGE.text32}</p>
            </div>
          </div>
          <div className='partOne_OTOLI_D1 D1_Right'>
            <div>
              <h3>{locale.SEPRIS_PAGE.text33}</h3>
              <p>{locale.SEPRIS_PAGE.text34}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
