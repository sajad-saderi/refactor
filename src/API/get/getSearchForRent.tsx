import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_SEARCH_FOR_RENT = "/core/rental-car/search-for-rent/list";

export const REQUEST_GET_SEARCH_FOR_RENT = (data: IgetSearchForRent) => {
  return new Promise((resolve, reject) => {
    let searchQuery;
    if (data.result_key) {
      searchQuery = "result_key=" + data.result_key + "&o=" + data.o;
    } else {
      searchQuery = data.searchQuery;
    }
    if (sessionStorage["guid"]) {
      searchQuery += "&session_id=" + sessionStorage["guid"];
    }

    axios
      .get(DOMAIN + GET_SEARCH_FOR_RENT + "?" + searchQuery)
      .then((response) => {
        if (response.data.success) {
          let statsObj = {};
          // @extra_info like total count remain count and etc..
          const extra_info = response.data.extra_info.stats;

          // set the body style check box list and update the count
          const body_style_id = extra_info.body_style_set.map(
            (value, index) => ({
              value: value.id,
              text: value.name.fa,
              count: value.count,
            })
          );

          // set the filter data
          statsObj = {
            extra_info: {
              params: response.data.extra_info.params,
              pre_loads: response.data.extra_info.pre_loads,
              avg_price_per_day_min: extra_info.avg_price_per_day_min,
              avg_price_per_day_max: extra_info.avg_price_per_day_max,
              body_style_id: body_style_id,
              deliver_at_renters_place: extra_info.deliver_at_renters_place,
              with_driver: extra_info.with_driver,
              without_driver: extra_info.without_driver,
            },
          };
          const results = response.data.items;
          if (results === undefined || results.length == 0) {
            resolve({
              results: [],
              total_count: response.data.total_count,
              count: response.data.count,
              result_key: response.data.result_key,
              remained_count: response.data.remained_count,
              ...statsObj,
            });
          } else {
            resolve({
              results,
              total_count: response.data.total_count,
              count: response.data.count,
              result_key: response.data.result_key,
              remained_count: response.data.remained_count,
              ...statsObj,
            });
          }
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(
          e.response
            ? e
            : e.message === "Network Error"
            ? "خطا در اتصال به شبکه، لطفا از اتصال دستگاه به اینترنت مطمئن شوید."
            : e.message
        );
      });
  });
};

interface IgetSearchForRent {
  // number of the result length in each search
  limit?: number;
  // page number
  page?: number;
  // search by filters
  searchQuery?: string;
  result_key?: string;
  // price sort
  o?: string;
}
