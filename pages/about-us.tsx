import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
import language from '../public/languages/fa/aboutus.json';
// import { logPageView } from "../utils/analytics";

const AboutUs = () => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/about-us',
      pageTitle: language.next_seo.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
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
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <div className="AboutUsPage">
          <h1>{language.h1}</h1>
          <p>{language.p}</p>
          <br />
          <br />
          <h3>{language.h3}</h3>
          <div className="indentation">
            <p>{language.address}</p>
          </div>
          <h3>{language.call_numbers}</h3>
          <div className="indentation">
            {/* <a
              href="tel:02188567759"
              className="HEAP_Aboutus_Link_Phone call_numbers"
            >
              {language.number_1}
            </a>
            , */}
            <a
              href="tel:02191091431"
              className="HEAP_Aboutus_Link_Phone call_numbers"
            >
              {language.number_3}
            </a>{' '}
            ,
            <a
              href="tel:02191091432"
              className="HEAP_Aboutus_Link_Phone call_numbers"
            >
              {language.number_4}
            </a>{' '}
            ,
            <a
              href="tel:09391414574"
              className="HEAP_Aboutus_Link_Phone call_numbers"
            >
              {language.number_2}
            </a>{' '}
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12948.97680269182!2d51.3639484!3d35.7693773!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x77421b950619d5b7!2z2LPZvtix24zYsyAoU2VwcmlzKQ!5e0!3m2!1sen!2s!4v1618646009243!5m2!1sfa!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              data-loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
