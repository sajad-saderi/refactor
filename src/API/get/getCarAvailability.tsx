import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_RENTAL_CAR_AVAILABILITIES = "/core/rental-car/availability/list";

export const REQUEST_GET_RENTAL_CAR_AVAILABILITIES = (
  data: IgetCarAvailabilities
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + GET_RENTAL_CAR_AVAILABILITIES,
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
        if (response.data.success) {
          resolve(response.data.items);
        } else {
          reject(new Error("Error in loading rental car data!"));
        }
      });
  });
};

interface IgetCarAvailabilities {
  token: string;
  id: any;
}
