import React, { useState, useEffect, useRef } from "react";
import { IoMdClose, IoIosArrowDown } from "react-icons/io";
import Spinner from "../../Spinner";

const DropdownSearch = (props: IDropDown) => {
  const [InputValue, setInputValue] = React.useState("");
  const [ShowController, setShowController] = React.useState(false);
  const [Data, setData] = React.useState([]);
  const [search_value, setSearch_value] = React.useState("");

  const wrapperRef = useRef(null);

  const handleClickOutside = (e) => {
    if (!wrapperRef.current.contains(e.target)) {
      setShowController(false);
      return;
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    if (props.defaultVal) {
      setInputValue(props.defaultVal);
    }
  }, [props.defaultVal]);

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  React.useEffect(() => {
    if (props.error_status) {
      scrollTo(0, wrapperRef.current.offsetTop);
    }
  }, [props.error_status]);

  const DropDownController = () => {
    console.log("Click");

    setShowController(!ShowController);
  };

  const searchHandler = (e) => {
    if (e === "") {
      setData(props.data);
    }

    let filter: any = props.data.filter((item) => {
      return item.text.search(e) !== -1;
    });
    if (filter.length === 0)
      filter = [
        {
          key: 0,
          text: "نتیجه ای یافت نشد",
          value: 0,
        },
      ];

    setData(filter);
  };

  const clearField = () => {
    setInputValue("");
    setShowController(true);
    props.clearField();
  };

  return (
    <div
      className={[
        "DropDown_container",
        props.disabled ? "Disable_Container" : null,
      ].join(" ")}
      ref={wrapperRef}
    >
      {props.label && (
        <label
          data-test="label"
          className={props.disabled ? "Disable_color" : null}
        >
          {props.label}
        </label>
      )}
      <div className="input_wrapper">
        <input
          data-test="drop_down_input"
          className={[
            props.disabled ? "Disable_color" : null,
            props.styleClass ? props.styleClass : null,
            props.error_status ? "inputError" : null,
          ].join(" ")}
          data-hj-whitelist
          onChange={() => {}}
          readOnly={props.InputDisable}
          disabled={props.disabled}
          value={props.hardValue ? props.hardValue : InputValue}
          placeholder={props.placeholder}
          onClick={DropDownController}
        />
        {(InputValue.length > 0 || props.defaultVal) &&
        !props.hideClearField ? (
          <IoMdClose
            color="rgb(165, 165, 165)"
            size="2rem"
            className="clean_icon"
            onClick={clearField}
          />
        ) : null}
        {!props.hideArrowDown && (
          <IoIosArrowDown
            color="rgb(165, 165, 165)"
            size="2rem"
            className="ArrowDown"
            onClick={DropDownController}
          />
        )}
      </div>
      {ShowController ? (
        <div
          data-test="Locations_list_container"
          className="Locations_list_container"
        >
          {Data.length === 0 ? (
            <div
              className="resultList"
              // style={{ top: props.top + "px" }}
            >
              <Spinner display="block" width={21} color="#9E9E9E" />
            </div>
          ) : (
            <div
              className="resultList"
              // style={{ top: props.top + "px" }}
            >
              {!props.disableSearch && (
                <input
                  data-test="search_input"
                  autoFocus
                  placeholder="جستجو"
                  name="search"
                  type="search"
                  value={search_value}
                  onChange={(e) => {
                    setSearch_value(e.target.value);
                    searchHandler(e.target.value);
                  }}
                />
              )}
              {Data.map((i, index) => (
                <p
                  className="Items"
                  onClick={() => {
                    setInputValue(i.text);
                    props.Select(i);
                    DropDownController();
                  }}
                  key={index}
                >
                  {i.text}
                  {i.code && (
                    <span
                      style={{ background: `${i.code}` }}
                      className="Color_box"
                    ></span>
                  )}
                </p>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

interface IDropDown {
  error_status?: boolean;
  InputDisable?: boolean;
  disabled?: boolean;
  placeholder?: string;
  data: any;
  defaultVal?: any;
  label?: string;
  styleClass?: string;
  clearField: any;
  Select: any;
  hardValue?: string;
  disableSearch?: boolean;
  hideArrowDown?: boolean;
  hideClearField?: boolean;
}

export default DropdownSearch;
