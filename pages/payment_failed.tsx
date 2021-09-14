import { useEffect } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../src/Layout"));
const Button = dynamic(() => import("../src/components/form/Button"));
// import Layout from "../src/Layout";
import { useRouter } from "next/router";
import { IoIosCloseCircleOutline } from "react-icons/io";
// import Button from "../src/components/form/Button";
import { NextSeo } from "next-seo";
import language from "../public/languages/fa/paymentfaild.json";
// import { logPageView } from "../utils/analytics";

const Failed_payment = () => {
  const router = useRouter();
  useEffect(() => {
    window["dataLayer"].push({
      event: "page_view",
      pageURL: window.location.href,
      pagePath: "/payment-failed",
      pageTitle: language.next_seo.title,
    });
    // logPageView();
  }, []);
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
      <article className="responsive minHeight failed_payment">
        <section className="alarm_container">
          <IoIosCloseCircleOutline size="10rem" color="a3678b" />
          <p>{language.cancel}</p>
        </section>
        <Button
          class="Blue_BTN local_style"
          click={() => router.push("/")}
          value={language.main_page}
          loading={false}
        />
      </article>
    </Layout>
  );
};

export default Failed_payment;
