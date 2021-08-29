import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_ORDER_REQUEST_URL = "/core/rental-car/order/get";

export const GET_ORDER_REQUEST = (data: IgetOrderRequest) => {
  return new Promise((resolve, reject) => {
    const { token, id, unique_id } = data;
    let query = id ? { id: id } : unique_id ? { unique_id: unique_id } : null;
    axios
      .post(DOMAIN + GET_ORDER_REQUEST_URL, query, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
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

interface IgetOrderRequest {
  token: string;
  id?: string | string[];
  unique_id?: string;
}
