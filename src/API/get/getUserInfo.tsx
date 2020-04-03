import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_USER_INFO = "/core/user/info";

export const REQUEST_GET_USER_INFO = (data: IGetUser) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_USER_INFO + "?id=" + data.id)
      .then(response => {
        resolve(response.data.data);
      })
      .catch(err => {
        console.log("profile request filed: ", err);
      });
  });
};

interface IGetUser {
  id?: string;
}
