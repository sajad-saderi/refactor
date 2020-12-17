import React, { useState, useEffect } from "react";
import Icon from "../../../utils/Icon";
import moment from "moment-jalaali";
import StarGenerator from "../StarGenerator";

const Review = ({ review, language }: IReview) => {
  return (
    <article className='review_article responsive'>
      <section className='review_container_car_page padding_16'>
        <h2>
          <Icon name='balloon' />
          <span>{language.user_reviews}</span>
        </h2>
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
                <p className='margin_top_12 size_14'>{item.review}</p>
              </div>
            );
          })
        ) : (
          <p>تا کنون نظری برای این خودرو ثبت نشده است.</p>
        )}
      </section>
    </article>
  );
};

interface IReview {
  review: any;
  language: any;
}

export default Review;
