import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_ORDER_REQUESTS = "/core/rental-car/order/list";

export const REQUEST_GET_ORDER_REQUESTS = (data: IgetOrderRequests) => {
  let query = "";
  let limit = data.limit | 14;
  if (data.status_id) {
    query = `&status_id=${data.status_id}`;
  }
  if (data.creation_time_from) {
    query += `&creation_time_from=${data.creation_time_from}`;
  }
  if (data.creation_time_to) {
    query += `&creation_time_to=${data.creation_time_to}`;
  }
  return new Promise((resolve, reject) => {
    axios
      .get(
        DOMAIN +
          GET_ORDER_REQUESTS +
          `?page=${data.page}&limit=${limit}` +
          query,
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          resolve(response.data);
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(
          e.response ? e : e.message === "Network Error" ? 111 : e.message
        );
      });
  });
};

interface IgetOrderRequests {
  token: string;
  status_id?: string;
  creation_time_from?: string;
  creation_time_to?: string;
  page: number;
  limit: number;
}
