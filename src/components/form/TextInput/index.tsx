import React from "react";
import "./inputStyle.scss";
import { IoMdClose } from "react-icons/io";

const TextInput = (props: ItextInput) => {
  const ValueHandler = (e) => {
    let value = e.target.value;
    if (props.number) {
      const persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
      ];
      const arabicNumbers = [
        /٠/g,
        /١/g,
        /٢/g,
        /٣/g,
        /٤/g,
        /٥/g,
        /٦/g,
        /٧/g,
        /٨/g,
        /٩/g,
      ];
      for (var i = 0; i < 10; i++) {
        value = value
          .replace(persianNumbers[i], i)
          .replace(arabicNumbers[i], i);
      }
      value = value.replace(/[^0-9]/g, "");
      props.onChangeHandler(value);
    } else props.onChangeHandler(value);
  };

  return (
    <div className="text_input_container">
      <label
        style={{
          color: props.LabelColor,
        }}
        className="text_input_label"
      >
        {props.label}
      </label>
      <input
        autoFocus={props.autoFocus}
        className={[
          "text_input",
          props.error.status ? "inputError" : null,
        ].join(" ")}
        name={props.name}
        value={
          props.number
            ? props.value === ""
              ? props.value.toLocaleString()
              : props.localeString
              ? props.value
              : Number(props.value).toLocaleString()
            : props.value
          // props.value
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
      {props.error.status && (
        <p className="input_error_message">{props.error.message}</p>
      )}
    </div>
  );
};

interface ItextInput {
  name: string;
  clearField: any;
  onChangeHandler: any;
  value: string;
  error: any;
  autoFocus: boolean;
  disabled?: boolean;
  max?: number;
  min?: number;
  label?: string;
  placeholder?: string;
  LabelColor?: string;
  number?: boolean;
  HideClearIcon?: boolean;
  localeString?: boolean;
}

export default TextInput;
