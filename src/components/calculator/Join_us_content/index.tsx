import React from "react";
import insurance from "../../../../public/image/SamanInsurance.png";
import Link from "next/link";

const Join_us_content = () => {
  return (
    <section>
      <div>
        <section>
          <div>
            <div>
              <p>با همکاری </p>
              <img src={insurance} alt="تصویر بیمه سامان" />
            </div>
            <div>
              <h2>اتولی چه کار می‌کند؟</h2>
              <p>
                اتولی، سیستم اجاره خودرو به صورت آنلاین، پل ارتباطی است میان
                اجاره‌دهنده و اجاره‌گیرنده خودرو. از طریق اتولی می‌توانید در هر
                تاریخی و از بین لیست خودروهای موجود، ماشین مورد نظرتان را اجاره
                کنید. همچنین سیستم ثبت خودرو جهت اجاره به شما این امکان را
                می‌دهد که از اجاره‌دادن ماشین خود کسب درآمد کنید.
              </p>
            </div>
          </div>
        </section>
        <section className="responsive WHITE whyOtoli">
          <h2>چرا در اتولی ماشین اجاره دهیم؟</h2>
          <div className="WhyOtolicontainer">
            <section className="WhyOtolibox">
              <h3>کسب درآمد</h3>
              <p>
                {" "}
                اطلاعات ماشین‌تان را در اتولی ثبت کنید و منتظر بمانید! با اتولی
                می‌توانید از اجاره ماشین‌تان درآمد روزانه داشته باشید. فقط
                کافی‌ست اطلاعات خودرو را درست و دقیق وارد کنید و تصاویر خوب و
                باکیفیت برای ماشین‌تان انتخاب کنید.
              </p>
            </section>
            <section className="WhyOtolibox">
              <h3>با شرایط شما</h3>
              <p>
                رایگان و با شرایط مورد نظر خود، ماشین‌تان را در اتولی ثبت کنید.
                اجاره خودرو به تعداد روزهای تعیین شده از سمت شما، در تاریخ‌های
                مدنظر شما، قیمت انتخابی شما و با بررسی کامل شخص اجاره‌گیرنده از
                طرف شما انجام خواهد شد.
              </p>
            </section>
            <section className="WhyOtolibox">
              <h3>تضمین بیمه</h3>
              <p>
                علاوه بر تضمین‌های معمول مانند چک، سفته و ودیعه نقدی که هنگام
                اجاره خودرو از اجاره گیرنده اخذ می‌شود اتولی با همکاری بیمه
                سامان این امکان را فراهم کرده که با خیال راحت‌ از ماشین‌تان کسب
                درآمد کنید. بیمه اجاره خودرو، خسارت‌های احتمالی از قبیل سرقت و
                تصادف را پوشش می‌دهد.
              </p>
            </section>
          </div>
          <div className="addCarnow">
            <Link href="/add-car">
              <a className="addCar_bottom_joinus_a">ماشین‌تان را اضافه کنید</a>
            </Link>
            <p
              style={{
                textAlign: "center",
                marginTop: "16px",
                direction: "rtl",
              }}
            >
              سوالی دارید؟ با ما تماس بگیرید:‌{" "}
              <a className="TellPhone" href="tel:02188567759">
                {" "}
                ۰۲۱۸۸۵۶۷۷۵۹{" "}
              </a>
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Join_us_content;
