import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
let GET_CAR_FACILITIES = "/core/facility/list?limit=10000";

export const REQUEST_GET_CAR_FACILITIES = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_CAR_FACILITIES)
      .then((response) => {
        if (response.data.success) {
          const data = response.data.items.map((value, index) => ({
            key: value.id,
            name: value.name,
            value: +value.id,
          }));
          resolve({ data });
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(
          e.response
            ? e.response.data.message
            : e.message === "Network Error"
              ? 111
              : e.message
        );
      });
  });
};
