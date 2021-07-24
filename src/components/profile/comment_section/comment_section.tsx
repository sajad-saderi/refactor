import { useEffect, useState } from "react";
import { REQUEST_GET_CAR_REVIEW } from "../../../API";
import Review from "../../Review";
import "./comment_section.scss";
const Comment_section = ({ user_id }) => {
  const [active_tab, set_active_tab] = useState(true);
  const [review_renter, setReViewRenter] = useState([]);
  const [review_owner, setReViewOwner] = useState([]);

  useEffect(() => {
    console.log(user_id);
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
      console.log("!Error", error);
    }
  };
  return (
    <section className='comment_section'>
      <div className='tab_section'>
        <div
          className={active_tab ? "active" : ""}
          onClick={() => set_active_tab(true)}
        >
          نظرات مهمان‌ها
        </div>
        <div
          className={!active_tab ? "active" : ""}
          onClick={() => set_active_tab(false)}
        >
          نظرات میزبان‌ها
        </div>
      </div>
      <div className='review_section'>
        <Review
          review={active_tab ? review_renter : review_owner}
          without_title={true}
        />
      </div>
    </section>
  );
};

interface IComment_section {
  user_id: number;
}

export default Comment_section;
