import React, { useRef, useEffect } from "react";
import "./inputStyle.scss";
import { IoMdClose } from "react-icons/io";

const TextInput = (props: ItextInput) => {
  const TextInput = useRef(null);

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

  useEffect(() => {
    if (props.error.status) {
      scrollTo(0, TextInput.current.offsetTop);
    }
  }, [props.error]);

  return (
    <div className="text_input_container" ref={TextInput}>
      <label
        style={{
          color: props.LabelColor,
        }}
        className="text_input_label"
      >
        {props.label}
      </label>
      <input
        onInvalid={(e: any) => {
          if (props.value.length < props.min) {
            e.target.setCustomValidity(
              `حداقل ورودی باید ${props.min} کاراکتر باشد`
            );
          } else if (props.value.length > props.max) {
            e.target.setCustomValidity(
              `طول ورودی نباید بیشتر از ${props.max} کاراکتر باشد`
            );
          }
        }}
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
        onChange={(e: any) => {
          e.target.setCustomValidity("");
          ValueHandler(e);
        }}
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
