const baseDomain = "https://geolocation-db.com/json/";
import Axios from "axios";
import Error_middleware from "../ApiUtils";

export const GET_USER_IP = () =>
  new Promise((resolved, rejected) => {
    Axios.get(baseDomain)
      .then((response) => {
        resolved(response.data);
      })
      .catch((error) => {
        Error_middleware(error);
        rejected(
          error.response
            ? error
            : error.message === "Network Error"
            ? 111
            : error.message
        );
      });
  });
