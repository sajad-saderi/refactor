import React, { useContext } from "react";

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

import filterContext from "../../../context/filter-context";

const PriceSlider = () => {
  const FilterContext = useContext(filterContext);
  const onSlide = value => {
    // FilterContext.price.max = value[1];
    // FilterContext.price.min = value[0];
    FilterContext.setDataForSearch(value);
  };

  return (
    <Nouislider
      range={{ min: 0, max: 5000000 }}
      start={[0, 5000000]}
      margin={100000}
      connect
      direction={"rtl"}
      onEnd={v => onSlide(v)}
      step={100000}
    />
  );
};

export default PriceSlider;
