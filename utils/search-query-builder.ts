import { payBackInString } from "./date-range-creator";

const search_query_builder = ({
  location_id,
  start_date,
  end_date,
  price_order,
  min_price,
  max_price,
  deliver_at_renters_place,
  with_driver,
  body_style_id,
  brand_id,
  category_id,
  car_id,
  page,
  limit,
}: ISearch_query_builder) => {
  let query = "";

  query = `location_id=${location_id ? location_id : 1}`;

  if (start_date) {
    query += `&start_date=${start_date}&end_date=${end_date}`;
  } else {
    const { start_date, end_date } = payBackInString(6, 3);
    query += `&start_date=${start_date}&end_date=${end_date}`;
  }

  query += `&o=${price_order ? price_order : "-price"}`;

  if (min_price) query += `&min_price=${min_price ? min_price : 0}`;

  if (max_price) query += `&max_price=${max_price ? max_price : 10000000}`;

  if (deliver_at_renters_place)
    query += `&deliver_at_renters_place=${
      deliver_at_renters_place ? deliver_at_renters_place : 0
    }`;

  if (with_driver) query += `&with_driver=${with_driver ? with_driver : 0}`;

  if (body_style_id)
    query += `&body_style_id=${body_style_id ? body_style_id : ""}`;

  if (brand_id) query += `&brand_id=${brand_id ? brand_id : ""}`;
  if (car_id) query += `&car_id=${car_id ? car_id : ""}`;
  if (category_id) query += `&category_id=${category_id ? category_id : ""}`;

  query += `&page=${page ? page : 1}`;
  query += `&limit=${limit ? limit : 15}`;

  return query;
};

export default search_query_builder;

interface ISearch_query_builder {
  location_id?: number | string;
  location_name?: number | string;
  start_date?: number | string;
  end_date?: number | string;
  price_order?: number | string;
  min_price?: number | string;
  max_price?: number | string;
  deliver_at_renters_place?: number | string;
  with_driver?: number | string;
  body_style_id?: number | string;
  brand_id?: number | string;
  category_id?: number | string;
  car_id?: number | string;
  page?: number | string;
  limit?: number | string;
}
