import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const ADD_NEW_CAR = "/core/rental-car/new";

export const REQUEST_ADD_NEW_CAR = (info: IAddCar) => {
  return new Promise((resolve, reject) => {
    const { token, data } = info;
    axios
      .post(
        DOMAIN + ADD_NEW_CAR,
        { ...data },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          resolve(response.data);
        }
      })
      .catch((e) => reject(e.response?.message));
  });
};

interface IAddCar {
  token: string;
  data: any;
}
