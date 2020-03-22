import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_MODEL_INFO = "/core/car/get?id=";

export const REQUEST_GET_MODEL_INFO = modelId => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_MODEL_INFO + modelId)
      .then(response => {
        if (response.data.success) {
          const data = {
            capacity: response.data.data.capacity,
            cylinder: response.data.data.cylinder,
            facility_set: response.data.data.facility_set,
            transmission_type: response.data.data.transmission_type,
            body_style: response.data.data.body_style
          };
          resolve(data);
        } else {
          reject(false);
        }
      })
      .catch(e => {
        console.log(e);
        reject(e);
      });
  });
};
