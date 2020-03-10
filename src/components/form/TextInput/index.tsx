import React from "react";

const TextInput = (props:ItextInput) => {
  return (
    <input
      name={props.name}
      value={props.value}
      onChange={props.onChangeHandler}
      disabled={props.disabled}
      max={props.max}
      min={props.min}
    />
  );
};

interface ItextInput {
  name: string;
  value?: string;
  onChangeHandler: any;
  disabled?: boolean;
  max?: string | number;
  min?: string | number;
}

export default TextInput;
