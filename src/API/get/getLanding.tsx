import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_LANDING_PAGE = "/core/landing/get";

export const REQUEST_GET_LANDING_PAGE = (data: ILanding) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_LANDING_PAGE + "?unique_id=" + encodeURI(data.name))
      .then((response) => {
        if (response.data.success) {
          resolve(response.data);
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  });
};

interface ILanding {
  name?: string;
}
