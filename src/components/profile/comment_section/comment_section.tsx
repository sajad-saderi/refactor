import { useContext, useEffect, useState } from "react";
import { REQUEST_GET_CAR_REVIEW } from "../../../API";
import Review from "../../Review";
import Icon from "../../../../utils/Icon";
import net_CTX from "../../../context/internetConnectionCTX";
import languageCTX from "../../../context/languageCTX";
import { supportedLanguages } from '../../../../types';

const Comment_section = ({ user_id, user_data, language }: IComment_section) => {
  const [active_tab, set_active_tab] = useState(true);
  const [review_renter, setReViewRenter] = useState([]);
  const [review_owner, setReViewOwner] = useState([]);
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);

  useEffect(() => {
    get_reviews();
  }, []);

  const get_reviews = async () => {
    try {
      const reviews_renter: any = await REQUEST_GET_CAR_REVIEW(user_id, true);
      setReViewRenter(reviews_renter.items);
      console.log(reviews_renter.items);

      const reviews_owner: any = await REQUEST_GET_CAR_REVIEW(
        user_id,
        false,
        true
      );
      setReViewOwner(reviews_owner.items);
      console.log(reviews_owner.items);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
    }
  };
  return (
    <section className="comment_section" dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}>
      <div className="tab_section">
        <div
          className={active_tab ? "active" : ""}
          onClick={() => set_active_tab(true)}
        >
          {language.USER.hostReviews}
        </div>
        <div
          className={!active_tab ? "active" : ""}
          onClick={() => set_active_tab(false)}
        >
          {language.USER.guestReviews}
        </div>
      </div>
      <div className="review_section">
        {active_tab ? (
          user_data.rate?.no_of_received_rates_as_owner ? (
            <div className="rate_container">
              <Icon name="star" />
              <span>
                {user_data.rate.avg_rate_as_owner}{" "}
                <span className="sum_rent">
                  ({user_data.rate.no_of_received_rates_as_owner})
                </span>
              </span>
            </div>
          ) : null
        ) : user_data.rate?.no_of_received_rates_as_renter ? (
          <div className="rate_container">
            <Icon name="star" />
            <span>
              {user_data.rate.avg_rate_as_renter}{" "}
              <span className="sum_rent">
                ({user_data.rate.no_of_received_rates_as_renter})
              </span>
            </span>
          </div>
        ) : null}
        <Review
          review={!active_tab ? review_renter : review_owner}
          without_title={true}
          profile={true}
          language={language}
          locale={activeLanguage}
        />
      </div>
    </section>
  );
};

interface IComment_section {
  user_id: number;
  user_data: any;
  language: any
}

export default Comment_section;
