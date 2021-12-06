import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import insurance from '../../../../public/image/SamanInsurance.png';
import Link from 'next/link';
import { guard_controller } from '../../../../utils/guard_controller';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import quotation from "../../../../public/image/svg/quotation.svg";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Slider = dynamic(() => import('react-slick'));
import quotation from '../../../../public/image/svg/quotation.svg';

let percentageOfplayedVideo = 0
let videoNumber = 1

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

const Join_us_content = ({
  AbText,
  language,
  shouldHideCommnets,
  showVideo,
}: IJoin_us_content) => {
  const [authorize, set_authorize] = useState(true);

  useEffect(() => {
    const guard = guard_controller();
    if (guard !== 'auth') {
      set_authorize(false);
    }
    return () => {
      if (percentageOfplayedVideo)
        window["dataLayer"].push({
          event: "conversions",
          action: `join_us_video_play_${videoNumber}`,
          label: `${percentageOfplayedVideo}%`,
        });
    }
  }, []);

  const videoPlayed = (e, number) => {
    e.persist()
    const { target } = e
    videoNumber = number
    percentageOfplayedVideo = +target.currentTime.toFixed(0)
    if (percentageOfplayedVideo <= 10) percentageOfplayedVideo = 10
    else if (percentageOfplayedVideo <= 25) percentageOfplayedVideo = 25
    else if (percentageOfplayedVideo <= 50) percentageOfplayedVideo = 50
    else if (percentageOfplayedVideo <= 75) percentageOfplayedVideo = 75
    else if (percentageOfplayedVideo <= 90) percentageOfplayedVideo = 90
    else percentageOfplayedVideo = 100
  }

  return (
    <div className="responsive second_part_container">
      <div className="insuranceBox">
        <p>{language.INFORMATION.text1}</p>
        <img src={insurance} alt={language.COMMON.samanInsuranceImage} />
      </div>
      <div className=" responsive second_container">
        <h2>{language.INFORMATION.text2}</h2>
        <div className="full_width">
          <p>{language.INFORMATION.text3}</p>
        </div>
        <h2>{language.INFORMATION.text11}</h2>
        <div className="three_columns">
          <section>
            <h3>{language.INFORMATION.text5}</h3>
            <p>{language.INFORMATION.text6}</p>
          </section>
          <section>
            <h3>{language.INFORMATION.text12}</h3>
            <p>{language.INFORMATION.text13}</p>
          </section>
          <section>
            <h3>{language.INFORMATION.text7}</h3>
            <p>{language.INFORMATION.text8}</p>
          </section>
        </div>
        <div
          className="add_car_section"
          onClickCapture={() => {
            if (!authorize) {
              localStorage['last_location'] = '/add-car';
            }
          }}
        >
          <Link href="/add-car" prefetch={false}>
            <a className="Blue_BTN add_car_custom HEAP_joinUs_Btn_AddCar">
              {AbText}
            </a>
          </Link>
          {shouldHideCommnets ? null : (
            <section className="slick_container">
              <h2>{language.JOIN_US_PAGE.reviews.title}</h2>
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
          )}
          {showVideo ? (
            <section className="slick_container">
              <h2>{language.JOIN_US_PAGE.reviews.title}</h2>
              <video controls onClick={e => videoPlayed(e, 2)}>
                <source
                  src='https://core.sepris.com/media/join_us_user_review_2.mp4'
                  type="video/mp4"
                />
                {language.COMMON.videoNotSupported}
              </video>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
};

interface IJoin_us_content {
  AbText: string;
  language: any;
  shouldHideCommnets: boolean;
  showVideo: boolean;
}
export default Join_us_content;
