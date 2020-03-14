import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_LOCATIONS = "/core/location/list";

export const REQUEST_GET_LOCATION = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_LOCATIONS + "?limit=100")
      .then(response => {
        if (response.data.success) {
          const citiesFarsi = response.data.items.map((value, index) => ({
            key: value.id,
            text: value.name.fa,
            value: value.id
          }));
          resolve({ citiesFarsi });
        } else {
          reject(response);
        }
      })
      .catch(e => {
        reject(e);
      });
  });
};
