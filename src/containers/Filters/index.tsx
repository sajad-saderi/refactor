import { useState, useContext, useEffect, useRef } from "react";
// import PriceSlider from "../../components/filters/PriceSlider";
// import "./Filter.scss";
import dynamic from "next/dynamic";

const Checkbox = dynamic(() => import("../../components/form/Checkbox"));
const DropdownSearch = dynamic(() => import("../../components/form/Dropdown"));
const Spinner = dynamic(() => import("../../components/Spinner"));
// const PriceSlider = dynamic(() =>
//   import("../../components/filters/PriceSlider/PriceSlider")
// );
// import Checkbox from "../../components/form/Checkbox";
import filterContext from "../../context/filter-context";
// import DropdownSearch from "../../components/form/Dropdown";
import { REQUEST_GET_CAR_BRAND, REQUEST_GET_CAR_MODEL } from "../../API";
import { IoIosArrowDown, IoIosOptions, IoMdClose } from "react-icons/io";
// import Spinner from "../../components/Spinner";
import PriceSlider from "../../components/filters/PriceSlider/PriceSlider";
import net_CTX from "../../context/internetConnectionCTX";
import languageCTX from "../../context/languageCTX";
import { dynamicString } from '../../helpers/dynamicString';

let body_style_list = [];

const Filters = ({
  extra_info,
  ResultCount,
  reset,
  clearReset,
  show_filter_prop,
  show_filter_prop_reset,
  initialFilterValues,
  language,
  sliderRange,
  sliderPrice,
}: IFilter) => {
  const [deliver_at_renters_place, setDeliver_at_renters_place] = useState(0);
  const [with_driver, setwith_driver] = useState(0);
  const [without_driver, setwithout_driver] = useState(0);
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
  const [scroll_icon_to_hide, set_scroll_icon_to_hide] = useState(false);
  // const [hidePrice, setHidePrice] = useState(false);

  // const [initialValueMin, setInitialValueMin] = useState(0);
  // const [initialValueMax, setInitialValueMax] = useState(10000000);
  const filter_ref = useRef(null);
  const FilterContext = useContext(filterContext);
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);

  useEffect(() => {
    getBrandCarList();
    filter_ref.current.addEventListener("scroll", checktheposition);
    return () => {
      document.body.style.overflow = "unset";
      body_style_list = [];
    };
  }, []);

  const getBrandCarList = async () => {
    try {
      const car_brand_Res: any = await REQUEST_GET_CAR_BRAND();
      setBrandList(car_brand_Res.carBrands);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
    }
  };

  const getModelList = async (i) => {
    try {
      const car_model_res: any = await REQUEST_GET_CAR_MODEL(i);
      setModelList(car_model_res.data);
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
    }
  };

  useEffect(() => {

    if (extra_info.body_style_id) {
      setbody_style_set(extra_info.body_style_id);
    }
  }, [extra_info]);

  useEffect(() => {
    if (show_filter_prop) {
      setShow_filter(true);
      set_scroll_icon_to_hide(false);
      document.body.style.overflow = "hidden";
    }
  }, [show_filter_prop]);

  // add this filter to the filter context
  const body_style_add = (item) => {
    body_style_list.push(item.value);
    // add body style to the filter context
    FilterContext.setDataForSearch({
      body_style_id: { status: true, value: body_style_list },
    });
  };

  useEffect(() => {
    if (reset) {
      // if (reset.price) {
      // setHidePrice(true);
      // mounter("price");
      // setInitialValueMin(0);
      // setInitialValueMax(10000000);
      // }
      if (reset.deliver_at_renters_place) {
        setDeliver_at_renters_place(0);
        clearReset("deliver_at_renters_place");
      }
      if (reset.with_driver) {
        setwith_driver(0);
        clearReset("with_driver");
      }
      if (reset.without_driver) {
        setwithout_driver(0);
        clearReset("without_driver");
      }
      if (reset.body_style_id) {
        setbody_style_set([]);
        body_style_list = [];
        clearReset("body_style_id");
      }
      if (reset.brand_id) {
        setBrand_Name_ComponentReset(true);
        setBrand_id(null);
        setBrand_id_name("");
        setModelList([]);
        clearReset("brand_id");
      }
      if (reset.car_id) {
        setCar_Name_ComponentReset(true);
        setcar_id(null);
        setCar_id_name("");
        clearReset("car_id");
      }
      //     break;
      //   case reset.with_driver:
      //     break;
      //   case reset.body_style_id:
      //     break;
      //   case reset.deliver_at_renters_place:
      //     break;
      //   case reset.brand_id:
      //     break;
      //   case reset.car_id:
      //     break;
      //   default:
      //     break;
      // }
    }
  }, [reset]);

  // const mounter = (v) => {
  //   if (v === "price") {
  //     const hideTimer = setTimeout(() => {
  //       // setHidePrice(false);
  //       clearTimeout(hideTimer);
  //       clearReset(v);
  //     }, 500);
  //   }
  // };

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
    if (initialFilterValues) {
      // if (initialFilterValues.query.min_price) {
      //   setInitialValueMin(+initialFilterValues.query.min_price);
      // }
      // if (initialFilterValues.query.max_price) {
      //   setInitialValueMax(+initialFilterValues.query.max_price);
      // }
      if (
        initialFilterValues.query.deliver_at_renters_place &&
        initialFilterValues.query.deliver_at_renters_place === "1"
      ) {
        setDeliver_at_renters_place(
          +initialFilterValues.query.deliver_at_renters_place
        );
      }
      if (
        initialFilterValues.query.with_driver &&
        initialFilterValues.query.with_driver === "1"
      ) {
        setwith_driver(+initialFilterValues.query.with_driver);
      }
      if (
        initialFilterValues.query.without_driver &&
        initialFilterValues.query.without_driver === "1"
      ) {
        setwithout_driver(+initialFilterValues.query.without_driver);
      }
      if (initialFilterValues.query.body_style_id) {
        if (
          initialFilterValues.query.body_style_id !== "" &&
          initialFilterValues.query.body_style_id !== "all"
        ) {
          let convertStringToArray = initialFilterValues.query.body_style_id.split(
            ","
          );
          let convertIndexToNumber = convertStringToArray.reduce((s, c) => {
            return s.concat(+c);
          }, []);
          body_style_list = convertIndexToNumber;
        }
      }
      if (initialFilterValues.query.brand_id) {
        if (
          initialFilterValues.query.brand_id !== "" &&
          initialFilterValues.query.brand_id !== "all"
        ) {
          setBrand_id_name(
            initialFilterValues.query.brand_name.replace(/-/g, " ")
          );
          let brand_id = +initialFilterValues.query.brand_id;
          setBrand_id(brand_id);
          getModelList(brand_id);
          if (initialFilterValues.query.car_id) {
            if (
              initialFilterValues.query.car_id !== "" &&
              initialFilterValues.query.car_id !== "all"
            ) {
              setCar_id_name(
                initialFilterValues.query.car_name.replace(/-/g, " ")
              );
            }
          }
        }
      }
    }
  }, [initialFilterValues]);

  const scroll_handler = () => {
    filter_ref.current.scrollTo({ behavior: "smooth", top: 100 });
    set_scroll_icon_to_hide(true);
  };

  const checktheposition = () => {
    if (
      filter_ref.current.scrollTop + 150 >
      filter_ref.current.scrollHeight / 2 - 100
    )
      set_scroll_icon_to_hide(true);
  };

  return (
    <>
      {show_filter && (
        <div
          onClick={() => {
            setShow_filter(false);
            document.body.style.overflow = "unset";
            show_filter_prop_reset();
          }}
          className="with_drawer"
        ></div>
      )}
      <section
        className={[
          "filter_section",
          show_filter ? "show_Filter_section" : null,
        ].join(" ")}
        ref={filter_ref}
        dir={activeLanguage === 'fa' ? 'rtl' : 'ltr'}
      >
        <div className="closeBtnWrapper">
          <span className="bar"></span>
          <div
            className="Close_filter"
            onClick={() => {
              setShow_filter(false);
              show_filter_prop_reset();
              document.body.style.overflow = "unset";
            }}
          >
            {/* <p>بستن</p> */}
            <IoMdClose size="3rem" color="#909090" />
          </div>
        </div>
        {/* {hidePrice ? (
          <Spinner display='block' width={20} color='#737373' />
        ) : ( */}
        {/* <PriceSlider
          sliderRange={sliderRange}
          sliderPrice={sliderPrice}
          // initialValueMin={initialValueMin}
          // initialValueMax={initialValueMax}
        /> */}
        <PriceSlider sliderRange={sliderRange} sliderPrice={sliderPrice} language={language}
          locale={activeLanguage} />
        {/* )} */}
        <div className="rent-options">
          <h3>{language.COMMON.seaction1}</h3>
          <Checkbox
            initialValue={[deliver_at_renters_place]}
            data={[
              {
                text:
                  language.COMMON
                    .deliverAtPlace,
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
                text: language.COMMON.withDeriver,
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
          <Checkbox
            initialValue={[without_driver]}
            data={[
              {
                text: language.COMMON.withoutDriver,
                value: without_driver,
              },
            ]}
            name="without_driver"
            clearField={(item) => {
              FilterContext.setDataForSearch({
                without_driver: { status: false, value: 0 },
              });
              setwithout_driver(0);
            }}
            Select={(item) => {
              // add this filter to the filter context
              FilterContext.setDataForSearch({
                without_driver: { status: true, value: 1 },
              });
              setwithout_driver(1);
            }}
          />
        </div>
        <div className="body_style_type_wrapper">
          <h3>{language.COMMON.bodyStyle}</h3>
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
          language={language}
          label={language.COMMON.company}
          search_place_holder={
            language.COMMON.inCompany
          }
          data={BrandList}
          defaultVal={Brand_id_name}
          clearField={() => {
            setBrand_id(null);
            setBrand_id_name("");
            FilterContext.setDataForSearch({
              brand_id: { status: false, value: null },
              car_id: { status: false, value: null },
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
          language={language}
          disabled={!Brand_id ? true : false}
          label={language.COMMON.modelLabel}
          search_place_holder={
            language.COMMON.inModel
          }
          defaultVal={car_id_name}
          data={ModelList}
          callClearFieldReset={() => {
            setCar_Name_ComponentReset(false);
          }}
          callClearField={car_Name_ComponentReset}
          clearField={() => {
            setcar_id(null);
            setCar_id_name("");
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
            {!scroll_icon_to_hide ? (
              <IoIosArrowDown
                size="2rem"
                color="#909090"
                onClick={scroll_handler}
              />
            ) : null}
            <h2
              className="ResultCount"
              onClick={() => {
                document.body.style.overflow = "unset";
                setShow_filter(false);
                show_filter_prop_reset();
              }}
            >
              {extra_info.length === 0 ? (
                <Spinner display="block" color="#fff" width={28} />
              ) : ResultCount.total_count > 0 ? (
                dynamicString([ResultCount.total_count], language.COMMON.show)
                // `${language.COMMON.show}${ResultCount.total_count}${language.COMMON.filter_section_result_count_wrapper_khodro}`
              ) : (
                language.COMMON.noResult
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
  language: any;
  sliderRange: any;
  sliderPrice: any;
}

export default Filters;
