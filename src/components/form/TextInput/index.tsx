import React, { useRef, useEffect } from "react";
// import "./inputStyle.scss";
import { IoMdClose } from "react-icons/io";

const TextInput = (props: ItextInput) => {
  const TextInput = useRef(null);

  const ValueHandler = (e) => {
    let value = e.target.value;
    // check the given character and convert it to english
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
    const persianNumbersSTD = [
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
    // replace all the arabic or persian character with english number
    for (var i = 0; i < 10; i++) {
      value = value
        .replace(persianNumbers[i], i)
        .replace(persianNumbersSTD[i], i)
        .replace(arabicNumbers[i], i);
    }
    if (props.number) {
      // remove all the non-numeric char from string
      value = value.replace(/[^0-9]/g, "");
    }
    // if the input is not number return the input without any changes
    props.onChangeHandler(value);
  };

  // useEffect(() => {
  //   if (props.error.status) {
  //     scrollTo(0, TextInput.current.offsetTop);
  //   }
  // }, [props.error]);

  return (
    <div className="text_input_container" ref={TextInput}>
      <label
        /**
         * @LabelColor
         *  lives here
         */
        style={{
          color: props.LabelColor,
        }}
        className="text_input_label"
      >
        {props.label}
      </label>
      <input
        data-test-id="input"
        data-hj-whitelist="true"
        onInvalid={(e: any) => {
          /**
           *
           * this part it just works in numeric status
           * If the length of the input is smaller then props.min input is invalid and error style will shown
           */
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
          "text_input","data-hj-whitelist",
          props.error.status ? "inputError" : null,
        ].join(" ")}
        name={props.name}
        value={
          /**
           * If it's number
           *  If is empty show "" (nothing)
           *
           * If it's number
           *  And it's NOT empty so Do toLocaleString() on value
           *
           * If it's number
           *   And it's NOT empty and props.localeString is ACTIVE
           *    Print the current value without change
           *
           * If it's number
           *   And it's NOT empty and props.localeString is DEACTIVATE
           *    Do  toLocaleString() on value
           *
           * If it's NOT number
           *   Print the current value without change
           */
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
          data-test-id="svg-icon"
          color="rgb(165, 165, 165)"
          size="2rem"
          className="clean_icon"
          onClick={() => props.clearField()}
        />
      )}
      {/* 
        If the props.error.status === true and props.error.message has a value,
        the Error message shown under the input box 
      */}
      {props.error.status && (
        <p data-test-id="input_error_message" className="input_error_message">
          {props.error.message}
        </p>
      )}
    </div>
  );
};

interface ItextInput {
  // name of the input
  name: string;

  // responsible to clear the input
  clearField: any;

  // keystroke listener
  onChangeHandler: any;
  value: string;
  error: any;
  // Ready to type ofter load
  autoFocus: boolean;

  // deactivate the input
  disabled?: boolean;

  max?: number;
  min?: number;
  label?: string;
  placeholder?: string;

  // you can set the custom color to the label of the input
  LabelColor?: string;

  // convert the input type from 'text' to 'number'
  number?: boolean;

  // don't shoe clear icon
  HideClearIcon?: boolean;

  // control on converting the value inside the input to local string
  localeString?: boolean;
}

export default TextInput;
