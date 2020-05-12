import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_OUT_OF_SERVICE = "/core/rental-car/set-is-out-of-service";

export const REQUEST_SET_OUT_OF_SERVICE = (data: IServiceSet) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_OUT_OF_SERVICE,
        {
          id: data.id,
          value: data.value,
        },
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          resolve(response.data.data.is_out_of_service);
        }
      })
      .catch((error) => {
        reject(error.response?.message);
      });
  });
};

interface IServiceSet {
  token: string;
  id: string;
  // status we want to set true = out fo service , false = active
  value: boolean;
}
