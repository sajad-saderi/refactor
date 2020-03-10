import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const DropdownSearch = props => {
  const [InputValue, setInputValue] = useState("");
  const [ShowController, setShowController] = useState(false);
  const [Data, setData] = useState([]);

  const DropDownController = () => {
    setShowController(!ShowController);
  };

  useEffect(() => {
    setData(props.data);
    if (props.defaultVal && props.data.length > 0 && InputValue === "") {
      Data.find(i => {
        if (i.key === props.defaultVal) {
          setInputValue(i.text);
          props.Select(i);
        }
      });
    }
  }, [props.data]);

  return (
    <div
      className={["searchBoxContainer", props.error ? "ErrorINPUT" : null].join(
        " "
      )}
    >
      <label className={props.data.length < 2 ? "diz" : null}>
        {props.children}
      </label>
      {!props.disabled && props.loading && props.data.length < 1 && (
        <span className="loader"> </span>
      )}
      <input
        className={props.styleClass ? props.styleClass : ""}
        data-hj-whitelist
        readOnly={props.InputDisable}
        disabled={props.disabled}
        value={InputValue}
        placeholder={props.placeholder}
        onClick={DropDownController}
        onChange={e => {
          setData(
            props.data.filter(i => {
              // console.log(i.text , e.target.value);
              return i.text.match(e.target.value);
            })
          );
          setInputValue(e.target.value);
          setShowController(true);
        }}
      />
      {InputValue && (
        <IoMdClose
          style={{
            position: "absolute",
            left: "11px",
            top: props.IconTop + "px",
            cursor: "pointer",
            zIndex: 4,
            fontSize: "15px",
            color: "rgb(165, 165, 165)"
          }}
          onClick={() => {
            setInputValue("");
            props.clearField();
          }}
          color="rgb(165, 165, 165)"
        />
      )}
      {ShowController && (
        <div className="resultList" style={{ top: props.top + "px" }}>
          {Data.map(i => (
            <p
              className="Items"
              onClick={() => {
                setInputValue(i.text);
                props.Select(i);
                DropDownController();
              }}
              key={i.key}
            >
              {i.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSearch;
