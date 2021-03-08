import React, { useEffect, useState } from "react";
import insurance from "../../../../public/image/SamanInsurance.png";
import Link from "next/link";
import { guard_controller } from "../../../../utils/guard_controller";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import quotation from "../../../../public/image/svg/quotation.svg";
import "./join_us_content.scss";

const Join_us_content_AB_test = ({
  AbText,
  language,
}: IJoin_us_content_AB_test) => {
  const [authorize, set_authorize] = useState(true);

  useEffect(() => {
    const guard = guard_controller();
    if (guard !== "auth") {
      set_authorize(false);
    }
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    rtl: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
      <div className='insuranceBox'>
        <p>{language.insuranceBox_p}</p>
        <img src={insurance} alt={language.insuranceBox_image} />
      </div>
      <div className=' responsive second_container'>
        <div className='full_width'>
          <h2>{language.full_width_h2}</h2>
          <p>{language.full_width_p}</p>
        </div>
        <h2>{language.second_container_h2}</h2>
        <div className='three_columns'>
          <section>
            <h3>{language.three_columns_h3_1}</h3>
            <p>{language.three_columns_p_1}</p>
          </section>
          <section>
            <h3>{language.three_columns_h3_2}</h3>
            {/* <p>
              با خیال راحت کسب درآمد کنید. بیمه اجاره خودرو بابت خسارت‌های
              احتمالی به شما اطمینان خاطر خواهد داد.
            </p> */}
            <p>{language.three_columns_p_2}</p>
          </section>
          <section>
            <h3>{language.three_columns_h3_3}</h3>
            <p>{language.three_columns_p_3}</p>
          </section>
        </div>
        <div
          className='add_car_section'
          onClickCapture={() => {
            if (!authorize) {
              localStorage["last_location"] = "/add-car";
            }
          }}
        >
          {/* <Link href={authorize ? "/add-car" : "/login"}>
            <a className='Blue_BTN add_car_custom HEAP_joinUs_Btn_AddCar'>
              {AbText}
            </a>
          </Link> */}
          <Link href={"/add-car"}>
            <a className='Blue_BTN add_car_custom HEAP_joinUs_Btn_AddCar'>
              {AbText}
            </a>
          </Link>
          {/* <p className="call_us">
            سوالی دارید؟ با ما تماس بگیرید:‌{" "}
            <a className="TellPhone" href="tel:02188567759">
              ۰۲۱۸۸۵۶۷۷۵۹{" "}
            </a>
          </p> */}
          <h2>میزبان‌ها درباره سپریس چه می‌گویند؟</h2>
          <section className='slick_container'>
            <Slider {...settings}>
              <div className='card_container'>
                <img src={quotation} alt='علامت کوتیشن' />
                <p>
                  تا قبل از آشنایی با سپریس، ماشینم رو اجاره نداده بودم. اولش
                  شناخت زیادی از سپریس نداشتم و بار اول اجاره دادن ماشین از نظرم
                  ریسک بود ولی از دفعات بعد با توجه به نحوه کار و پشتیبانی‌تون
                  اعتمادم جلب شد. چون تا حالا تو هیچ شرکتی ندیدم که مثل شما
                  واقعا «پشتیبان» داشته باشن. هر وقت از شبانه‌روز که تماس گرفتم
                  حضور داشتین و برای تصمیم‌گیری همراهم بودین.{" "}
                </p>
                <h3>میزبان</h3>
                <p className='user_name'>رضا جلیلی</p>
              </div>
              <div className='card_container'>
                <img src={quotation} alt='علامت کوتیشن' />
                <p>
                  وقتی تصمیم به اجاره خودروم گرفتم، از طریق جستجو در گوگل با
                  سپریس آشنا شدم و بعد از دیدن سایت و تماس با پشتیبانی، اعتمادم
                  جلب شد. بعدها هم هر بار با پشتیبانی تماس گرفتم، در دسترس بودن
                  و هیچ مسئله‌ای رو از قلم نمی‌انداختن. با وجود این‌که ماشینم
                  بیمه بدنه داره، بیمه اجاره خودرو سپریس رو مثل یک قانون در نظر
                  گرفتم و درخواست مهمان‌هایی رو که بیمه خریداری کرده‌اند در
                  اولویت می‌ذارم. تا حالا چند بار ماشینم رو از طریق سپریس اجاره
                  دادم، چون خیالم راحته و قصد دارم باز هم به این کار ادامه بدم.
                </p>
                <h3>میزبان</h3>
                <p className='user_name'>جواد کسایی</p>
              </div>
              <div className='card_container'>
                <img src={quotation} alt='علامت کوتیشن' />
                <p>
                  زمانی که تصمیم گرفتم ماشینم رو اجاره بدم، چندین شرکت رو بررسی
                  کردم اما در نهایت شرکت شما رو انتخاب کردم، چون شرایط بهتری
                  داشتید و این امکان رو فراهم کردید که مهمان بیمه اجاره خودرو
                  خریداری کنه و همین‌طور ما (میزبان)، مهمان را مستقیم ببینیم،
                  رودررو با هم صحبت کنیم و شرایط رو بررسی کنیم. پشتیبانی هم
                  همیشه در دسترس بوده و در همه مسائل به بهترین شکل ما رو
                  راهنمایی کرده.
                </p>
                <h3>میزبان</h3>
                <p className='user_name'>فرزین روحانی</p>
              </div>
            </Slider>
          </section>
        </div>
      </div>
    </>
  );
};

interface IJoin_us_content_AB_test {
  AbText: string;
  language: any;
}
export default Join_us_content_AB_test;
