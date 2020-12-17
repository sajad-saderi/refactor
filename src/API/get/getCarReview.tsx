import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
let GET_REVIEW = "/core/rental-car/review/list?id=";

export const REQUEST_GET_CAR_REVIEW = (carId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_REVIEW + carId)
      .then((response) => {
        if (response.data.success) {
          resolve(response.data);
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response ? e.response.data.message : e.message);
      });
  });
};
