import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const ADD_NEW_CAR = "/core/rental-car/new";

export const REQUEST_ADD_NEW_CAR = (info: IAddCar) => {
  return new Promise((resolve, reject) => {
    const { token, data } = info;
    // return console.log(info);

    axios
      .post(
        DOMAIN + ADD_NEW_CAR,
        { data },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(response => {
        if (response.data.success) {
          console.log(response.data);

          //   if (this.props.edit_mode) {
          //     localStorage.removeItem("CarEditId");
          //     Router.push({
          //       pathname: `/user/${jsCookie.get("user_id")}`
          //     });
          //   } else {
          //     localStorage["CarEditId"] = response.data.data.id;
          //     Router.push({
          //       pathname: "/set-car-timing",
          //       query: {
          //         id: response.data.data.id
          //       }
          //     });
          //   }
        }
      })
      .catch(e => reject(e));
  });
};

interface IAddCar {
  token: string;
  data: any;
}
