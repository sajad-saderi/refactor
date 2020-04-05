import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_URLS_FOR_SITE_MAP = "/core/landing/list";

export const REQUEST_GET_URLS_FOR_SITE_MAP = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_URLS_FOR_SITE_MAP + "?limit=900")
      .then((response) => {
        if (response.data.success) {
          resolve(response.data);
        } else {
          reject(false);
        }
      })
      .catch((err) => {
        console.warn("profile request filed: ", err.message);
      });
  });
};
