import React, { useReducer, useEffect } from "react";

let myInterval = null;
let UpdatedTime = 0;

const TimerReducer = (current, action) => {
  switch (action.type) {
    case "SET":
      return action.time;
    case "REDUCE":
      UpdatedTime = UpdatedTime - 1;
      return current - 1;
  }
  return current + 1;
};

const CountDown = (props: ITime) => {
  const [Time, dispatch] = useReducer(TimerReducer, 0);

  useEffect(() => {
    dispatch({ type: "SET", time: props.time });
    UpdatedTime = props.time;

    myInterval = setInterval(() => timer(), 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, []);

  useEffect(() => {
    if (UpdatedTime <= 0) {
      props.Done();
      return clearInterval(myInterval);
    }
  }, [Time]);

  const timer = () => {
    dispatch({
      type: "REDUCE"
    });
  };
  return <span>{Time}</span>;
};

interface ITime {
  time: number;
  Done: any;
}
export default CountDown;
