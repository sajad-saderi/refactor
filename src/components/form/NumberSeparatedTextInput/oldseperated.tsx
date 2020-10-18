import React, { useState, useRef, useEffect } from "react";

const NumberSeparatedTextInput = (props: ItextInput) => {
  const [localError, setLocalError] = useState({
    status: false,
    message: "",
  });

  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [v3, setV3] = useState("");
  const [v4, setV4] = useState("");

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const ValueHandler = (e) => {
    let value = e;
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
    // replace all the arabic or persian character with english number
    for (var i = 0; i < 10; i++) {
      value = value.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
    // remove all the non-numeric char from string
    value = value.replace(/[^0-9]/g, "");
    // if the input is not number return the input without any changes
    return value;
  };

  const validation = (finalValue) => {
    if (!props.validation) {
      return false;
    }
    let data = props.validation;
    let value: string | number = finalValue;
    if (data.required) {
      if (finalValue === "") {
        setLocalError({
          status: true,
          message: data.messages.required,
        });
        return;
      } else {
        setLocalError({
          status: false,
          message: "",
        });
      }
    }
    if (/[^0-9]/g.test(value.toString())) {
      setLocalError({
        status: true,
        message: "ورودی نامعتبر",
      });
    } else if (data.LengthControl) {
      if (data.LengthControl.minLen) {
        if (value.toString().length < data.LengthControl.minLen) {
          setLocalError({
            status: true,
            message: data.messages.minLen,
          });
        }
      }
      if (data.LengthControl.maxLen) {
        if (value.toString().length > data.LengthControl.maxLen) {
          setLocalError({
            status: true,
            message: data.messages.maxLen,
          });
        }
      }
    } else if (data.length) {
      if (value.toString().length < data.length) {
        setLocalError({
          status: true,
          message: data.messages.length,
        });
      }
    } else if (data.min && value < data.min) {
      setLocalError({
        status: true,
        message: data.messages.min,
      });
    } else if (data.max && value > data.max) {
      setLocalError({
        status: true,
        message: data.messages.max,
      });
    } else {
      setLocalError({
        status: false,
        message: "",
      });
    }
    return true;
  };

  const autoTab = (e, PreviousRef, NextRef) => {
    e.persist();
    const BACKSPACE_KEY = 8;
    const DELETE_KEY = 46;
    let current_index = e.target.tabIndex || 1;
    console.log(current_index);
    if (e.keyCode === BACKSPACE_KEY) {
      if (current_index < 2) return;
      PreviousRef.current.focus();
    } else if (e.keyCode !== DELETE_KEY && current_index < 4) {
      NextRef.current.focus();
    } else {
      passValueToparent();
    }
  };

  const passValueToparent = () => {
    let value = `${v1}${v2}${v3}${v4}`;
    if (value.length === 4) if (validation(value)) props.onChangeHandler(value);
  };

  return (
    <div className="text_input_container">
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
      <div className="separated_places">
        <input
          ref={ref1}
          onKeyUp={(e) => autoTab(e, null, ref2)}
          type="text"
          data-hj-whitelist="true"
          tabIndex={1}
          key={1}
          className={[
            "text_input",
            props.error.status || localError.status ? "inputError" : null,
          ].join(" ")}
          name={props.name}
          value={v1}
          onChange={(e: any) => {
            setLocalError({
              status: false,
              message: "",
            });
            setV1(ValueHandler(e.target.value));
          }}
          autoFocus={true}
          maxLength={1}
          onBlur={passValueToparent}
        />
        <input
          ref={ref2}
          onKeyUp={(e) => autoTab(e, ref1, ref3)}
          type="text"
          data-hj-whitelist="true"
          tabIndex={2}
          key={2}
          className={[
            "text_input",
            props.error.status || localError.status ? "inputError" : null,
          ].join(" ")}
          name={props.name}
          value={v2}
          onChange={(e: any) => {
            setLocalError({
              status: false,
              message: "",
            });
            setV2(ValueHandler(e.target.value));
          }}
          maxLength={1}
          onBlur={passValueToparent}
        />
        <input
          ref={ref3}
          onKeyUp={(e) => autoTab(e, ref2, ref4)}
          type="text"
          data-hj-whitelist="true"
          tabIndex={3}
          key={3}
          className={[
            "text_input",
            props.error.status || localError.status ? "inputError" : null,
          ].join(" ")}
          name={props.name}
          value={v3}
          onChange={(e: any) => {
            setLocalError({
              status: false,
              message: "",
            });
            setV3(ValueHandler(e.target.value));
          }}
          maxLength={1}
          onBlur={passValueToparent}
        />
        <input
          ref={ref4}
          onKeyUp={(e) => autoTab(e, ref3, null)}
          type="text"
          data-hj-whitelist="true"
          tabIndex={4}
          key={4}
          className={[
            "text_input",
            props.error.status || localError.status ? "inputError" : null,
          ].join(" ")}
          name={props.name}
          value={v4}
          onChange={(e: any) => {
            setLocalError({
              status: false,
              message: "",
            });
            setV4(ValueHandler(e.target.value));
          }}
          maxLength={1}
        />
      </div>
      {/* 
        If the props.error.status === true and props.error.message has a value,
        the Error message shown under the input box 
      */}
      {(props.error.status || localError.status) && (
        <p data-test-id="input_error_message" className="input_error_message">
          {props.error.message || localError.message}
        </p>
      )}
    </div>
  );
};

interface ItextInput {
  // name of the input
  name: string;
  // keystroke listener
  onChangeHandler: any;
  error: any;
  label?: string;
  // you can set the custom color to the label of the input
  LabelColor?: string;
  // validation rules and requirements
  validation?: any;
}

export default NumberSeparatedTextInput;
