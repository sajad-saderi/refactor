import React from "react";
import "./Button.scss";

const Button = (props: IButton) => {
  return (
    <button
    data-test-id="btn"
      className={props.class}
      disabled={props.disable || props.loading}
      onClick={() => props.click()}
    >
      {props.loading ? <span  data-test-id="Loading" className="Loading" /> : props.value}
    </button>
  );
};

interface IButton {
  value: string;
  class: string;
  loading: boolean;
  disable?: boolean;
  click: any;
}

export default Button;
