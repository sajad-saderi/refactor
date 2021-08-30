import axios from "axios";
import Error_middleware from "../ApiUtils";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_USER_IMAGE = "/core/user/set-image";

export const REQUEST_SET_USER_IMAGE = (data: ISetUSerImage) => {
  return new Promise((resolve, reject) => {
    const { token, file } = data;
    let form = new FormData();
    form.append("image", file);
    axios
      .post(DOMAIN + SET_USER_IMAGE, form, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data.success) {
          resolve(response.data.data);
        }
      })
      .catch((e) => {
        Error_middleware(e);
        reject(
          e.response
            ? e.response.data.message
            : e.message === "Network Error"
            ? 111
            : e.message
        );
      });
  });
};

interface ISetUSerImage {
  token: string;
  file: any;
}
