import React, { useEffect, useState } from "react";
import "./profile_info.scss";
import Edit_profile from "./Edit_profile";
import { FiLogOut } from "react-icons/fi";
import Button from "../../../components/form/Button";
import Router from "next/router";
import jsCookie from "js-cookie";

const Profile_info = (props: IProfile_info) => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [company_name, setCompany_name] = useState(null);
  const [edit, setEdit] = useState(false);
  const [user_info, setUser_info] = useState(null);

  useEffect(() => {
    if (props.data) {
      setName(props.data.name);
      setCompany_name(props.data.company_name);
      setImage(props.data.thumbnail_url);
      setUser_info(props.data);
    }
  }, [props.data]);

  const Exit = () => {
    jsCookie.remove("first_name");
    jsCookie.remove("last_name");
    jsCookie.remove("company_name");
    jsCookie.remove("complete_register");
    jsCookie.remove("phone");
    jsCookie.remove("thumbnail_url");
    jsCookie.remove("token");
    jsCookie.remove("user_id");
    jsCookie.remove("user_name");
    Router.push("/");
  };

  return (
    <article className="Profile_info_container">
      {name ? (
        !edit ? (
          <>
            <div className="user_information">
              <img src={image} alt={name} />
              <div>
                <h3>{company_name ? company_name : name}</h3>
                {props.is_mine && (
                  <p onClick={() => setEdit(true)}>ویرایش مشخصات کاربری</p>
                )}
              </div>
            </div>
            {props.is_mine && (
              <div className="profile_controls">
                <div className="Exit" onClick={Exit}>
                  <FiLogOut size="2rem" color="#4ba3ce"/>
                  <p>خروج</p>
                </div>
                <Button
                  value="+ افزودن خودرو"
                  class="Blue_BTN"
                  click={() => {
                    Router.push("/add-car");
                  }}
                  loading={false}
                />
              </div>
            )}
          </>
        ) : (
          <Edit_profile data={user_info} setEdit={() => setEdit(false)} />
        )
      ) : null}
    </article>
  );
};

interface IProfile_info {
  is_mine: boolean;
  data: any;
}

export default Profile_info;
