import React from "react";
import "./Button.module.scss";

const Button = (props: IButton) => {
  return (
    <button className={props.class} disabled={props.disable}>
      {props.loading ? <span className="Loading" /> : props.value}
    </button>
  );
};

interface IButton {
  value: string;
  class: string;
  loading: boolean;
  disable?: boolean;
}

export default Button;
