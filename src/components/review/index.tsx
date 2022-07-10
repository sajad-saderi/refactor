import { useEffect, useState } from 'react';
import moment from 'moment-jalaali';
import { supportedLanguages } from '../../../utils/types';
import { numberChanger } from '../../../utils/numberChanger';
import StarGenerator from '../StarGenerator';
import { REQUEST_GET_CAR_REVIEW } from '../../API';
import styles from './index.module.scss';
import ReviewLoading from './loadnig';
import { ILocale } from '../../../types';
import LoadMoreButton from '../loadMoreButton';

const Review: React.FC<{
  language: ILocale;
  locale: supportedLanguages;
  id: string | number;
  renter?: boolean;
  owner?: boolean;
  noReview: string;
}> = ({ locale, id, renter, owner, noReview, language }) => {
  const [review, setReView] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    moment.locale(locale);
  }, [locale]);

  useEffect(() => {
    get_reviews();
  }, []);
  useEffect(() => {
    setReView(null);
    get_reviews();
  }, [renter, owner]);

  const get_reviews = async () => {
    try {
      const reviews: any = await REQUEST_GET_CAR_REVIEW(id, renter, owner);
      setReView(reviews.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.wrapper}>
      {review ? (
        review.length > 0 ? (
          <>
            {review.map((item) => {
              return (
                <div className={styles.reviewContainer} key={item.id}>
                  <p className={styles.name}>
                    {item.reviewer_user_profile.name}
                  </p>
                  <p className={styles.date}>
                    <StarGenerator count={item.rate} locale={locale} />
                    {numberChanger(
                      moment
                        .unix(item.creation_time.timestamp)
                        .format(locale === 'fa' ? 'jD jMMMM' : 'D MMMM'),
                      locale
                    )}
                  </p>
                  <pre className={styles.review}>{item.review}</pre>
                </div>
              );
            })}
            {/* {review.length < 9 ? null : (
              <LoadMoreButton
                text={language.COMMON.loadMore}
                click={() => {}}
                loading={loading}
              />
            )} */}
          </>
        ) : (
          <p className={styles.noReview}>{noReview}</p>
        )
      ) : (
        <ReviewLoading />
      )}
    </section>
  );
};

export default Review;
