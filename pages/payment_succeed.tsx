import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/paymentsucceed.json";
import SucceedPayment from "../src/components/succeed_payment";

const Success_payment = () => {
  return (
    <Layout>
      <NextSeo
        title={language.next_seo.title}
        description={language.next_seo.description}
        openGraph={{
          title: language.next_seo.title,
          description: language.next_seo.description,
        }}
        twitter={{
          handle: language.next_seo.handle,
          site: language.next_seo.site,
          cardType: language.next_seo.cardType,
        }}
      />
      <SucceedPayment language={language} />
    </Layout>
  );
};

export default Success_payment;
