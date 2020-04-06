import React from "react";

const Spinner = (props: ISpinner) => {
  return (
    <span
      style={{
        display: props.display,
        borderRightColor: props.color,
        width: props.width + "px",
        height: props.width + "px",
      }}
      className="Loading"
    ></span>
  );
};
interface ISpinner {
  display: string;
  width: number;
  color: string;
}

export default Spinner;
