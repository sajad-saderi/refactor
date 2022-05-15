import { useState, useEffect } from "react"; 
import moment from "moment-jalaali";
import dynamic from "next/dynamic";
import { supportedLanguages } from '../../../utils/types'
import { numberChanger } from "../../../utils/numberChanger";
import Icon from "../Icons";

const StarGenerator = dynamic(() => import("../StarGenerator"));
// import StarGenerator from "../StarGenerator";

const Review = ({ review, language, without_title, profile, locale }: IReview) => {

  useEffect(() => {
    moment.locale(locale)
  }, [
    locale
  ])
  return (
    <article className='review_article responsive' dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <section className='review_container_car_page'>
        {!without_title ? (
          <h2>
            <Icon name='chatBalloon' color="#116B98" width="16px" height="16px" />
            <span>{language.CAR_PAGE.reviews}</span>
          </h2>
        ) : null}
        {review.length > 0 ? (
          review.map((item) => {
            return (
              <div className='margin_right_24 margin_bottom_24' key={item.id}>
                <p className='margin_bottom_8 size_14 weight_500'>
                  {item.reviewer_user_profile.name}
                </p>
                <p className='size_12 dark_gray'>
                  <StarGenerator count={item.rate} locale={locale} />
                  {numberChanger(moment.unix(item.creation_time.timestamp).format(locale === "fa" ? "jD jMMMM" : "D MMMM"),locale)}
                </p>
                <pre className='margin_top_12 size_14 review_content'>
                  {item.review}
                </pre>
              </div>
            );
          })
        ) : (
          <p className='margin_right_24 size_14 nothing-to-show'>
            {profile
              ? language.CAR_PAGE.noReview
              : language.CAR_PAGE.noReview}
          </p>
        )}
      </section>
    </article>
  );
};

interface IReview {
  review: any;
  language?: any;
  without_title?: boolean;
  profile?: boolean;
  locale: supportedLanguages
}

export default Review;
