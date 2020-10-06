import React, { useState } from "react";

const NumberSeparatedTextInput = (props: ItextInput) => {
  const [localError, setLocalError] = useState({
    status: false,
    message: "",
  });

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
    // remove all the non-numeric char from string
    value = value.replace(/[^0-9]/g, "");
    // if the input is not number return the input without any changes
    props.onChangeHandler(value);
  };

  // useEffect(() => {
  //   if (props.error.status) {
  //     scrollTo(0, TextInput.current.offsetTop);
  //   }
  // }, [props.error]);

  const validation = (data) => {
    if (!props.validation) {
      return;
    }
    let value: string | number = props.value;
    if (data.required) {
      if (props.value === "") {
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

    // if(data.string){
    //   if(data.length){}
    //   if(data.minLength){}
    //   if(data.maxLength){}
    // }
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
        {props.input_count.map((i, index) => {
          console.log(props.value[index]);
          return (
            <input
              data-hj-whitelist="true"
              tabIndex={index + 1}
              autoFocus={props.autoFocus}
              className={[
                "text_input",
                "data-hj-whitelist",
                props.error.status || localError.status ? "inputError" : null,
              ].join(" ")}
              name={props.name}
              value={props.value[index]}
              onChange={(e: any) => {
                e.target.setCustomValidity("");
                ValueHandler(e);
              }}
              disabled={props.disabled}
              maxLength={1}
              // check the validation on blur event listener
              onBlur={() => {
                validation(props.validation);
                if (props.Input_onBlur) {
                  props.Input_onBlur();
                }
              }}
              onFocus={() => {
                setLocalError({
                  status: false,
                  message: "",
                });
              }}
            />
          );
        })}
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
  value: string;
  error: any;
  // Ready to type ofter load
  autoFocus: boolean;
  input_count: any;
  // deactivate the input
  disabled?: boolean;

  label?: string;

  // you can set the custom color to the label of the input
  LabelColor?: string;

  // validation rules and requirements
  validation?: any;
  Input_onBlur?: any;
}

export default NumberSeparatedTextInput;
