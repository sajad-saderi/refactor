import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_SEARCH_FOR_RENT = "/core/rental-car/search-for-rent/list";

export const REQUEST_GET_SEARCH_FOR_RENT = (data: IgetSearchForRent) => {
  return new Promise((resolve, reject) => {
    let queryString;
    if (data.result_key) {
      queryString = "result_key=" + data.result_key + "&o=" + data.o;
    } else {
      queryString = data.queryString;
    }

    axios
      .get(
        DOMAIN +
          GET_SEARCH_FOR_RENT +
          ("?limit=" + data.limit + "&page=" + data.page) +
          ("&" + queryString)
      )
      .then(response => {
        if (response.data.success) {
          let statsObj = {};
          const extra_info = response.data.extra_info.stats;
          const body_style_id = extra_info.body_style_set.map(
            (value, index) => ({
              value: value.id,
              text: value.name.fa,
              count: value.count
            })
          );
          statsObj = {
            extra_info: {
              body_style_id: body_style_id,
              deliver_at_renters_place: extra_info.deliver_at_renters_place,
              with_driver: extra_info.with_driver
            }
          };
          const results = response.data.items;
          if (results === undefined || results.length == 0) {
            resolve({
              results: [],
              ...statsObj
            });
          } else {
            resolve({
              results,
              ...statsObj
              // remained_count:response.data.remained_count,
              // latest_result_key: response.data.result_key,
              // total_count: response.data.total_count,
            });
          }
        }
      });
  });
};

interface IgetSearchForRent {
  limit: number;
  page: number;
  queryString?: string;
  result_key?: string;
  o?: string;
}
