import React, { useState } from "react";
import "./Counter.module.scss";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const Counter = (props: ICounter) => {
  return (
    <div className="counter_container">
      <label>{props.label}</label>
      <div>
        <div>
          <IoMdAdd
            onClick={() => {
              console.log(props.value, props.max);

              if (props.value < props.max) props.AddTo();
            }}
          />
          <p>{props.value}</p>
          <IoMdRemove
            onClick={() => {
              if (props.value > props.min) props.reduceTo();
            }}
          />
        </div>
        <span>{props.text}</span>
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
