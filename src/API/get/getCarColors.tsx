import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
let GET_CAR_COLORS = "/core/color/list?limit=16";

export const REQUEST_GET_CAR_COLORS = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_CAR_COLORS)
      .then((response) => {
        if (response.data.success) {
          const data = response.data.items.map((value, index) => ({
            key: value.id,
            text: value.name.fa,
            value: +value.id,
            code: value.code,
          }));
          resolve({ data });
        }
      })
      .catch((e) => {
        reject(e.response?.message);
      });
  });
};
