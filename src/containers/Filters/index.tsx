import React, { useState, useContext, useEffect } from "react";
import PriceSlider from "../../components/filters/PriceSlider";
// import "./Filter.scss";
import Checkbox from "../../components/form/Checkbox";
import filterContext from "../../context/filter-context";
import DropdownSearch from "../../components/form/Dropdown";
import { REQUEST_GET_CAR_BRAND, REQUEST_GET_CAR_MODEL } from "../../API";
import { IoIosOptions, IoMdClose } from "react-icons/io";
import Spinner from "../../components/Spinner";

let body_style_list = [];

const Filters = (props: IFilter) => {
  const [deliver_at_renters_place, setDeliver_at_renters_place] = useState(0);
  const [with_driver, setwith_driver] = useState(0);
  const [body_style_set, setbody_style_set] = useState([]);

  const [BrandList, setBrandList] = useState([]);
  const [Brand_id, setBrand_id] = useState(null);
  const [Brand_id_name, setBrand_id_name] = useState("");
  const [Brand_Name_ComponentReset, setBrand_Name_ComponentReset] = useState(
    false
  );
  const [ModelList, setModelList] = useState([]);
  const [car_id, setcar_id] = useState(null);
  const [car_id_name, setCar_id_name] = useState("");
  const [car_Name_ComponentReset, setCar_Name_ComponentReset] = useState(false);
  const [show_filter, setShow_filter] = useState(false);
  const [hidePrice, setHidePrice] = useState(false);

  const [initialValue, setInitialValue] = useState([0, 10000000]);

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

  useEffect(() => {
    if (props.show_filter_prop) {
      setShow_filter(true);
      document.body.style.overflow = "hidden";
    }
  }, [props.show_filter_prop]);

  // add this filter to the filter context
  const body_style_add = (item) => {
    body_style_list.push(item.value);
    // add body style to the filter context
    FilterContext.setDataForSearch({
      body_style_id: { status: true, value: body_style_list },
    });
  };

  useEffect(() => {
    if (props.reset) {
      if (props.reset.price) {
        setHidePrice(true);
        mounter("price");
        setInitialValue([0, 10000000]);
      }
      if (props.reset.deliver_at_renters_place) {
        setDeliver_at_renters_place(0);
        props.clearReset("deliver_at_renters_place");
      }
      if (props.reset.with_driver) {
        setwith_driver(0);
        props.clearReset("with_driver");
      }
      if (props.reset.body_style_id) {
        setbody_style_set([]);
        body_style_list = [];
        props.clearReset("body_style_id");
      }
      if (props.reset.brand_id) {
        setBrand_Name_ComponentReset(true);
        setBrand_id(null);
        setModelList([]);
        props.clearReset("brand_id");
      }
      if (props.reset.car_id) {
        setCar_Name_ComponentReset(true);
        setcar_id(null);
        props.clearReset("car_id");
      }
      //     break;
      //   case props.reset.with_driver:
      //     break;
      //   case props.reset.body_style_id:
      //     break;
      //   case props.reset.deliver_at_renters_place:
      //     break;
      //   case props.reset.brand_id:
      //     break;
      //   case props.reset.car_id:
      //     break;
      //   default:
      //     break;
      // }
    }
  }, [props.reset]);

  const mounter = (v) => {
    if (v === "price") {
      const hideTimer = setTimeout(() => {
        setHidePrice(false);
        clearTimeout(hideTimer);
        props.clearReset(v);
      }, 500);
    }
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

  useEffect(() => {
    if (props.initialFilterValues) {
      if (props.initialFilterValues.router.query.min_price) {
        setInitialValue([
          +props.initialFilterValues.router.query.min_price,
          +props.initialFilterValues.router.query.max_price,
        ]);
      }
      if (
        props.initialFilterValues.router.query.deliver_at_renters_place &&
        props.initialFilterValues.router.query.deliver_at_renters_place === "1"
      ) {
        setDeliver_at_renters_place(
          +props.initialFilterValues.router.query.deliver_at_renters_place
        );
      }
      if (
        props.initialFilterValues.router.query.with_driver &&
        props.initialFilterValues.router.query.with_driver === "1"
      ) {
        setwith_driver(+props.initialFilterValues.router.query.with_driver);
      }
      if (
        props.initialFilterValues.router.query.body_style_id &&
        props.initialFilterValues.router.query.body_style_id !== "all"
      ) {
        let convertStringToArray = props.initialFilterValues.router.query.body_style_id.split(
          ","
        );
        let convertIndexToNumber = convertStringToArray.reduce((s, c) => {
          return s.concat(+c);
        }, []);
        body_style_list = convertIndexToNumber;
      }
      if (
        props.initialFilterValues.router.query.brand_id &&
        props.initialFilterValues.router.query.brand_id !== "all"
      ) {
        setBrand_id_name(
          props.initialFilterValues.router.query.brand_name.replace(/-/g, " ")
        );
        let brand_id = +props.initialFilterValues.router.query.brand_id;
        setBrand_id(brand_id);
        getModelList(brand_id);
        if (props.initialFilterValues.router.query.car_id !== "all") {
          setCar_id_name(
            props.initialFilterValues.router.query.car_name.replace(/-/g, " ")
          );
        }
      }
    }
  }, [props.initialFilterValues]);

  return (
    <>
      {show_filter && (
        <div
          onClick={() => {
            setShow_filter(false);
            document.body.style.overflow = "unset";
            props.show_filter_prop_reset();
          }}
          className="with_drawer"
        ></div>
      )}
      <section
        className={[
          "filter_section",
          show_filter ? "show_Filter_section" : null,
        ].join(" ")}
      >
        <div className="closeBtnWrapper">
          <span className="bar"></span>
          <div
            className="Close_filter"
            onClick={() => {
              setShow_filter(false);
              props.show_filter_prop_reset();
              document.body.style.overflow = "unset";
            }}
          >
            {/* <p>بستن</p> */}
            <IoMdClose size="3rem" color="#909090" />
          </div>
        </div>
        {hidePrice ? (
          <Spinner display="block" width={20} color="#737373" />
        ) : (
          <PriceSlider initialValue={initialValue} />
        )}
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
        <div className="body_style_type_wrapper">
          <h3>نوع بدنه</h3>
          <Checkbox
            initialValue={body_style_list}
            data={body_style_set}
            name="body_style_set"
            clearField={(item) => {
              body_style_remove(item);
            }}
            Select={(item) => {
              body_style_add(item);
            }}
          />
        </div>
        <DropdownSearch
          InputDisable={true}
          label="سازنده"
          search_place_holder="در سازنده‌ها"
          data={BrandList}
          defaultVal={Brand_id_name}
          clearField={() => {
            setBrand_id(null);
            FilterContext.setDataForSearch({
              brand_id: { status: false, value: null },
            });
          }}
          callClearFieldReset={() => {
            setBrand_Name_ComponentReset(false);
          }}
          callClearField={Brand_Name_ComponentReset}
          Select={(i) => {
            setBrand_id(i.value);
            setModelList([]);
            getModelList(i.value);
            setCar_id_name("");
            // add brand_id filter to the filter context
            FilterContext.setDataForSearch({
              car_id: { status: false, value: null },
              brand_id: { status: true, value: i.value, name: i.text },
            });
          }}
          browserDropdown={true}
        />
        <DropdownSearch
          InputDisable={true}
          disabled={!Brand_id ? true : false}
          label="نام مدل"
          search_place_holder="در نام مدل‌ها"
          defaultVal={car_id_name}
          data={ModelList}
          callClearFieldReset={() => {
            setCar_Name_ComponentReset(false);
          }}
          callClearField={car_Name_ComponentReset}
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
              car_id: { status: true, value: i.value, name: i.text },
            });
          }}
          browserDropdown={true}
        />
        {show_filter ? (
          <div className="result_count_wrapper">
            <h2
              className="ResultCount"
              onClick={() => {
                document.body.style.overflow = "unset";
                setShow_filter(false);
                props.show_filter_prop_reset();
              }}
            >
              {props.extra_info.length === 0 ? (
                <Spinner display="block" color="#fff" width={28} />
              ) : (
                `نمایش ${props.ResultCount.total_count} خودرو`
              )}
            </h2>
          </div>
        ) : null}
      </section>
    </>
  );
};

interface IFilter {
  // list of car body style
  extra_info: any;
  ResultCount: any;
  reset?: any;
  clearReset?: any;
  show_filter_prop: boolean;
  show_filter_prop_reset: any;
  initialFilterValues: any;
}

export default Filters;
