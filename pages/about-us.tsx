import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from "next-seo";
import { addingCountryCodeToNumber } from '../src/helpers/addingCountryCodeToNumber';
// import { logPageView } from "../utils/analytics";

const AboutUs = ({ locale }) => {
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: "/about-us",
      pageTitle: locale.PAGE_HEADER.aboutUs.title,
    });
    // logPageView();
  }, []);
  return (
    <Layout showToTop={true}>
      <NextSeo
        title={locale.PAGE_HEADER.aboutUs.title}
        description={locale.PAGE_HEADER.aboutUs.description}
        openGraph={{
          title: locale.PAGE_HEADER.aboutUs.title,
          description: locale.PAGE_HEADER.aboutUs.description,
          site_name: locale.COMMON.site_name,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <div className="AboutUsPage">
          <h1>{locale.ABOUT_US_PAGE.h1}</h1>
          <p>{locale.ABOUT_US_PAGE.p}</p>
          <br />
          <br />
          <h3>{locale.ABOUT_US_PAGE.h3}</h3>
          <div className="indentation">
            <p>{locale.ABOUT_US_PAGE.address}</p>
          </div>
          <h3>{locale.COMMON.contactNumbers}</h3>
          <div className="indentation">
            {/* <a
              href="tel:02188567759"
              className="HEAP_Aboutus_Link_Phone call_numbers"
            >
              {locale.aboutUs.number_1}
            </a>
            , */}
            <a
              href={`tel:${addingCountryCodeToNumber(locale.COMMON.number1)}`}
              className="HEAP_Aboutus_Link_Phone call_numbers"
            >
              {locale.COMMON.number1}
            </a>{' '}
            ,
            <a
              href={`tel:${addingCountryCodeToNumber(locale.COMMON.number2)}`}
              className="HEAP_Aboutus_Link_Phone call_numbers"
            >
              {locale.COMMON.number2}
            </a>{' '}
            ,
            <a
              href={`tel:${addingCountryCodeToNumber(locale.COMMON.number3)}`}
              className="HEAP_Aboutus_Link_Phone call_numbers"
            >
              {locale.COMMON.number3}
            </a>
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
