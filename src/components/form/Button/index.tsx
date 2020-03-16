import React from "react";
import './Button.module.scss'

const Button = (props: IButton) => {
  return (
    <button className={props.class}>
      {props.loading ? <span className="Loading" /> : props.value}
    </button>
  );
};

interface IButton {
  value: string;
  class: string;
  loading: boolean;
}

export default Button;
