import { useState } from "react";
import { useEffect } from "react";
import suv from "../../../public/image/suv.jpeg";
import van from "../../../public/image/van.jpeg";
import with_driver from "../../../public/image/with_driver.jpeg";
import affordable from "../../../public/image/affordable.jpeg";
import for_journey from "../../../public/image/for_journey.jpeg";
import moment from "moment-jalaali";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";
import Icon from "../../../utils/Icon";

const Recommendation_section = (props) => {
  const [start_date, set_start_date] = useState(null);
  const [end_date, set_end_date] = useState(null);
  useEffect(() => {
    set_default_date_for_search();
  }, []);

  const set_default_date_for_search = () => {
    // if start date and end date is not set, automatically show the result for 3 to 6 days ahead
    set_start_date(
      moment()
        .add(3, "day")
        .format("jYYYY/jMM/jDD")
    );
    set_end_date(
      moment()
        .add(6, "day")
        .format("jYYYY/jMM/jDD")
    );
  };

  return (
    <div className="slider-wrapper">
      {/* <div className="recomendation-arrow_left">
        <Icon name="arrow_right" />
      </div> */}
      <ScrollContainer className="recommendation_section">
        <div className="inner-container">
          <div className="suggestion_card">
            <Link
              href={`/search-result?location_id=1&location_name=تهران&start_date=${start_date}&end_date=${end_date}&price_order=-price&page=1&limit=15&max_price=500000`}
              prefetch={false}
            >
              <a>
                <figure>
                  <img src={affordable} />
                  <p>اقتصادی </p>
                </figure>
              </a>
            </Link>
          </div>
          <div className="suggestion_card">
            <Link href={`/rent/car-rental-for-travel`} prefetch={false}>
              <a>
                <figure>
                  <img src={for_journey} />
                  <p>مناسب سفر </p>
                </figure>
              </a>
            </Link>
          </div>
          <div className="suggestion_card">
            <Link
              href={`/search-result?location_id=1&location_name=تهران&start_date=${start_date}&end_date=${end_date}&price_order=-price&page=1&limit=15&with_driver=1`}
              prefetch={false}
            >
              <a>
                <figure>
                  <img src={with_driver} />
                  <p>با راننده</p>
                </figure>
              </a>
            </Link>
          </div>
          <div className="suggestion_card">
            <Link
              href={`/search-result?location_id=1&location_name=تهران&start_date=${start_date}&end_date=${end_date}&price_order=-price&page=1&limit=15&body_style_id=2`}
              prefetch={false}
            >
              <a>
                <figure>
                  <img src={suv} />
                  <p>شاسی بلند </p>
                </figure>
              </a>
            </Link>
          </div>
          <div className="suggestion_card">
            <Link
              href={`/search-result?location_id=1&location_name=تهران&start_date=${start_date}&end_date=${end_date}&price_order=-price&page=1&limit=15&body_style_id=5`}
              prefetch={false}
            >
              <a>
                <figure>
                  <img src={van} />
                  <p>ون</p>
                </figure>
              </a>
            </Link>
          </div>
        </div>
      </ScrollContainer>
      {/* <div className="conseal-section"></div> */}
    </div>
  );
};

export default Recommendation_section;
