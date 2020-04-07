import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_CAR_AVAILABILITY = "/core/rental-car/availability/replace-set";

export const REQUEST_SET_CAR_AVAILABILITY = (
  inputData: ISetCarAvailability
) => {
  return console.log("inputData", inputData);

  const { token, rental_car_id, data } = inputData;
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_CAR_AVAILABILITY,
        {
          data,
          rental_car_id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          resolve(response.data.success);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

interface ISetCarAvailability {
  token: string;
  rental_car_id: string | number;
  data: string;
}
