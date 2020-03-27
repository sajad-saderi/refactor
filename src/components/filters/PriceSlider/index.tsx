import React, { useContext, useState } from "react";

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import "./price_filter.module.scss";

import filterContext from "../../../context/filter-context";

const PriceSlider = () => {
  const [value, setValue] = useState([0, 10000000]);
  const FilterContext = useContext(filterContext);
  const onSlide = value => {
    if (value[0] === "0.00" && value[1] === "10000000.00") {
      FilterContext.setDataForSearch({
        price: { status: false, value: value }
      });
    } else {
      FilterContext.setDataForSearch({ price: { status: true, value: value } });
    }
    setValue(value);
  };

  return (
    <div className="price_filter">
      <p>قیمت</p>
      <p>{`از ${Number(
        Number(value[0]).toFixed(0)
      ).toLocaleString()} تومان در روز تا ${Number(
        Number(value[1]).toFixed(0)
      ).toLocaleString()} میلون تومان`}</p>
      <Nouislider
        range={{ min: 0, max: 10000000 }}
        start={[0, 10000000]}
        margin={100000}
        connect
        direction={"rtl"}
        onEnd={v => onSlide(v)}
        step={100000}
      />
    </div>
  );
};

export default PriceSlider;
