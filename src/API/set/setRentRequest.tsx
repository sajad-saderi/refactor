import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_RENT_REQUEST = "/core/rental-car/rent-request/new";

export const REQUEST_SET_RENT_REQUEST = (data: IRentRequest) => {
  let query = "";
  if (data.coupon_code) {
    query = `?coupon_code=${data.coupon_code}`;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_RENT_REQUEST + query,
        {
          search_id: data.search_id,
          has_insurance: data.has_insurance
        },
        {
          headers: {
            Authorization: "Bearer " + data.token
          }
        }
      )
      .then(response => {
        if (response.data.success) {
          resolve(response.data.success);
        }
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

interface IRentRequest {
  token: string;
  has_insurance: boolean;
  search_id: string;
  coupon_code?: string;
}
