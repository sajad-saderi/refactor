import React from "react";
import "./inputStyle.module.scss";

const TextInput = (props: ItextInput) => {
  const ValueHandler = e => {
    props.onChangeHandler(e.target.value);
  };

  return (
    <>
      <label className="text_input_label">{props.label}</label>
      <input
        className={[
          "text_input",
          props.error.status ? "input_Error" : null
        ].join(" ")}
        name={props.name}
        value={props.value}
        onChange={ValueHandler}
        disabled={props.disabled}
        maxLength={props.max}
        minLength={props.min}
        placeholder={props.placeholder}
      />
    </>
  );
};

interface ItextInput {
  name: string;
  value?: string;
  onChangeHandler: any;
  disabled?: boolean;
  max?: number;
  min?: number;
  label?: string;
  placeholder?: string;
  error?: any;
}

export default TextInput;
