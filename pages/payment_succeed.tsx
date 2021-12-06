import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../src/Layout'));
import { NextSeo } from 'next-seo';
import SucceedPayment from '../src/components/succeed_payment';

const Success_payment = ({ locale }) => {
  return (
    <Layout>
      <NextSeo
        title={locale.PAGE_HEADER.payment.successTitle}
        description={locale.PAGE_HEADER.payment.successTitle}
        openGraph={{
          title: locale.PAGE_HEADER.payment.successTitle,
          description: locale.PAGE_HEADER.payment.successTitle,
          site_name: locale.COMMON.site_name,
        }}
        twitter={{
          handle: locale.PAGE_HEADER.handle,
          site: locale.PAGE_HEADER.site,
          cardType: locale.PAGE_HEADER.cardType,
        }}
      />
      <SucceedPayment language={locale} />
    </Layout>
  );
};

export default Success_payment;
