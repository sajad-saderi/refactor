import React, { useEffect, useState } from "react";
import Spinner from "../../Spinner";
import "./Checkbox.module.scss";

const Checkbox = (props: ICheckbox) => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <>
      {Data.length === 0 ? (
        <div
          className="resultList"
          // style={{ top: props.top + "px" }}
        >
          <Spinner display="block" width={21} color="#9E9E9E" />
        </div>
      ) : (
        <div
          className="check_box_container"
          // style={{ top: props.top + "px" }}
        >
          {Data.map((i, index) => (
            <label className="container" key={index}>
              {i.text}
              <input
                type="checkbox"
                onChange={e => {
                  e.persist();
                  if (e.target.checked) {
                    props.Select(i);
                  } else {
                    props.clearField(i);
                  }
                }}
                name={props.name}
              />

              <span className="checkmark"></span>
            </label>
          ))}
        </div>
      )}
    </>
  );
};

interface ICheckbox {
  data: any;
  name: string;
  clearField: any;
  Select: any;
  //   defaultCheck?: boolean;
}

export default Checkbox;
