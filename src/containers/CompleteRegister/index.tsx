import React, { useReducer, useEffect, useState, useContext } from "react";
import "./complete_register.module.scss";
import DropdownSearch from "../../components/form/Dropdown";
import TextInput from "../../components/form/TextInput";
import jsCookie from "js-cookie";
import Button from "../../components/form/Button";
import Modal_context from "../../context/Modal_context";
import { IoMdPersonAdd } from "react-icons/io";
import { REQUEST_USER_INFO_UPDATE } from "../../API";

const token = jsCookie.get("token");

const stateReducer = (current, action) => {
  switch (action.type) {
    case "first_name":
      return { ...current, first_name: action.first_name };
    case "last_name":
      return { ...current, last_name: action.last_name };
    case "company_name":
      return { ...current, company_name: action.company_name };
    case "day":
      return { ...current, day: action.day };
    case "month":
      return { ...current, month: action.month };
    case "year":
      return { ...current, year: action.year };
    default:
      throw new Error("Something is wrong");
  }
};

const stateErrorReducer = (current, action) => {
  switch (action.type) {
    case "first_name":
      return {
        ...current,
        first_name: action.first_name,
        message: action.messsage,
      };
    case "last_name":
      return {
        ...current,
        last_name: action.last_name,
        message: action.messsage,
      };
    case "company_name":
      return {
        ...current,
        company_name: action.company_name,
        message: action.messsage,
      };
    case "day":
      return { ...current, day: action.day, message: action.messsage };
    case "month":
      return { ...current, month: action.month, message: action.messsage };
    case "year":
      return { ...current, year: action.year, message: action.messsage };
    case "message":
      return { ...current, year: action.year, message: action.messsage };
    default:
      throw new Error("Something is wrong");
  }
};

