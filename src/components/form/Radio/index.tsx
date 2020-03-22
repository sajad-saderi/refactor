import React, { useEffect, useState } from "react";
import "./radio.module.scss";

const Radio = (props: IRadio) => {
  const [checked, setChecked] = useState(null);
  useEffect(() => {
    setChecked(props.defaultCheck);
  }, [props.defaultCheck]);

  return props.data.map((i: any) => {
    return (
      <div className="radio_container">
        <label className="container">
          {i.label}
          <input
            type="radio"
            name={props.name}
            value={i.value}
            checked={checked === i.value}
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
  defaultCheck?: number;
}

export default Radio;
