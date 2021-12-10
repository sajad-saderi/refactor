import moment from "moment-jalaali";
import { twoWayDateConvertor } from '../src/helpers/dateControler';
import { initialDate, payBackInString } from "./date-range-creator";
moment.loadPersian({ dialect: "persian-modern" });

let startDate = null;
let endDate = null;
const UrlChecker = (props, locale) => {
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
  if (localStorage["date"]) {
    const date = JSON.parse(localStorage["date"]);
    startDate = date.from[locale].name;
    endDate = date.to[locale].name;
  }
  data = {
    location_id: location_id ? +location_id : null,
    location_n: location_name
      ? location_name
      : location_id == 1
        ? "tehran"
        : "",
    start_date: start_date
      ? twoWayDateConvertor((start_date as string).replace(/-/g, "/"))[locale].name
      : startDate
        ? startDate
        : generate_dates(locale).generate_start,
    end_date: end_date
      ? twoWayDateConvertor((end_date as string).replace(/-/g, "/"))[locale].name
      : endDate
        ? endDate
        : generate_dates(locale).generate_end,
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

const generate_dates = (locale) => {
  const { from, to } = initialDate(6, 3);
  return { generate_start: from[locale].name, generate_end: to[locale].name };
};

export default UrlChecker;
