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
import "./ZoomSlider.scss";
import "nouislider/distribute/nouislider.css";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const ZoomSlider = ({ zoomChange, zoom }: IPriceSlider) => {
  /**
   *
   * @param value
   * the income value [start pice , stop price ]
   * both values at the Array have typeOf String
   */
  const onSlide = (value) => {
    //     // Deactivate the price filter in initial search for default value
    //     if (+value[0] === range[0] && +value[1] === range[1]) {
    //       FilterContext.setDataForSearch({
    //         price: { status: false, value: [0, 0] },
    //       });
    //     } else {
    //       FilterContext.setDataForSearch({ price: { status: true, value: value } });
    //     }
    //     setValue(value);
  };

  //   useEffect(() => {
  //     if (sliderPrice.length > 0) {
  //       setValue([sliderPrice[0], sliderPrice[1]]);
  //     }
  //   }, [sliderPrice]);

  //   useEffect(() => {
  //     if (sliderRange.length > 0) {
  //       if (sliderRange[0] === sliderRange[1]) {
  //         setNoSlider(true);
  //         setRange(true);
  //       } else {
  //         setRange([sliderRange[0], sliderRange[1]]);
  //         setNoSlider(false);
  //       }
  //     } else {
  //       setRange(null);
  //     }
  //   }, [sliderRange]);

  return (
    <div className='zoom_slider'>
      <IoMdAdd size='2.2rem' color='#fff' className='zoom_plus_icon' />
      <Nouislider
        /**
         * @range
         * set the default range value between 0 to 10.000.000
         */
        range={{ min: 1, max: 3 }}
        start={zoom}
        onSlide={(zoom) => zoomChange(zoom)}
        step={0.1}
      />
      <IoMdRemove size='2.2rem' color='#fff' className='zoom_out_icon' />
    </div>
  );
};

interface IPriceSlider {
  zoomChange: any;
  zoom: number;
}

export default ZoomSlider;