const Complete_register_container = () => {
  const [rolesCheck, setRolesCheck] = useState(false);
  const [showCompanyName, setShowCompanyName] = useState(false);
  const [state, dispatch] = useReducer(stateReducer, {
    first_name: "",
    last_name: "",
    company_name: "",
    day: "",
    month: null,
    year: "",
  });

  const [stateError, errorDispatch] = useReducer(stateErrorReducer, {
    first_name: false,
    last_name: false,
    company_name: false,
    day: false,
    month: false,
    year: false,
    message: "",
  });

  const monthsFarsi = [
    { key: "1", value: "1", text: "فروردین" },
    { key: "2", value: "2", text: "اردیبهشت" },
    { key: "3", value: "3", text: "خرداد" },
    { key: "4", value: "4", text: "تیر" },
    { key: "5", value: "5", text: "مرداد" },
    { key: "6", value: "6", text: "شهریور" },
    { key: "7", value: "7", text: "مهر" },
    { key: "8", value: "8", text: "آبان" },
    { key: "9", value: "9", text: "آذر" },
    { key: "10", value: "10", text: "دی" },
    { key: "11", value: "11", text: "بهمن" },
    { key: "12", value: "12", text: "اسفند" },
  ];
  const MODAL_CONTEXT = useContext(Modal_context);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user_info_res = await REQUEST_USER_INFO_UPDATE({
        token,
        first_name: state.first_name,
        last_name: state.last_name,
        company_name: state.company_name === "" ? null : state.company_name,
        birth_date: `${state.year}/${state.month}/${state.day}`,
      });
      const cook_option = {
        expires: 100,
      };
      jsCookie.set("complete_register", true);
      jsCookie.set("first_name", state.first_name);
      jsCookie.set("last_name", state.last_name);
      if (state.company_name !== "") {
        jsCookie.set("company_name", state.company_name);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <article className="responsive  complete_register_container">
      <div className="pageTitle">
        <IoMdPersonAdd className="Person_icon" size="6rem" color="#4ba3ce" />
        <h3>تکمیل اطلاعات</h3>
      </div>
      <form className="complete_register_form" onSubmit={submitHandler}>
        <div className="name_container">
          <TextInput
            name="first_name"
            label="نام"
            min={2}
            max={50}
            clearField={() => dispatch({ type: "first_name", first_name: "" })}
            onChangeHandler={(e) =>
              dispatch({ type: "first_name", first_name: e })
            }
            value={state.first_name}
            autoFocus={false}
            error={{
              status: stateError.first_name,
              message: stateError.message,
            }}
          />
          <TextInput
            name="last_name"
            min={2}
            label="نام خانوادگی"
            max={50}
            clearField={() => dispatch({ type: "last_name", last_name: "" })}
            onChangeHandler={(e) =>
              dispatch({ type: "last_name", last_name: e })
            }
            value={state.last_name}
            autoFocus={false}
            error={{
              status: stateError.last_name,
              message: stateError.message,
            }}
          />
        </div>
        <div className="company_part">
          {!showCompanyName ? (
            <p onClick={() => setShowCompanyName(true)}>افزودن نام شرکت</p>
          ) : (
            <div>
              <TextInput
                name="company_name"
                number={false}
                min={1}
                max={70}
                label="نام شرکت"
                clearField={() =>
                  dispatch({ type: "company_name", company_name: "" })
                }
                onChangeHandler={(e) =>
                  dispatch({ type: "company_name", company_name: e })
                }
                value={state.company_name}
                autoFocus={false}
                error={{
                  status: stateError.company_name,
                  message: stateError.message,
                }}
              />
              <span
                onClick={() => {
                  dispatch({ type: "company_name", company_name: "" });
                  setShowCompanyName(false);
                }}
              >
                لغو
              </span>
            </div>
          )}
        </div>
        <label>تاریخ تولد</label>
        <div className="date_birth">
          <TextInput
            name="day"
            number={true}
            min={1}
            max={2}
            placeholder="روز"
            clearField={() => dispatch({ type: "day", day: "" })}
            onChangeHandler={(e) => dispatch({ type: "day", day: e })}
            value={state.day}
            autoFocus={false}
            error={{
              status: stateError.day,
              message: stateError.message,
            }}
          />
          <DropdownSearch
            data={monthsFarsi}
            clearField={() => dispatch({ type: "month", month: null })}
            Select={(i) => dispatch({ type: "month", month: i.value })}
            disableSearch={true}
          />
          <TextInput
            name="year"
            number={true}
            min={4}
            max={4}
            clearField={() => dispatch({ type: "year", year: "" })}
            onChangeHandler={(e) => dispatch({ type: "year", year: e })}
            value={state.year}
            placeholder="مثال: 1369"
            autoFocus={false}
            localeString={true}
            error={{
              status: stateError.year,
              message: stateError.message,
            }}
          />
        </div>
        <div className="check_box_container">
          <label className="container">
            <span
              onClick={() => MODAL_CONTEXT.modalHandler("Law")}
              style={{
                textDecoration: "underline",
                color: "#0099ff",
                cursor: "pointer",
                display: "inline-block",
                marginBottom: "11px",
              }}
            >
              {" "}
              شرایط و مقررات
            </span>
            <span onClick={() => setRolesCheck(true)}>
              {" "}
              استفاده از اتولی را مطالعه کردم و می‌پذیرم.
            </span>
            <input
              type="checkbox"
              onChange={(e) => {
                e.persist();
                if (e.target.checked) {
                  setRolesCheck(true);
                } else {
                  setRolesCheck(false);
                }
              }}
              name="roles"
            />
            <span className="checkmark"></span>
          </label>
        </div>
        <Button
          class={["Blue_BTN local_BTN", rolesCheck ? null : "disable_BTN"].join(
            " "
          )}
          disable={!rolesCheck}
          value="تایید"
          click={() => {}}
          loading={false}
        />
      </form>
    </article>
  );
};

export default Complete_register_container;
