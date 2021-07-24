import { useState, useEffect } from "react";
import Icon from "../../../utils/Icon";
import moment from "moment-jalaali";
import dynamic from "next/dynamic";

const StarGenerator = dynamic(() => import("../StarGenerator"));
// import StarGenerator from "../StarGenerator";

const Review = ({ review, language, without_title }: IReview) => {
  return (
    <article className='review_article responsive'>
      <section className='review_container_car_page'>
        {!without_title ? (
          <h2>
            <Icon name='balloon' />
            <span>{language.user_reviews}</span>
          </h2>
        ) : null}
        {review.length > 0 ? (
          review.map((item) => {
            return (
              <div className='margin_right_24 margin_bottom_24' key={item.id}>
                <p className='margin_bottom_8 size_14'>
                  {item.reviewer_user_profile.name}
                </p>
                <p className='size_12 dark_gray'>
                  <StarGenerator count={item.rate} />
                  {moment.unix(item.creation_time.timestamp).format("jD jMMMM")}
                </p>
                <p className='margin_top_12 size_14 review_content'>
                  {item.review}
                </p>
              </div>
            );
          })
        ) : (
          <p className='margin_right_24 size_14'>
            تا کنون نظری برای این خودرو ثبت نشده است.
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
}

export default Review;
