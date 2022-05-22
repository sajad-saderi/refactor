import insurance from "../../../public/image/SamanInsurance.png";
import Recommendation_section_owl from "../recommendation_section/recommendation_section_owl";
import dynamic from "next/dynamic";

import Link from "next/link";
import languageCTX from "../../context/languageCTX";
import { useContext } from "react";
import Icon from "../Icons";
import Image from "next/image";
const Slider = dynamic(() => import("react-slick"));

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  rtl: true,
  slidesToScroll: 1,
  autoplay: false,
  arrows: false,
};
const ContentHomePage = ({
  auth,
  differentStyle,
  extraContent,
  abTest,
  language,
  showSlider,
  showLink,
  showRentPageContent,
}: IContentHomePage) => {
  const { activeLanguage } = useContext(languageCTX);
  return (
    <div className="responsive second_part_container">
      <div
        className={["insuranceBox", differentStyle ? "marginFromTop" : ""].join(
          " "
        )}
      >
        <p>{language.INFORMATION.text1}</p>
        <Image src={insurance} alt={language.COMMON.samanInsuranceImage} 
         width={115}
         height={47}/>
      </div>
      <div className="second_container">
        <h2>{language.INFORMATION.text2}</h2>
        <div className="full_width">
          <p>{language.INFORMATION.text3}</p>
        </div>
        {language === "fa" && (
          <>
            <h2>{language.INFORMATION.text4}</h2>
            <div className="three_columns">
              <section>
                <h3>{language.INFORMATION.text5}</h3>
                <p>{language.INFORMATION.text6}</p>
              </section>
              <section>
                <h3>{language.INFORMATION.text29}</h3>
                <p>{language.INFORMATION.text30}</p>
              </section>
              <section>
                <h3>{language.INFORMATION.text7}</h3>
                <p>{language.INFORMATION.text8}</p>
              </section>
            </div>
          </>
        )}
        <Recommendation_section_owl language={language} />
        <h2>{language.INFORMATION.text11}</h2>
        <div className="three_columns">
          <section>
            <h3>{language.INFORMATION.text12}</h3>
            <p>{language.INFORMATION.text13}</p>
          </section>
          <section>
            <h3>{language.INFORMATION.text14}</h3>
            <p>{language.INFORMATION.text15}</p>
          </section>
          <section>
            <h3>{language.INFORMATION.text16}</h3>
            <p>{language.INFORMATION.text17}</p>
          </section>
        </div>
        {activeLanguage === "fa"
          ? showSlider && (
              <section
                className="slick_container"
                dir={activeLanguage === "fa" ? "rtl" : "ltr"}
              >
                <h2 style={{ padding: "0", fontSize: "18px" }}>
                  {language.JOIN_US_PAGE.reviews.titleGuests}
                </h2>
                <Slider {...settings}>
                  <div className="card_container">
                    <Icon
                      name="quotation"
                      width="24px"
                      height="24px"
                      color="#116b98"
                    />

                    <p>{language.JOIN_US_PAGE.reviews.guest7}</p>
                  </div>
                  <div className="card_container">
                    <Icon
                      name="quotation"
                      width="24px"
                      height="24px"
                      color="#116b98"
                    />

                    <p>{language.JOIN_US_PAGE.reviews.guest6}</p>
                  </div>
                  <div className="card_container">
                    <Icon
                      name="quotation"
                      width="24px"
                      height="24px"
                      color="#116b98"
                    />

                    <p>{language.JOIN_US_PAGE.reviews.guest5}</p>
                  </div>
                  <div className="card_container">
                    <Icon
                      name="quotation"
                      width="24px"
                      height="24px"
                      color="#116b98"
                    />

                    <p>{language.JOIN_US_PAGE.reviews.guest4}</p>
                  </div>
                  <div className="card_container">
                    <Icon
                      name="quotation"
                      width="24px"
                      height="24px"
                      color="#116b98"
                    />

                    <p>{language.JOIN_US_PAGE.reviews.guest3}</p>
                  </div>
                  <div className="card_container">
                    <Icon
                      name="quotation"
                      width="24px"
                      height="24px"
                      color="#116b98"
                    />

                    <p>{language.JOIN_US_PAGE.reviews.guest2}</p>
                  </div>
                  <div className="card_container">
                    <Icon
                      name="quotation"
                      width="24px"
                      height="24px"
                      color="#116b98"
                    />

                    <p>{language.JOIN_US_PAGE.reviews.guest1}</p>
                  </div>
                </Slider>
              </section>
            )
          : null}
        {activeLanguage === "fa" && (
          <>
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
                <h3>{language.INFORMATION.text12}</h3>
                <p>{language.INFORMATION.text10}</p>
              </section>
            </div>
          </>
        )}
        {showRentPageContent && activeLanguage === "en" && (
          <div>
            <h2>{language.RENT_PAGE.h2_3}</h2>
            <div className="full_width">
              <p>{language.RENT_PAGE.p2_1}</p>
              <p>{language.RENT_PAGE.p2_2}</p>
              <br />
              <h2>{language.RENT_PAGE.h2_4}</h2>
              <p>{language.RENT_PAGE.p3_1}</p>
            </div>
          </div>
        )}
        {activeLanguage === "fa" && showLink && (
          <div
            className="add_car_section"
            onClickCapture={() => {
              if (!auth) {
                localStorage["last_location"] = "/add-car";
              }
            }}
          >
            <Link href="/join-us" prefetch={false}>
              <a className="Blue_BTN add_car_custom">
                {language.COMMON.goToJoinUs}
              </a>
            </Link>
            <Link href="/add-car" prefetch={false}>
              <a>{language.COMMON.addYourCar}</a>
            </Link>
            {extraContent && extraContent}
          </div>
        )}
      </div>
    </div>
  );
};

interface IContentHomePage {
  auth: boolean;
  differentStyle?: boolean;
  extraContent?: any;
  abTest?: boolean;
  showSlider: boolean;
  language: any;
  showLink: boolean;
  showRentPageContent?: boolean;
}

export default ContentHomePage;
