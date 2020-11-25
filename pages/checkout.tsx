import React from "react";
import Layout from "../src/Layout";
import Checkout_Container from "../src/containers/Checkout_Container";
import language from "../public/languages/fa/checkout.json";
import { NextSeo } from "next-seo";
import { REQUEST_GET_RENTAL_CAR } from "../src/API";
import Link from "next/link";

const Checkout = ({ order_information, expired }) => {
  React.useEffect(() => {
    window["dataLayer"].push({
      event: "virtualPageView",
      pageURL: window.location.href,
      pagePath: "/checkout",
      pageTitle: "checkout",
    });
    // logPageView();
  }, []);
  return (
    <>
      {order_information ? (
        <NextSeo
          title={`${language.next_seo.title.start}${order_information.car.brand.name.fa} ${order_information.car.name.fa}${language.next_seo.title.otoli}`}
          description={language.next_seo.description}
          openGraph={{
            title: `${language.next_seo.title.start}${order_information.car.brand.name.fa} ${order_information.car.name.fa}${language.next_seo.title.otoli}`,
            description: language.next_seo.description,
            site_name: language.next_seo.site_name,
          }}
          twitter={{
            handle: language.next_seo.handle,
            site: language.next_seo.site,
            cardType: language.next_seo.cardType,
          }}
        />
      ) : (
        <NextSeo
          title={language.next_seo.initial_title}
          description={language.next_seo.description}
        />
      )}
      <Layout hide={true}>
        {expired ? (
          <article className='minHeight expired_order'>
            <p>{language.expired}</p>
            <Link href='/'>
              <a className='_404PageAnchor Blue_BTN'>
                {language.return_to_home}
              </a>
            </Link>
          </article>
        ) : (
          <Checkout_Container
            language={language}
            order_information={order_information}
          />
        )}
      </Layout>
    </>
  );
};

export async function getServerSideProps(props) {
  let { search_id } = props.query;
  try {
    const res: any = await REQUEST_GET_RENTAL_CAR({ search_id });
    return {
      props: { order_information: res },
    };
  } catch (error) {
    const data = {
      order_information: null,
    };
    if (error === "Invalid search_id.") {
      data["expired"] = true;
    }
    return {
      props: data,
    };
  }
}

export default Checkout;
