import React, { useState, useEffect } from "react";
import Layout from "../src/Layout";
import Router from "next/router";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Button from "../src/components/form/Button";
import "../src/styles/pages/Failed_payment.module.scss";

const Failed_payment = () => {
  return (
    <Layout>
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
