import React, { useEffect, useState, useRef } from "react";

const Radio = (props: IRadio) => {
  const [checked, setChecked] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setChecked(props.defaultCheck);
  }, [props.defaultCheck]);

  useEffect(() => {
    if (props.error_status) {
      scrollTo(0, wrapperRef.current.offsetTop);
    }
  }, [props.error_status]);

  return props.data.map((i: any, index) => {
    return (
      <div
        className={[
          "radio_container",
          checked === i.value ? "active_radio_item" : null,
        ].join(" ")}
        key={index}
        ref={wrapperRef}
      >
        <label className="container">
          {i.label}
          {i.extra_text && <p>{i.extra_text}</p>}
          <input
          data-test-id="radio"
            type="radio"
            name={props.name}
            value={i.value}
            checked={checked === i.value}
            onChange={(e) => {
              props.SelectHandler(+e.target.value);
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
  error_status?: boolean;
}

export default Radio;
