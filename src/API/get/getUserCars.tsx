import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_USER_CARS = "/core/rental-car/list";

export const REQUEST_GET_USER_CARS = (data: IGetUserCars) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + GET_USER_CARS + "?limit=24&owner_user_profile_id=" + data.id
      )
      .then(response => {
        resolve(response.data.items);
      })
      .catch(err => {
        console.warn("profile cars request filed: ", err.message);
      });
  });
};

interface IGetUserCars {
  id: string;
}
