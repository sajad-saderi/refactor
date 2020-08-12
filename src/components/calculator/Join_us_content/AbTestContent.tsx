import React from "react";
import insurance from "../../../../public/image/SamanInsurance.png";
import Link from "next/link";

const Join_us_content_AB_test = (props: IJoin_us_content) => {
  return (
    <>
      <div className="insuranceBox">
        <p>با همکاری </p>
        <img src={insurance} alt="تصویر بیمه سامان" />
      </div>
      <div className=" responsive second_container">
        <div className="full_width">
          <h2>اتولی چه کار می‌کند؟</h2>
          <p>
            اتولی، سیستم اجاره خودرو به صورت آنلاین، پل ارتباطی است میان میزبان
            و مهمان خودرو. از طریق اتولی می‌توانید در هر تاریخی و از بین لیست
            خودروهای موجود، ماشین مورد نظرتان را اجاره کنید. همچنین سیستم ثبت
            خودرو جهت اجاره به شما این امکان را می‌دهد که از اجاره‌دادن ماشین
            خود کسب درآمد کنید.
          </p>
        </div>
        <h2>چرا در اتولی ماشین اجاره دهیم؟</h2>
        <div className="three_columns">
          <section>
            <h3>اعتبارسنجی مهمان‌ها</h3>
            <p>
              اتولی با هماهنگی مهمان‌ها (اجاره گیرنده‌ها) سوابق مالی آنها را با
              استفاده از سیستم آنلاین اعتبارسنجی مورد تایید بانک مرکزی بررسی
              می‌کند تا میزبان بتواند با آگاهی بیشتری نسبت به قبول یا رد
              درخواست‌های اجاره تصمیم‌گیری کند.
            </p>
          </section>
          <section>
            <h3>تضمین بیمه</h3>
            {/* <p>
              با خیال راحت کسب درآمد کنید. بیمه اجاره خودرو بابت خسارت‌های
              احتمالی به شما اطمینان خاطر خواهد داد.
            </p> */}
            <p>
              با بیمه اجاره خودرو که توسط مهمان تهیه می‌شود، بدون نگرانی بابت
              دزدی، تصادف و حوادث احتمالی با خیال راحت کسب درآمد کنید.
            </p>
          </section>
          <section>
            <h3>با شرایط شما</h3>
            <p>
              رایگان و با شرایط مورد نظر خود، ماشین‌تان را در اتولی ثبت کنید.
              اجاره خودرو به تعداد روزهای تعیین شده از سمت شما، در تاریخ‌های
              مدنظر شما، قیمت انتخابی شما و با بررسی کامل شخص مهمان از طرف شما
              انجام خواهد شد.
            </p>
          </section>
        </div>
        <div className="add_car_section">
          <Link href="/add-car">
            <a className="Blue_BTN add_car_custom HEAP_joinUs_Btn_AddCar">
              {props.AbText}
            </a>
          </Link>
          <p className="call_us">
            سوالی دارید؟ با ما تماس بگیرید:‌{" "}
            <a className="TellPhone" href="tel:02188567759">
              ۰۲۱۸۸۵۶۷۷۵۹{" "}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

interface IJoin_us_content {
  AbText: string;
}
export default Join_us_content_AB_test;
