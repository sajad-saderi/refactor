import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_USER_CARS = "/core/rental-car/list";

export const REQUEST_GET_USER_CARS = (data: IGetUserCars) => {
  let query = "";
  if (data.is_out_of_service) {
    query = `&owner_user_profile_id=${data.id}&is_out_of_service=${
      data.is_out_of_service === 1 ? true : false
    }`;
  } else {
    query = `&owner_user_profile_id=${data.id}`;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_USER_CARS + "?limit=14" + query)
      .then((response) => {
        console.log(response.data);
        resolve(response.data.items);
      })
      .catch((err) => {
        console.warn("profile cars request filed: ", err.message);
      });
  });
};

interface IGetUserCars {
  id: string;
  is_out_of_service?: number;
}
