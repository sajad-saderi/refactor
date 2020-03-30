import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_RENTAL_CAR = "/core/rental-car/search-for-rent/get";

export const REQUEST_GET_RENTAL_CAR = (data: IgetCar) => {
  console.log(data);

  return new Promise((resolve, reject) => {
    let queryString = "";
    if (data.coupon) {
      queryString =
        queryString + `search_id=${data.search_id}&coupon_code=${data.coupon}`;
    } else if (data.search_id) {
      queryString = queryString + `search_id=${data.search_id}`;
    } else if (data.id) {
      queryString = queryString + `rental_car_id=${data.id}`;
    }
    axios
      .get(DOMAIN + GET_RENTAL_CAR + "?" + queryString)
      .then(response => {
        if (response.data.id) {
          resolve(response.data);
        } else {
          reject(false);
        }
      })
      .catch(e => {
        console.log(e.response.data.message);
        if (e.response) reject(e.response.data.message);
        else {
          e.message;
        }
      });
  });
};

interface IgetCar {
  search_id?: string;
  id?: any;
  coupon?: string;
}
