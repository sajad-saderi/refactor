import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const DELETE_CAR = "/core/rental-car/delete";

export const REQUEST_DELETE_CAR = (data: IDeleteCar) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + DELETE_CAR,
        {
          id: data.id
        },
        {
          headers: {
            Authorization: "Bearer " + data.token
          }
        }
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

interface IDeleteCar {
  id: string;
  token: string;
}
