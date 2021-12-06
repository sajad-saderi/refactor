import { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
// import Layout from "../src/Layout";
import { NextSeo } from 'next-seo';
import { REQUEST_GET_RENTAL_CAR } from '../src/API';
import Link from 'next/link';
import { dynamicString } from '../src/helpers/dynamicString';
import languageCTX from '../src/context/languageCTX'
const Checkout_Container = dynamic(() =>
  import('../src/containers/Checkout_Container'),
);

const Checkout = ({ order_information, expired, locale }) => {
  const { activeLanguage } = useContext(languageCTX)
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/checkout',
      pageTitle: order_information
        ? `${dynamicString([`${order_information.car.brand.name[activeLanguage]} ${order_information.car.name[activeLanguage]}`], locale.PAGE_HEADER.checkout.title)}`
        : 'checkout',
      searchedLocation: localStorage['searchedLocation']
        ? localStorage['searchedLocation']
        : '',
    });

    // logPageView();
  }, []);
  return (
    <>
      {order_information ? (
        <NextSeo
          title={`${dynamicString([`${order_information.car.brand.name[activeLanguage]} ${order_information.car.name[activeLanguage]}`], locale.PAGE_HEADER.checkout.title)}`}
          description={locale.PAGE_HEADER.checkout.description}
          openGraph={{
            title: `${dynamicString([`${order_information.car.brand.name[activeLanguage]} ${order_information.car.name[activeLanguage]}`], locale.PAGE_HEADER.checkout.title)}`,
            description: locale.PAGE_HEADER.checkout.description,
            site_name: locale.COMMON.sepris,
          }}
          twitter={{
            handle: locale.PAGE_HEADER.handle,
            site: locale.PAGE_HEADER.site,
            cardType: locale.PAGE_HEADER.cardType,
          }}
        />
      ) : (
        <NextSeo
          title={`${dynamicString(['خودرو'], locale.PAGE_HEADER.checkout.title)}`}
          description={locale.PAGE_HEADER.checkout.description}
        />
      )}
      <Layout hide={true}>
        {expired ? (
          <article className="minHeight expired_order">
            <p>{locale.CHECKOUT.expired}</p>
            <Link href="/" prefetch={false}>
              <a className="_404PageAnchor Blue_BTN">
                {locale.COMMON.backToHome}
              </a>
            </Link>
          </article>
        ) : (
          <Checkout_Container
            language={locale}
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
      error.response.data?.error === 'INVALID_SEARCH_ID' ||
      error.response.data?.error === 'INVALID_SEARCH_ID'
    ) {
      data['expired'] = true;
    }
    return {
      props: data,
    };
  }
}

export default Checkout;
