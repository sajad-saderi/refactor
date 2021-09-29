import { useEffect } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
// import Layout from "../src/Layout";
import language from "../public/languages/fa/checkout.json";
import { NextSeo } from "next-seo";
import { REQUEST_GET_RENTAL_CAR } from "../src/API";
import Link from "next/link";

const Checkout_Container = dynamic(() =>
  import("../src/containers/Checkout_Container")
);

const Checkout = ({ order_information, expired }) => {
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view_virtual",
      pageURL: window.location.href,
      pagePath: "/checkout",
      pageTitle: order_information
        ? `${language.next_seo.title.start}${order_information.car.brand.name.fa} ${order_information.car.name.fa}${language.next_seo.title.otoli}`
        : "checkout",
      searchedLocation: localStorage["searchedLocation"]
        ? localStorage["searchedLocation"]
        : "",
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
          <article className="minHeight expired_order">
            <p>{language.expired}</p>
            <Link href="/" prefetch={false}>
              <a className="_404PageAnchor Blue_BTN">
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
    if (
      error.response.data?.error === "INVALID_SEARCH_ID" ||
      error.response.data?.error === "INVALID_SEARCH_ID"
    ) {
      data["expired"] = true;
    }
    return {
      props: data,
    };
  }
}

export default Checkout;
