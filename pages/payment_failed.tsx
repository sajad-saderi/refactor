import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
const Button = dynamic(() => import('../src/components/form/Button'));
// import Layout from "../src/Layout";
import { useRouter } from 'next/router';
import { IoIosCloseCircleOutline } from 'react-icons/io';
// import Button from "../src/components/form/Button";
import { NextSeo } from 'next-seo';
// import { logPageView } from "../utils/analytics";

const Failed_payment = ({ locale }) => {
  const router = useRouter();
  useEffect(() => {
    window['dataLayer'].push({
      event: 'page_view',
      pageURL: window.location.href,
      pagePath: '/payment-failed',
      pageTitle: locale.PAGE_HEADER.payment.failTitle,
    });
    // logPageView();
  }, []);
  return (
    <Layout>
      <NextSeo
        title={locale.PAGE_HEADER.payment.failTitle}
        description={locale.PAGE_HEADER.payment.failTitle}
        openGraph={{
          title: locale.PAGE_HEADER.payment.failTitle,
          description: locale.PAGE_HEADER.payment.failTitle,
          site_name: locale.COMMON.site_name,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <article className="responsive minHeight failed_payment">
        <section className="alarm_container">
          <IoIosCloseCircleOutline size="10rem" color="a3678b" />
          <p>{locale.PAYMENT_PAGE.cancel}</p>
        </section>
        <Button
          class="Blue_BTN local_style"
          click={() => router.push('/')}
          value={locale.COMMON.backToHome}
          loading={false}
        />
      </article>
    </Layout>
  );
};

export default Failed_payment;
