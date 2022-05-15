// import "./Counter.scss";
import Icon from "../Icons";

const Counter = (props: ICounter) => {
  return (
    <div className="counter_container">
      <label data-test-id="label">{props.label}</label>
      <div className="counter_box">
        <div className="counter">
          <span
            onClick={() => {
              if (props.value < props.max) props.AddTo();
            }}
          >
            <Icon name="plus" width="22px" height="22px" color="#3fa6da" />
          </span>
          <p data-test-id="value">{props.value}</p>
          <span
            onClick={() => {
              if (props.value > props.min) props.reduceTo();
            }}
          >
            <Icon name="dash" width="22px" height="22px" color="#3fa6da" />
          </span>
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
