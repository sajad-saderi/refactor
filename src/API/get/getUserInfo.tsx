import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_USER_INFO = "/core/user/info";

export const REQUEST_GET_USER_INFO = (data: IGetUser) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_USER_INFO + "?id=" + data.id)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((e) => {
        Error_middleware(e);
        reject(e.response?.message);
      });
  });
};

interface IGetUser {
  id?: string;
}
