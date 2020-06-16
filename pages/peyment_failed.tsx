import React from "react";
import Layout from "../src/Layout";
import Router from "next/router";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Button from "../src/components/form/Button";
import "../src/styles/pages/Failed_payment.scss";
import { NextSeo } from "next-seo";

const Failed_payment = () => {
  return (
    <Layout>
      <NextSeo
        title="پرداخت ناموفق"
        description="پرداخت موفق"
        openGraph={{
          title: "پرداخت ناموفق",
          description:
            "پرداخت موفق",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      <article className="responsive minHeight failed_payment">
        <section className="alarm_container">
          <IoIosCloseCircleOutline size="10rem" color="a3678b" />
          <p>انصراف از پرداخت</p>
        </section>
        <Button
          class="Blue_BTN local_style"
          click={() => Router.push("/")}
          value="صفحه اصلی"
          loading={false}
        />
      </article>
    </Layout>
  );
};

export default Failed_payment;
