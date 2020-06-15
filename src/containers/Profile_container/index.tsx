import React, { useEffect, useState } from "react";
// import "./Profile_container.scss";
import Profile_info from "./Profile_info";
import Profile_Cars from "./Profile_Cars";
import jsCookie from "js-cookie";
import Router from "next/router";
import { REQUEST_GET_USER_INFO } from "../../API";
import { NextSeo } from "next-seo";

const Profile_container = () => {
  const [is_mine, setIs_mine] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!checkRegister()) {
      return
    }
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const user_id = jsCookie.get("user_id");
    const user_cars_info: any = await REQUEST_GET_USER_INFO({
      id: `${Router.router.query.id}`,
    });
    setIs_mine(user_id == user_cars_info.id ? true : false);
    setData(user_cars_info);
  };

  const checkRegister = () => {
    const complete_register = jsCookie.get("complete_register")
    console.log("complete_register", complete_register);

    if (complete_register !== "true") {
      Router.push("/complete-register")
      return false
    } else {
      return true
    }
  }

  return (
    <article className="responsive minHeight profile_container">
      {data ? (
        <>
          <NextSeo
            title={`اجاره خودرو از ${
              data.company_name ? data.company_name : data.name
              } | اتولی`}
            description=" حساب کاربری"
            openGraph={{
              title: `اجاره خودرو از ${data.name} | اتولی`,
              description: " حساب کاربری",
            }}
            twitter={{
              handle: "@otoli_net",
              site: "@otoli_net",
              cardType: "summary_large_image",
            }}
          />
          <Profile_info data={data} is_mine={is_mine} />
          <Profile_Cars is_mine={is_mine} />
        </>
      ) : (
          <NextSeo title="اجاره خودرو | اتولی" description=" حساب کاربری" />
        )}
    </article>
  );
};

export default Profile_container;
