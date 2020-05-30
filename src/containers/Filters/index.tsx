import React, { useState, useContext, useEffect } from "react";
import PriceSlider from "../../components/filters/PriceSlider";
// import "./Filter.scss";
import Checkbox from "../../components/form/Checkbox";
import filterContext from "../../context/filter-context";
import DropdownSearch from "../../components/form/Dropdown";
import { REQUEST_GET_CAR_BRAND, REQUEST_GET_CAR_MODEL } from "../../API";
import { IoIosOptions, IoMdClose } from "react-icons/io";

let body_style_list = [];

const Filters = (props: IFilter) => {
  const [deliver_at_renters_place, setDeliver_at_renters_place] = useState(0);
  const [with_driver, setwith_driver] = useState(0);
  const [body_style_set, setbody_style_set] = useState([]);

  const [BrandList, setBrandList] = useState([]);
  const [Brand_id, setBrand_id] = useState(null);
  const [ModelList, setModelList] = useState([]);
  const [car_id, setcar_id] = useState(null);
  const [show_filter, setShow_filter] = useState(false);

  const FilterContext = useContext(filterContext);

  useEffect(() => {
    getBrandCarList();
    return () => {
      body_style_list = [];
    };
  }, []);

  const getBrandCarList = async () => {
    try {
      const car_brand_Res: any = await REQUEST_GET_CAR_BRAND();
      setBrandList(car_brand_Res.carBrands);
    } catch (error) {
      console.log("!Error", error);
    }
  };

  const getModelList = async (i) => {
    try {
      const car_model_res: any = await REQUEST_GET_CAR_MODEL(i);
      setModelList(car_model_res.data);
    } catch (error) {
      console.log("!Error", error);
    }
  };

  useEffect(() => {
    if (props.extra_info.body_style_id) {
      setbody_style_set(props.extra_info.body_style_id);
    }
  }, [props.extra_info]);

  // add this filter to the filter context
  const body_style_add = (item) => {
    body_style_list.push(item.value);
    // add body style to the filter context
    FilterContext.setDataForSearch({
      body_style_id: { status: true, value: body_style_list },
    });
  };

  // remove the filter from the filter context
  const body_style_remove = (item) => {
    body_style_list = body_style_list.filter((i) => {
      return i !== item.value;
    });
    FilterContext.setDataForSearch({
      body_style_id: { status: true, value: body_style_list },
    });
  };

  return (
    <>
      {/* Trigger icon in mobile view */}
      <span className="show_filter" onClick={() => setShow_filter(true)}>
        جستجوی پیشرفته
        <IoIosOptions size="1.4rem" color="#656565" />
      </span>
      {show_filter && (
        <div
          onClick={() => setShow_filter(false)}
          className="with_drawer"
        ></div>
      )}
      <section
        className={[
          "filter_section",
          show_filter ? "show_Filter_section" : null
        ].join(" ")}
      >
        <div className="Close_filter" onClick={() => setShow_filter(false)}>
          <p>بستن</p>
          <IoMdClose size="2rem" color="#909090" />
        </div>
        <PriceSlider />
        <h3>خدمات اجاره</h3>
        <Checkbox
          initialValue={[deliver_at_renters_place]}
          data={[
            {
              text: "تحویل در محل به شما",
              value: deliver_at_renters_place,
            },
          ]}
          name="deliver_at_renters_place"
          clearField={(item) => {
            FilterContext.setDataForSearch({
              deliver_at_renters_place: { status: false, value: 0 },
            });
            setDeliver_at_renters_place(0);
          }}
          Select={(item) => {
            // add this filter to the filter context
            FilterContext.setDataForSearch({
              deliver_at_renters_place: { status: true, value: 1 },
            });
            setDeliver_at_renters_place(1);
          }}
        />
        <Checkbox
          initialValue={[with_driver]}
          data={[
            {
              text: "اجاره همراه با راننده",
              value: with_driver,
            },
          ]}
          name="with_driver"
          clearField={(item) => {
            FilterContext.setDataForSearch({
              with_driver: { status: false, value: 0 },
            });
            setwith_driver(0);
          }}
          Select={(item) => {
            // add this filter to the filter context
            FilterContext.setDataForSearch({
              with_driver: { status: true, value: 1 },
            });
            setwith_driver(1);
          }}
        />
        <h3>نوع شاسی</h3>
        <Checkbox
          initialValue={body_style_set}
          data={body_style_set}
          name="body_style_set"
          clearField={(item) => {
            body_style_remove(item);
          }}
          Select={(item) => {
            body_style_add(item);
          }}
        />
        <DropdownSearch
          InputDisable={true}
          label="برند"
          data={BrandList}
          clearField={() => {
            setBrand_id(null);
            FilterContext.setDataForSearch({
              brand_id: { status: false, value: null },
            });
          }}
          Select={(i) => {
            setBrand_id(i.value);
            setModelList([]);
            getModelList(i.value);
            // add brand_id filter to the filter context
            FilterContext.setDataForSearch({
              brand_id: { status: true, value: i.value },
            });
          }}
          browserDropdown={true}
        />
        <DropdownSearch
          InputDisable={true}
          disabled={!Brand_id ? true : false}
          label="مدل"
          data={ModelList}
          clearField={() => {
            setcar_id(null);
            FilterContext.setDataForSearch({
              car_id: { status: false, value: null },
            });
          }}
          Select={(i) => {
            setcar_id(i.value);
            // add car_id filter to the filter context
            FilterContext.setDataForSearch({
              car_id: { status: true, value: i.value },
            });
          }}
          browserDropdown={true}
        />
      </section>
    </>
  );
};

interface IFilter {
  // list of car body style
  extra_info: any;
}

export default Filters;
