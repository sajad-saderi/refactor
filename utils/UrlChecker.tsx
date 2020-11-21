import moment from "moment-jalaali";
import { payBackInString } from "./date-range-creator";
moment.loadPersian({ dialect: "persian-modern" });

const UrlChecker = (props) => {
  let data = null;
  const {
    location_id,
    location_name,
    start_date,
    end_date,
    price_order,
    page,
    min_price,
    max_price,
    deliver_at_renters_place,
    with_driver,
    body_style_id,
    brand_id,
    car_id,
  } = props;

  data = {
    location_id: location_id ? +location_id : null,
    location_n: location_name ? location_name : "tehran",
    start_date: start_date
      ? (start_date as string).replace(/-/g, "/")
      : generate_dates().generate_start,
    end_date: end_date
      ? (end_date as string).replace(/-/g, "/")
      : generate_dates().generate_end,
    price_order: price_order ? (price_order as string) : "-price",
    page: page ? +page : 1,
    min_price: min_price ? +min_price : 0,
    max_price: max_price ? +max_price : 10000000,
    deliver_at_renters_place: deliver_at_renters_place
      ? deliver_at_renters_place
      : "0",
    with_driver: with_driver ? with_driver : "0",
    body_style_id: body_style_id ? body_style_id : "",
    brand_id: brand_id ? brand_id : "",
    car_id: car_id ? car_id : "",
  };

  return data;
};

const generate_dates = () => {
  const { start_date, end_date } = payBackInString(6, 3);
  return { generate_start: start_date, generate_end: end_date };
};

export default UrlChecker;
