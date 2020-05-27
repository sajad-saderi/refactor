import React from "react";
import { NextSeo } from "next-seo";
import Layout from "../src/Layout";

const gps = () => {
  return (
    <Layout showToTop={true}>
      <NextSeo
        title="راهنمای انتخاب ردیاب | اتولی"
        description="راهنمای انتخاب ردیاب با توجه به نیاز‌های شما برای اجاره خودروتان"
        openGraph={{
          title: "راهنمای انتخاب ردیاب | اتولی",
          description:
            "راهنمای انتخاب ردیاب با توجه به نیاز‌های شما برای اجاره خودروتان",
        }}
        twitter={{
          handle: "@otoli_net",
          site: "@otoli_net",
          cardType: "summary_large_image",
        }}
      />
      {/* Most of the static pages have a same class named 'static_pages' which set some common style for the main wrapper box*/}
      <article className="responsive static_pages minHeight">
        <h1>راهنمای انتخاب ردیاب</h1>
        <p>
          ردیاب‌ها قابلیت نصب بر روی تمامی خودروها را دارند، می‌توانید قبل از
          اجاره دادن خودروی خود بر روی آن ردیاب نصب کنید. برای نصب ردیاب بر روی
          خودرو موارد زیر را در نظر بگیرید:
        </p>
        <ul>
          <li>
            ردیاب خودرو یک وسیله بسیار کوچک است که سیم‌کارت می‌خورد و می‌توان
            خودرو را از راه دور با نصب اپلیکیشن بر روی موبایل و یا کامپیوتر
            کنترل کرد. به این ترتیب می‌توانید خودروی خود را به صورت آنلاین
            ردیابی کنید و درکل مسیر پیگیری کنید.
          </li>
          <li>
            ردیاب‌ها به دلیل سایز کوچکی که دارند، قابلیت نصب در قسمت‌های مختلف
            خودرو را دارند. مناسب‌ترین مکان ها برای نصب ردیاب در خودرو زیر سپر،
            صندوق عقب و یا داخل یکی از درب‌ها است. انتخاب مکان مناسب جهت نصب
            ردیاب باعث افزایش کارایی و قدرت سیگنال دهی آن‌ها شود.
          </li>
          <li>
            ردیاب‌ها باید حتما دور از دسترس و دید نصب شوند، زیرا اگر در معرض دید
            باشد کارایی مطلوبی نخواهد داشت و در صورت سرقت ماشین به راحتی قابل
            تشخیص بوده و سارق می‌تواند آن را از کار بیاندازد.
          </li>
          <li>
            از طریق نصب ردیاب می‌توانید موقعیت لحظه‌ای خودروی خود را از طریق
            پیامک دریافت کنید. همچنین سرعت خودرو، وضعیت موتور، دستکاری شدن برق
            خودرو از طریق پیامک نیز ارسال می‌شود.
          </li>
          <li>
            استفاده از ردیاب به شما این امکان را می‌دهد که هر لحظه مکان دقیق
            خودروی خود را از طریق ماهواره‌های جی‌پی‌اس دریافت کنید و اگر خودروی
            شما در جایی غیر از مکان توافق شده بود بتوانید آن را خاموش کنید.
          </li>
          <li>
            بهتر است از ردیاب سیمکارت دار استفاده کنید و از فعال بودن GPRS مطمئن
            باشید.
          </li>
          <li>
            شما به کمک ردیاب می‌توانید سرعت مجاز خودرو، وارد یا خارج شدن به یک
            منطقه مشخص، تصادف کردن، بازشدن درب خودرو و موارد دیگر را تعیین کنید.
          </li>
          <li>
            ردیاب‌ها دارای یک باتری داخلی هستند، سعی کنید ردیابی را انتخاب کنید
            که شارژ بیش‌تری نگه می‌دارد و بسیاری از ردیاب‌ها پس از قطع برق داخلی
            خودور بیش از سه ساعت عمل ردیابی را انجام می‌دهند.
          </li>
        </ul>
      </article>
    </Layout>
  );
};

export default gps;
