import React from "react";

const TextInput = (props: ItextInput) => {
  const ValueHandler = e => {
    props.onChangeHandler(e.target.value);
  };

  return (
    <input
      name={props.name}
      value={props.value}
      onChange={ValueHandler}
      disabled={props.disabled}
      maxLength={props.max}
      minLength={props.min}
    />
  );
};

interface ItextInput {
  name: string;
  value?: string;
  onChangeHandler: any;
  disabled?: boolean;
  max?: number;
  min?: number;
}

export default TextInput;
