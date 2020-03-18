import React, { useState, useEffect, useRef } from "react";
import { IoMdClose, IoIosArrowDown } from "react-icons/io";
import Spinner from "../../Spinner";
import "./DropDown_module.scss";

const DropdownSearch = (props: IDropDown) => {
  const [InputValue, setInputValue] = useState("");
  const [ShowController, setShowController] = useState(false);
  const [Data, setData] = useState([]);
  const [search_value, setSearch_value] = useState("");

  const wrapperRef = useRef(null);

  const handleClickOutside = e => {
    if (!wrapperRef.current.contains(e.target)) {
      setShowController(false);
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const DropDownController = () => {
    setShowController(!ShowController);
  };

  const searchHandler = e => {
    if (e === "") {
      setData(props.data);
    }

    let filter: any = props.data.filter(item => {
      return item.text.search(e) !== -1;
    });
    if (filter.length === 0)
      filter = [
        {
          key: 0,
          text: "نتیجه ای یافت نشد",
          value: 0
        }
      ];

    setData(filter);
  };

  const clearField = () => {
    setInputValue("");
    setShowController(true);
    props.clearField();
  };

  return (
    <div className="DropDown_container" ref={wrapperRef}>
      {props.label && <label>{props.label}</label>}
      <div className="input_wrapper">
        <input
          className={props.styleClass ? props.styleClass : ""}
          data-hj-whitelist
          readOnly={props.InputDisable}
          disabled={props.disabled}
          value={
            props.hardValue ? props.hardValue : InputValue || props.defaultVal
          }
          placeholder={props.placeholder}
          onClick={DropDownController}
        />
        {InputValue.length > 0 || props.defaultVal ? (
          <IoMdClose
            color="rgb(165, 165, 165)"
            size="2rem"
            className="clean_icon"
            onClick={clearField}
          />
        ) : null}
        <IoIosArrowDown
          color="rgb(165, 165, 165)"
          size="2rem"
          className="ArrowDown"
          onClick={DropDownController}
        />
      </div>
      {ShowController ? (
        <div className="Locations_list_container">
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
              <input
                autoFocus
                placeholder="جستجو"
                name="search"
                type="search"
                value={search_value}
                onChange={e => {
                  setSearch_value(e.target.value);
                  searchHandler(e.target.value);
                }}
              />
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
}

export default DropdownSearch;
