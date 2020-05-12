import axios from "axios";
import jsCookie from "js-cookie";

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
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(response => {
        if (response.data.success) {
          jsCookie.set("thumbnail_url", response.data.data.image_url, {
            expires: 100
          });
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error.response?.message);
      });
  });
};

interface ISetUSerImage {
  token: string;
  file: any;
}
