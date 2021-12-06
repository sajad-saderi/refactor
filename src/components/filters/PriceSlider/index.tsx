import React, { useContext, useEffect, useState } from "react";
/**
 *
 * nouislider-react
 *
 * Npm
 *  https://www.npmjs.com/package/nouislider-react
 * Git
 *  https://github.com/mmarkelov/react-nouislider
 * Documentation
 *  https://refreshless.com/nouislider/
 */
import Nouislider from "nouislider-react";
// Had to import noUiSlider and filter style file modular, to work correctly
import "./price_filter.scss";
import "nouislider/distribute/nouislider.css";

import filterContext from "../../../context/filter-context";
import Price_slider_loader from "../../loaders/PriceSliderLoader";

const PriceSlider = ({ sliderRange, sliderPrice }: IPriceSlider) => {
  const [value, setValue] = useState([0, 10000000]);
  const [range, setRange] = useState(null);
  const [noSlider, setNoSlider] = useState(false);
  const FilterContext = useContext(filterContext);

  /**
   *
   * @param value
   * the income value [start pice , stop price ]
   * both values at the Array have typeOf String
   */
  const onSlide = (value) => {
    // Deactivate the price filter in initial search for default value
    if (+value[0] === range[0] && +value[1] === range[1]) {
      FilterContext.setDataForSearch({
        price: { status: false, value: [0, 0] },
      });
    } else {
      FilterContext.setDataForSearch({ price: { status: true, value: value } });
    }
    setValue(value);
  };

  useEffect(() => {
    if (sliderPrice.length > 0) {
      setValue([sliderPrice[0], sliderPrice[1]]);
    }
  }, [sliderPrice]);

  useEffect(() => {
    if (sliderRange.length > 0) {
      if (sliderRange[0] === sliderRange[1]) {
        setNoSlider(true);
        setRange(true);
      } else {
        setRange([sliderRange[0], sliderRange[1]]);
        setNoSlider(false);
      }
    } else {
      setRange(null);
    }
  }, [sliderRange]);

  return (
    <>
      {range ? (
        noSlider ? (
          <div className='price_filter fake_price_slider'>
            <h3>قیمت</h3>
            <div className='fake_slider_texts'>
              <p>- تومان</p>
              <span>تا</span>
              <p className='text_align_left'>- تومان</p>
            </div>
            <div className='fake_price_slider'></div>
          </div>
        ) : (
          <div className='price_filter'>
            <h3>قیمت</h3>
            <div className='price_text'>
              <p>
                <span className='TA'>{`${Number(
                  Number(
                    value[0] < 1000000 ? value[0] / 1000 : value[0] / 1000000
                  ).toFixed(1)
                ).toLocaleString()}`}</span>{" "}
                {`${value[0] >= 1000000 ? "میلیون" : "هزار"} تومان `}
              </p>
              <p className='TA'> تا </p>
              <p>
                <span className='TA'>{`${Number(
                  Number(
                    value[1] < 1000000 ? value[1] / 1000 : value[1] / 1000000
                  ).toFixed(1)
                ).toLocaleString()}`}</span>{" "}
                {`${value[1] >= 1000000 ? "میلیون" : "هزار"} تومان `}
              </p>
            </div>
            <Nouislider
              /**
               * @range
               * set the default range value between 0 to 10.000.000
               */
              range={{ min: range[0], max: range[1] }}
              start={value}
              margin={100000}
              // Show the blue color between to handles
              connect
              direction={"rtl"}
              onSlide={(i) => {
                setValue([+i[0], +i[1]]);
              }}
              // after click, the function will be running
              onEnd={(v) => onSlide(v)}
              step={100000}
            />
          </div>
        )
      ) : (
        <Price_slider_loader />
      )}
    </>
  );
};

interface IPriceSlider {
  sliderPrice: any;
  sliderRange: any;
}

export default PriceSlider;
