import React, { useEffect, useState, useReducer } from "react";
import {
  REQUEST_SET_USER_IMAGE,
  REQUEST_SET_FIRST_LAST_NAME,
  REQUEST_SET_USERNAME,
  REQUEST_SET_COMPANY_NAME
} from "../../../../API";
import Router from "next/router";
import TextInput from "../../../../components/form/TextInput";
// import "./edit_profile.scss";
import Button from "../../../../components/form/Button";
import jsCookie from "js-cookie";

const token = jsCookie.get("token");

const stateReducer = (current, action) => {
  switch (action.type) {
    case "first_name":
      return { ...current, first_name: action.first_name };
    case "last_name":
      return { ...current, last_name: action.last_name };
    case "company_name":
      return { ...current, company_name: action.company_name };
    case "username":
      return { ...current, username: action.username };
    case "image":
      return { ...current, image: action.image };

    default:
      throw new Error("Some thing is wrong");
  }
};

const stateErrorReducer = (current, action) => {
  switch (action.type) {
    case "first_name":
      return {
        ...current,
        first_name: action.first_name,
        message: action.message
      };
    case "last_name":
      return {
        ...current,
        last_name: action.last_name,
        message: action.message
      };
    case "company_name":
      return {
        ...current,
        company_name: action.company_name,
        message: action.message
      };
    case "username":
      return {
        ...current,
        username: action.username,
        message: action.message
      };
    case "image":
      return { ...current, image: action.image, message: action.message };
    case "message":
      return { ...current, message: action.message };

    default:
      throw new Error("Some thing is wrong");
  }
};

const Edit_profile = (props: IEdit_profile) => {
  const [showCompany, setShowCompany] = useState(false);
  const [privateLink, setPrivateLink] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [state, dispatch] = useReducer(stateReducer, {
    first_name: "",
    last_name: "",
    company_name: "",
    username: "",
    image: null
  });

  const [ErrorState, dispatchError] = useReducer(stateErrorReducer, {
    first_name: false,
    last_name: false,
    company_name: false,
    username: false,
    image: false,
    message: ""
  });

  useEffect(() => {
    console.log(props.data);

    dispatch({ type: "first_name", first_name: props.data.first_name });
    dispatch({ type: "last_name", last_name: props.data.last_name });
    if (props.data.company_name) {
      setShowCompany(true);
      dispatch({ type: "company_name", company_name: props.data.company_name });
    }
    if (props.data.thumbnail_url) {
      dispatch({ type: "image", image: props.data.thumbnail_url });
    }
    if (props.data.username) {
      setPrivateLink(true);
      dispatch({ type: "username", username: props.data.username });
    }
  }, [props.data]);

  const EditFormSubmit = async e => {
    e.preventDefault();
    await REQUEST_SET_FIRST_LAST_NAME({
      token,
      first_name: state.first_name,
      last_name: state.last_name
    });
    if (newImage) {
      await REQUEST_SET_USER_IMAGE({ token, file: newImage });
    }
    if (state.username !== "") {
      await REQUEST_SET_USERNAME({ token, username: state.username });
    }
    if (state.company_name !== "") {
      await REQUEST_SET_COMPANY_NAME({
        token,
        company_name: state.company_name
      });
    }
  };

  return (
    <form className="edit_profile_form" onSubmit={EditFormSubmit}>
      <img
        src={
          state.image
            ? state.image
            : "https://core.otoli.net/static/core/default_profile_pic.png"
        }
        alt={state.first_name}
      />
      <div className="change_image_container">
        <p>تغییر تصویر کاربری</p>

        <input
          type="file"
          id="file"
          accept=".jpg,.jpeg,.png"
          onChange={e => {
            let file = e.target.files[0];
            const types = ["image/png", "image/jpeg", "image/png"];
            if (types.every(type => file.type !== type)) {
              alert("لطفاً تصویر را با فرمت jpeg بارگذاری کنید.");
              return false;
            }
            setNewImage(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            dispatch({ type: "image", image: URL.createObjectURL(file) });
          }}
        />
      </div>
      <TextInput
        name="first_name"
        number={false}
        onChangeHandler={e => {
          dispatch({ type: "first_name", first_name: e });
        }}
        clearField={() => dispatch({ type: "first_name", first_name: "" })}
        autoFocus={false}
        error={{
          status: ErrorState.first_name,
          message: ErrorState.message
        }}
        min={2}
        max={50}
        value={state.first_name}
        label="نام"
      />
      <TextInput
        name="last_name"
        number={false}
        onChangeHandler={e => {
          dispatch({ type: "last_name", last_name: e });
        }}
        clearField={() => dispatch({ type: "last_name", last_name: "" })}
        autoFocus={false}
        error={{
          status: ErrorState.last_name,
          message: ErrorState.message
        }}
        min={2}
        max={50}
        value={state.last_name}
        label="نام خانوادگی"
      />
      {!showCompany ? (
        <p className="link_text" onClick={() => setShowCompany(true)}>
          نام شرکت
        </p>
      ) : (
        <TextInput
          name="company_name"
          number={false}
          onChangeHandler={e => {
            dispatch({ type: "company_name", company_name: e });
          }}
          clearField={() =>
            dispatch({ type: "company_name", company_name: "" })
          }
          autoFocus={false}
          error={{
            status: ErrorState.company_name,
            message: ErrorState.message
          }}
          min={2}
          max={50}
          value={state.company_name}
          label="نام شرکت"
        />
      )}
      {!privateLink ? (
        <p className="link_text" onClick={() => setPrivateLink(true)}>
          ایجاد آدرس اختصاصی
        </p>
      ) : (
        <TextInput
          name="username"
          number={false}
          onChangeHandler={e => {
            dispatch({ type: "username", username: e });
          }}
          clearField={() => dispatch({ type: "username", username: "" })}
          autoFocus={false}
          error={{
            status: ErrorState.username,
            message: ErrorState.message
          }}
          min={2}
          max={50}
          value={state.username}
          label="آدرس اختصاصی"
        />
      )}
      <div className="BTN_container">
        <Button
          class="Blue_BTN local_class"
          value="تایید"
          click={() => {}}
          loading={false}
        />
        <Button
          class="Blue_BTN cancel_class"
          value="لغو"
          click={() => props.setEdit()}
          loading={false}
        />
      </div>
    </form>
  );
};
interface IEdit_profile {
  data: any;
  setEdit: any;
}
export default Edit_profile;
