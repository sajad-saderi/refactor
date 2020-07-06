import React from "react";
import Layout from "../src/Layout";
import { NextSeo } from "next-seo";

const AboutUs = () => {
  return (
    <Layout showToTop={true}>
      <NextSeo
        title="درباره اتولی"
        description="اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید."
        openGraph={{
          title: "درباره اتولی",
          description: "درباره اتولی",
          site_name: "اتولی",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <section className="responsive static_pages minHeight">
        <div className="AboutUsPage">
          <h1>درباره اتولی</h1>
          <p>
            اتولی، سامانه اجاره آنلاین خودرو، پل ارتباطی است بین میزبان و
            مهمان؛ جایی که مهمان می‌تواند ماشین دل‌خواهش را در هر
            زمانی از بین صدها خودروی پیشنهادی پیدا کند و میزبان از اجاره
            خودروی خود کسب درآمد کند. اتولی سعی دارد برای معاملات اجاره خودرو
            بستری امن فراهم کند تا میزبان و مهمان، با اطمینان بیشتر
            ماشین اجاره دهند یا اجاره بگیرند. هدف ما این است که قیمت‌های اجاره
            خودرو شفاف‌تر شوند، خسارت‌های احتمالی کاهش پیدا کند و معاملات با
            اطمینان خاطر بیشتری انجام شوند. ما برای رسیدن به هدف‌هایمان
            فعالیتمان را از شهر تهران شروع کرده‌ایم و قصد داریم در ادامه راه با
            حمایت شما امکان اجاره آنلاین خودرو را به شهرهای دیگر ایران هم اضافه
            کنیم.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
