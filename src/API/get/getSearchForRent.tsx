import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_SEARCH_FOR_RENT = '/core/rental-car/search-for-rent/list';

export const REQUEST_GET_SEARCH_FOR_RENT = (data: IgetSearchForRent) => {
  console.log(data);
  
  return new Promise((resolve, reject) => {
    let queryString;
    if (data.result_key) {
      queryString = 'result_key=' + data.result_key + '&o=' + data.o;
    } else {
      queryString = data.queryString;
    }
    
    axios
      .get(
        DOMAIN +
          GET_SEARCH_FOR_RENT +
          ('?limit=' + data.limit + '&page=' + data.page ) +
          ('&' + queryString)
      )
      .then(response => {
        if (response.data.success) {
          const results = response.data.items
          if (results === undefined || results.length == 0) {
            resolve({
              results: [],
              loadingResults: false,
              noResult: true,
              lodingMore: false
            });
          } else {
            let statsObj = {};
            if (data.page <= 1 && !data.result_key) {
              const stats = response.data.extra_info.stats;
              const body_style_stats = stats.body_style_set.map(
                (value, index) => ({
                  id: value.id,
                  count: value.count
                })
              );
              statsObj = {
                stats: {
                  body_style_set: body_style_stats,
                  deliver_at_renters_place: stats.deliver_at_renters_place,
                  with_driver: stats.with_driver,
                }
              };
            }
            resolve({
              results,
              loadingResults: false,
              noResult: false,
              lodingMore: false,
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
