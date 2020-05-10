import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
let GET_CAR_BODY_STYLE = "/core/body-style/list?limit=800";

export const REQUEST_GET_CAR_BODY_STYLE= () => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_CAR_BODY_STYLE)
      .then(response => {
        if (response.data.success) {
          const data = response.data.items.map((value, index) => ({
            key: value.id,
            text: value.name.fa,
            value: +value.id
          }));
          resolve({ data });
        } else {
          reject(response);
        }
      })
      .catch(e => {
        reject(e.response);
      });
  });
};
