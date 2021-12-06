import { useEffect, useState } from "react";
import insurance from "../../../../public/image/SamanInsurance.png";
import Link from "next/link";
import { guard_controller } from "../../../../utils/guard_controller";

import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"));
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import quotation from "../../../../public/image/svg/quotation.svg";

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
    autoplaySpeed: 15000,
    arrows: false,
  };

  return (
    <div className="responsive second_part_container">
      <div className="insuranceBox">
        <p>{language.INFORMATION.text1}</p>
        <img src={insurance} alt={language.COMMON.samanInsuranceImage} />
      </div>
      <div className=" responsive second_container">
        <div className="full_width">
          <h2>{language.INFORMATION.text2}</h2>
          <p>{language.INFORMATION.text3}</p>
        </div>
        <h2>{language.INFORMATION.text4}</h2>
        <div className="three_columns">
          <section>
            <h3>{language.INFORMATION.text5}</h3>
            <p>{language.INFORMATION.text6}</p>
          </section>
          <section>
            <h3>{language.INFORMATION.text7}</h3>
            <p>{language.INFORMATION.text8}</p>
          </section>
          <section>
            <h3>{language.INFORMATION.text9}</h3>
            <p>{language.INFORMATION.text10}</p>
          </section>
        </div>
        <div
          className="add_car_section"
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
          <Link href={"/add-car"} prefetch={false}>
            <a className="Blue_BTN add_car_custom HEAP_joinUs_Btn_AddCar">
              {AbText}
            </a>
          </Link>
          {/* <p className="call_us">
            سوالی دارید؟ با ما تماس بگیرید:‌{" "}
            <a className="TellPhone" href="tel:02188567759">
              ۰۲۱۸۸۵۶۷۷۵۹{" "}
            </a>
          </p> */}
          <section className="slick_container">
            <h2>میزبان‌ها درباره سپریس چه می‌گویند؟</h2>
            <Slider {...settings}>
              <div className="card_container">
                <img src={quotation} alt="sign" />
                <p>
                  {language.JOIN_US_PAGE.reviews.review1}
                </p>
                <h3>{language.COMMON.host}</h3>
                <p className="user_name">{language.JOIN_US_PAGE.reviews.name1}</p>
              </div>
              <div className="card_container">
                <img src={quotation} alt="sign" />
                <p>
                  {language.JOIN_US_PAGE.reviews.review2}
                </p>
                <h3>{language.COMMON.host}</h3>
                <p className="user_name">{language.JOIN_US_PAGE.reviews.name2}</p>
              </div>
              <div className="card_container">
                <img src={quotation} alt="sign" />
                <p>
                  {language.JOIN_US_PAGE.reviews.review3}
                </p>
                <h3>{language.COMMON.host}</h3>
                <p className="user_name">{language.JOIN_US_PAGE.reviews.name3}</p>
              </div>
            </Slider>
          </section>
        </div>
      </div>
    </div>
  );
};

interface IJoin_us_content_AB_test {
  AbText: string;
  language: any;
}
export default Join_us_content_AB_test;
