import React, { useState } from "react";
// import "./Counter.scss";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const Counter = (props: ICounter) => {
  return (
    <div className="counter_container">
      <label data-test-id="label">{props.label}</label>
      <div className="counter_box">
        <div className="counter">
          <IoMdAdd
            data-test-id="add"
            onClick={() => {
              if (props.value < props.max) props.AddTo();
            }}
          />
          <p data-test-id="value">{props.value}</p>
          <IoMdRemove
            data-test-id="remove"
            onClick={() => {
              if (props.value > props.min) props.reduceTo();
            }}
          />
        </div>
        <span className="text_tail" data-test-id="tail">
          {props.text}
        </span>
      </div>
    </div>
  );
};

interface ICounter {
  max: number;
  min: number;
  AddTo: any;
  reduceTo: any;
  label: string;
  text: string;
  value: number;
}

export default Counter;
