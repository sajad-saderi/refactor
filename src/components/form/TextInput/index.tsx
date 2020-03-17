import React from "react";
import "./inputStyle.module.scss";
import { IoMdClose } from "react-icons/io";

const TextInput = (props: ItextInput) => {
  const ValueHandler = e => {
    props.onChangeHandler(e.target.value);
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
      {props.value.length > 0 && (
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
  value?: string;
  onChangeHandler: any;
  disabled?: boolean;
  max?: number;
  min?: number;
  label?: string;
  placeholder?: string;
  error?: any;
  clearField: any;
  LabelColor?: string;
}

export default TextInput;
