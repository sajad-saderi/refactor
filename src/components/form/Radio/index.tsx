import React from "react";
import "./radio.module.scss";

const Radio = (props: IRadio) => {
  return props.data.map((i: any) => {
    return (
      <div className="radio_container">
        <label className="container">
          {i.label}
          <input
            type="radio"
            name={props.name}
            value={i.value}
            checked={i.checked}
            onChange={e => {
              props.SelectHandler(e.target.value);
            }}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    );
  });
};

interface IRadio {
  name: string;
  data: any;
  SelectHandler: any;
}

export default Radio;
