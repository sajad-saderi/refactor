import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
let GET_CAR_PRICE_ESTIMATION = "/core/rent-price-estimation-request/new";

export const REQUEST_GET_CAR_PRICE_ESTIMATION = (data: IEstimation) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_CAR_PRICE_ESTIMATION, {
        price: data.price,
        car_id: data.car_id,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => reject(e));
  });
};

interface IEstimation {
  price: string;
  car_id: number;
}
