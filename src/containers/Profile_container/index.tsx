import React, { useEffect, useState } from "react";
import "./Profile_container.scss";
import Profile_info from "./Profile_info";
import Profile_Cars from "./Profile_Cars";
import jsCookie from "js-cookie";
import Router from "next/router";
import { REQUEST_GET_USER_INFO } from "../../API";

const user_id = jsCookie("user_id");

const Profile_container = () => {
  const [is_mine, setIs_mine] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const user_cars_info: any = await REQUEST_GET_USER_INFO({
      id: `${Router.router.query.id}`,
    });
    setData(user_cars_info);
    setIs_mine(user_id == user_cars_info.id ? true : false);
  };

  return (
    <article className="responsive minHeight profile_container">
      <Profile_info data={data} is_mine={is_mine} />
      <Profile_Cars is_mine={is_mine} />
    </article>
  );
};

export default Profile_container;
