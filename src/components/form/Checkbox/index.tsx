import React, { useEffect, useState } from "react";
import Spinner from "../../Spinner";

const Checkbox = (props: ICheckbox) => {
  const [Data, setData] = useState([]);
  const [initialValueList, setInitialValueList] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    if (props.initialValue) {
      setInitialValueList(props.initialValue);
    }
  }, [props.initialValue]);

  return (
    <>
      {Data.length === 0 ? (
        <div className="resultList" data-test-id="resultList">
          <Spinner display="block" width={21} color="#9E9E9E" />
        </div>
      ) : (
        <div className="check_box_container">
          {Data.map((i, index) => (
            <label className="container" key={index} data-test-id="container">
              {i.text}
              {i.count ? (
                <span className="count">{i.count}</span>
              ) : i.count === 0 ? (
                <span className="count">-</span>
              ) : null}
              <input
                data-test-id="checkbox"
                checked={initialValueList.find((item) => {
                  return item === i.value ? true : false;
                })}
                type="checkbox"
                onChange={(e) => {
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
  initialValue?: any;
}

export default Checkbox;
