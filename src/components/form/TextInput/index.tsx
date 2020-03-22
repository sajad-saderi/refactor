import React from "react";
import "./inputStyle.module.scss";
import { IoMdClose } from "react-icons/io";

const TextInput = (props: ItextInput) => {
  const ValueHandler = e => {
    let value = e.target.value;
    if (props.number) {
      value = value.replace(/[^0-9]/g, "");
      props.onChangeHandler(value);
    } else props.onChangeHandler(value);
  };

  return (
    <div className="text_input_container">
      <label
        style={{
          color: props.LabelColor
        }}
        className="text_input_label"
      >
        {props.label}
      </label>
      <input
        autoFocus={props.autoFocus}
        className={[
          "text_input",
          props.error.status ? "input_Error" : null
        ].join(" ")}
        name={props.name}
        value={
          props.number
            ? props.value === ""
              ? props.value.toLocaleString()
              : Number(props.value).toLocaleString()
            : props.value
        }
        onChange={ValueHandler}
        disabled={props.disabled}
        maxLength={props.max}
        minLength={props.min}
        placeholder={props.placeholder}
      />
      {props.value.length > 0 && !props.HideClearIcon && (
        <IoMdClose
          color="rgb(165, 165, 165)"
          size="2rem"
          className="clean_icon"
          onClick={() => props.clearField()}
        />
      )}
    </div>
  );
};

interface ItextInput {
  name: string;
  clearField: any;
  onChangeHandler: any;
  value?: string;
  disabled?: boolean;
  max?: number;
  min?: number;
  label?: string;
  placeholder?: string;
  error?: any;
  LabelColor?: string;
  autoFocus?: boolean;
  number?: boolean;
  HideClearIcon?: boolean;
}

export default TextInput;
