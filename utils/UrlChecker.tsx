import moment from "moment-jalaali";
import { payBackInString } from "./date-range-creator";
moment.loadPersian({ dialect: "persian-modern" });

let startDate = null;
let endDate = null;
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
    without_driver,
    body_style_id,
    brand_id,
    car_id,
    category_id,
  } = props;
  if (localStorage["start"]) {
    const storageStartDate = JSON.parse(localStorage["start"]);
    const storageEndDate = JSON.parse(localStorage["end"]);
    startDate = `${storageStartDate.year}/${storageStartDate.month}/${storageStartDate.day}`;
    endDate = `${storageEndDate.year}/${storageEndDate.month}/${storageEndDate.day}`;
  }
  data = {
    location_id: location_id ? +location_id : null,
    location_n: location_name
      ? location_name
      : location_id == 1
      ? "tehran"
      : "",
    start_date: start_date
      ? (start_date as string).replace(/-/g, "/")
      : startDate
      ? startDate
      : generate_dates().generate_start,
    end_date: end_date
      ? (end_date as string).replace(/-/g, "/")
      : endDate
      ? endDate
      : generate_dates().generate_end,
    price_order: price_order ? (price_order as string) : "-price",
    page: page ? +page : 1,
    min_price: min_price ? +min_price : 0,
    max_price: max_price ? +max_price : 10000000,
    deliver_at_renters_place: deliver_at_renters_place
      ? deliver_at_renters_place
      : "0",
    with_driver: with_driver ? with_driver : "0",
    without_driver: without_driver ? without_driver : "0",
    category_id: category_id ? category_id : "",
    body_style_id:
      body_style_id && body_style_id !== "all" ? body_style_id : "",
    brand_id: brand_id && brand_id !== "all" ? brand_id : "",
    car_id: car_id && car_id !== "all" ? car_id : "",
  };

  return data;
};

const generate_dates = () => {
  const { start_date, end_date } = payBackInString(6, 3);
  return { generate_start: start_date, generate_end: end_date };
};

export default UrlChecker;
