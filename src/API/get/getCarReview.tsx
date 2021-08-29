import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
let GET_REVIEW = "/core/rental-car/review/list?id=";
let GET_REVIEW_RENTER = "/core/user/review/list/renter?id=";
let GET_REVIEW_OWNER = "/core/user/review/list/owner?id=";

export const REQUEST_GET_CAR_REVIEW = (Id, renter?, owner?) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${DOMAIN}${
          renter ? GET_REVIEW_RENTER : owner ? GET_REVIEW_OWNER : GET_REVIEW
        }${Id}`
      )
      .then((response) => {
        if (response.data.success) {
          resolve(response.data);
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
