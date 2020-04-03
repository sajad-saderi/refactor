import React, { useEffect, useState } from "react";
import { REQUEST_GET_USER_CARS } from "../../../API";
import Router from "next/router";
import Car from "./car";
import "./profile_car.module.scss";

const Profile_Cars = (props: IProfile_Cars) => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    const user_cars_res: any = await REQUEST_GET_USER_CARS({
      id: `${Router.router.query.id}`
    });
    setResult(user_cars_res);
    props;
    console.log(user_cars_res);
  };

  return (
    <article className="Profile_car_container">
      {result.length > 0 &&
        result.map((item, i) => {
          return (
            <Car
              key={i}
              data={item}
              is_mine={props.is_mine}
              getListAgain={fetchApi}
            />
          );
        })}
    </article>
  );
};

interface IProfile_Cars {
  is_mine: boolean;
}

export default Profile_Cars;
