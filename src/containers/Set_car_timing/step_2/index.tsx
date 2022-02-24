import { useEffect, useReducer, useState, useContext } from "react";
import { IoIosCar, IoIosCalendar } from "react-icons/io";
import dynamic from "next/dynamic";

// import "./step_2.scss";
import {
  REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING,
  REQUEST_GET_RENTAL_CAR_AVAILABILITIES,
  REQUEST_GET_RENTAL_CAR_DISCOUNTS,
  REQUEST_SET_CAR_AVAILABILITY,
  REQUEST_SET_CAR_DISCOUNT,
  REQUEST_SET_CAR_PARTIAL,
} from "../../../API";
import net_CTX from "../../../context/internetConnectionCTX";
import languageCTX from "../../../context/languageCTX";

const Radio = dynamic(() => import("../../../components/form/Radio"));
const Button = dynamic(() => import("../../../components/form/Button"));
const Counter = dynamic(() => import("../../../components/Counter"));
const DiscountBox = dynamic(() => import("../DiscountBox"));
const DropdownSearch = dynamic(() =>
  import("../../../components/form/Dropdown")
);
// import Radio from "../../../components/form/Radio";
import TextInput from "../../../components/form/TextInput";
import Checkbox from "../../../components/form/Checkbox";
// import Button from "../../../components/form/Button";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";
import validator from "validator";
import Spinner from "../../../components/Spinner";
import Modal_context from "../../../context/Modal_context";
import context_user from "../../../context/User_info";
// import Counter from "../../../components/Counter";
import PriceBox from "../PriceBox";
// import DiscountBox from "../DiscountBox";
// import DropdownSearch from "../../../components/form/Dropdown";
import carThumbnail from "../../../../public/image/car-image-thumbnail.jpg";
import NumbersAndCurrencyUnit from "../../../../utils/NumbersAndCurrencyUnit";
import roundup from "../../../../utils/roundup";
import Toast_context from "../../../context/Toast_context";
import ErrorHelper from "../../../../utils/error_helper";
import { dynamicString } from '../../../helpers/dynamicString';

const stateReducer = (current, action) => {
  switch (action.type) {
    case "id":
      return { ...current, id: action.id };
    case "location":
      return { ...current, location: action.location };
    case "owner_id":
      return { ...current, owner_id: action.owner_id };
    case "days_to_get_reminded":
      return { ...current, days_to_get_reminded: action.days_to_get_reminded };
    case "ADD_days_to_get_reminded":
      return {
        ...current,
        days_to_get_reminded: current.days_to_get_reminded + 1,
      };
    case "REDUCE_days_to_get_reminded":
      return {
        ...current,
        days_to_get_reminded: current.days_to_get_reminded - 1,
      };
    case "min_days_to_rent":
      return { ...current, min_days_to_rent: action.min_days_to_rent };
    case "ADD_min_days_to_rent":
      return { ...current, min_days_to_rent: current.min_days_to_rent + 1 };
    case "REDUCE_min_days_to_rent":
      return { ...current, min_days_to_rent: current.min_days_to_rent - 1 };
    case "max_km_per_day":
      return { ...current, max_km_per_day: action.max_km_per_day };
    case "extra_km_price":
      return { ...current, extra_km_price: action.extra_km_price };
    case "extra_hour_price":
      return { ...current, extra_hour_price: action.extra_hour_price };
    case "deliver_at_renters_place":
      return {
        ...current,
        deliver_at_renters_place: action.deliver_at_renters_place,
      };
    case "driver_status":
      return { ...current, driver_status: action.driver_status };
    case "with_driver":
      return {
        ...current,
        with_driver: action.with_driver,
      };
    case "price_per_day":
      return {
        ...current,
        price_per_day: action.price_per_day,
      };
    case "cancellation_policy":
      return {
        ...current,
        cancellation_policy: action.cancellation_policy,
      };
    case "registration_plate_first_part":
      return {
        ...current,
        registration_plate_first_part: action.registration_plate_first_part,
      };
    case "registration_plate_second_part":
      return {
        ...current,
        registration_plate_second_part: action.registration_plate_second_part,
      };
    case "registration_plate_third_part":
      return {
        ...current,
        registration_plate_third_part: action.registration_plate_third_part,
      };
    case "registration_plate_forth_part":
      return {
        ...current,
        registration_plate_forth_part: action.registration_plate_forth_part,
      };
    case "is_out_of_service":
      return { ...current, is_out_of_service: action.is_out_of_service };
    default:
      throw new Error("There is a problem!");
  }
};

const error_reducer = (current, action) => {
  switch (action.type) {
    case "id":
      return {
        ...current,
        id: action.id,
        error_message: action.error_message,
      };
    case "max_km_per_day":
      return {
        ...current,
        max_km_per_day: action.max_km_per_day,
        error_message: action.error_message,
      };
    case "extra_km_price":
      return {
        ...current,
        extra_km_price: action.extra_km_price,
        error_message: action.error_message,
      };
    case "driver_status":
      return {
        ...current,
        driver_status: action.driver_status,
        error_message: action.error_message,
      };
    case "extra_hour_price":
      return {
        ...current,
        extra_hour_price: action.extra_hour_price,
        error_message: action.error_message,
      };
    case "days_to_get_reminded":
      return {
        ...current,
        days_to_get_reminded: action.days_to_get_reminded,
        error_message: action.error_message,
      };
    case "min_days_to_rent":
      return {
        ...current,
        min_days_to_rent: action.min_days_to_rent,
        error_message: action.error_message,
      };
    case "price_per_day":
      return {
        ...current,
        price_per_day: action.price_per_day,
        error_message: action.error_message,
      };
    case "price_range":
      return {
        ...current,
        price_range: action.price_range,
        error_message: action.error_message,
      };
    case "discount_error":
      return {
        ...current,
        discount_error: action.discount_error,
        error_message: action.error_message,
      };
    case "cancellation_policy":
      return {
        ...current,
        cancellation_policy: action.cancellation_policy,
        error_message: action.error_message,
      };
    case "error_message":
      return {
        ...current,
        error_message: action.error_message,
      };
    default:
      throw new Error("There is a problem!");
  }
};

const Add_Car_Step_2 = ({ language }: IAdd_Car_Step_2) => {
  const [DateAndPrice, setDateAndPrice] = useState(1);
  const [driver_status, setDriver_status] = useState(1);
  const [initialAvailabilityList, setInitialAvailabilityList] = useState([]);
  const [availabilityList, setAvailabilityList] = useState([]);

  const [initialDiscountList, setInitialDiscountList] = useState([]);
  const [discountList, setDiscountList] = useState([]);

  const [showDiscount, setShowDiscount] = useState(0);

  const [initialImage, setInitialImage] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [heightController, setheightController] = useState(0);

  const [Loading, setLoading] = useState(false);
  const [Brand_Name, setBrand_Name] = useState(null);
  const [CarModelName, setCarModelName] = useState(null);
  const [recommendationPrice, setRecommendationPrice] = useState(null);
  const [year, setYear] = useState(null);
  const [Edit, setEdit] = useState(false);
  const [insurance_amount, setInsurance_amount] = useState("");

  const [ErrorState, ErrorDispatch] = useReducer(error_reducer, {
    id: false,
    max_km_per_day: false,
    extra_km_price: false,
    extra_hour_price: false,
    days_to_get_reminded: false,
    deliver_at_renters_place: false,
    with_driver: false,
    driver_status: false,
    is_out_of_service: false,
    min_days_to_rent: false,
    price_per_day: false,
    price_range: false,
    discount_error: false,
    cancellation_policy: false,
    error_message: null,
  });

  const [state, dispatch] = useReducer(stateReducer, {
    id: null,
    location: null,
    owner_id: null,
    registration_plate_first_part: "",
    registration_plate_second_part: null,
    registration_plate_third_part: "",
    registration_plate_forth_part: "",
    max_km_per_day: 250,
    extra_km_price: "",
    extra_hour_price: "",
    driver_status: 1,
    days_to_get_reminded: 0,
    deliver_at_renters_place: 1,
    with_driver: 0,
    is_out_of_service: false,
    min_days_to_rent: 1,
    price_per_day: "",
    cancellation_policy: "",
  });
  const MODAL_CONTEXT = useContext(Modal_context);
  const TOAST_CONTEXT = useContext(Toast_context);
  const router = useRouter();
  const user = useContext(context_user);
  const token = user.data?.token;
  const [checkbox_list, setCheckbox_list] = useState([]);
  const netCTX = useContext(net_CTX);
  const { activeLanguage } = useContext(languageCTX);

  useEffect(() => {
    scrollTo(0, 0);
    getCarInfoToEdit(router.query.car_id);
    setEdit(router.query.mode === 'edit' )
  }, []);

  const getCarInfoToEdit = async (id) => {
    let user_token;
    if (token) {
      user_token = token;
    } else {
      user_token = jsCookie.get("token");
    }
    try {
      const car_info_res = await REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING({
        id: id,
        token: user_token,
      });
      SetCar(car_info_res);
      const car_availability_res: any = await REQUEST_GET_RENTAL_CAR_AVAILABILITIES(
        { id: id, token: user_token }
      );
      if (car_availability_res.length > 0) {
        // get a list of available time to rent
        AvailabilityController(car_availability_res);
      }
      // get a list of discounts
      const car_discount_res: any = await REQUEST_GET_RENTAL_CAR_DISCOUNTS({
        id: id,
        token: user_token,
      });
      if (car_discount_res.length > 0) {
        setShowDiscount(1);
        setDiscountList(car_discount_res);
        setInitialDiscountList(car_discount_res);
      }
    } catch (error) {
      if (error === 111) {
        netCTX.toggleTheContainer(true);
      }
    }
  };

  const AvailabilityController = (data) => {
    // if car is available with same price all the time
    if (data[0].is_all_time) {
      setDateAndPrice(1);
      dispatch({
        type: "price_per_day",
        price_per_day: data[0].price_per_day,
      });
    }
     else {
      // if the car have a range for price
      setDateAndPrice(2);
      setInitialAvailabilityList(data);
    }
  };

  const SetCar = (car) => {
    // SET CAR ID
    dispatch({ type: "id", id: car.id });

    dispatch({ type: "location", location: car.location.name });

    // SET OWNER ID
    dispatch({ type: "owner_id", owner_id: car.owner.id });

    // SET CAR DAYS TO GET REMINDED
    dispatch({
      type: "days_to_get_reminded",
      days_to_get_reminded: car.days_to_get_reminded,
    });

    // SET CAR MIN DAYS TO RENT
    dispatch({
      type: "min_days_to_rent",
      min_days_to_rent: car.min_days_to_rent,
    });

    // SET CAR MAX km PER DAY
    if (car.max_km_per_day && car.extra_km_price) {
      dispatch({
        type: "max_km_per_day",
        max_km_per_day: car.max_km_per_day,
      });
      dispatch({
        type: "extra_km_price",
        extra_km_price: car.extra_km_price,
      });
    }
    // SET CAR MAX km PER DAY
    if (car.extra_hour_price) {
      dispatch({
        type: "extra_hour_price",
        extra_hour_price: car.extra_hour_price,
      });
    }

    // SET CAR OUT OF SERVICE
    // if (Router.router.query?.newcaradded === "true") {
    //   dispatch({
    //     type: "is_out_of_service",
    //     is_out_of_service: true,
    //   });
    // } else {
    dispatch({
      type: "is_out_of_service",
      is_out_of_service: car.is_out_of_service,
    });
    // }

    // SET CAR YEAR
    setYear(car.year.name);

    // SET CAR WITH DRIVER

    if (car.with_driver && car.without_driver) {
      dispatch({
        type: "driver_status",
        driver_status: 3,
      });
    } else if (car.with_driver) {
      dispatch({
        type: "driver_status",
        driver_status: 2,
      });
    } else if (car.without_driver) {
      dispatch({
        type: "driver_status",
        driver_status: 1,
      });
    } else {
      dispatch({
        type: "driver_status",
        driver_status: 3,
      });
    }

    // SET CAR DELIVER AT RENTERS PLACE
    dispatch({
      type: "deliver_at_renters_place",
      deliver_at_renters_place: car.deliver_at_renters_place ? 1 : 0,
    });

    // SET PELAK VALUES
    dispatch({
      type: "registration_plate_first_part",
      registration_plate_first_part: car.registration_plate_first_part,
    });
    dispatch({
      type: "registration_plate_second_part",
      registration_plate_second_part: car.registration_plate_second_part,
    });
    dispatch({
      type: "registration_plate_third_part",
      registration_plate_third_part: car.registration_plate_third_part,
    });
    dispatch({
      type: "registration_plate_forth_part",
      registration_plate_forth_part: car.registration_plate_forth_part,
    });

    if (car.has_media) {
      setInitialImage(car.media_set[0].thumbnail_url);
      setImageHeight(car.media_set[0].thumbnail_height);
    } else setInitialImage(carThumbnail);

    // estimate the daily price for rent base on car value
    let eachDaily = car.value * 0.0015;
    // #FIXME
    // Go to the join us calender and timing component and change the coefficient there to
    // #REVIEW
    //  Round the daily value before calculating monthly and weekly income
    let Round = Math.ceil(eachDaily / 10) * 10;
    setRecommendationPrice(Round);

    // SET CAR CANCELLATION POLICY
    dispatch({
      type: "cancellation_policy",
      cancellation_policy: car.cancellation_policy,
    });

    // EXTRA INFO
    setCarModelName(car.car.name);
    setBrand_Name(car.car.brand.name);
  };

  const submitHandler = async (e, state) => {
    e.preventDefault();
    setLoading(true);
    if (validation(state)) {
      try {
        if (DateAndPrice === 1) {
          await REQUEST_SET_CAR_AVAILABILITY({
            token,
            rental_car_id: state.id,
            data: JSON.stringify([
              {
                rental_car_id: state.id,
                is_all_time: 1,
                price_per_day: state.price_per_day,
                status_id: "available",
              },
            ]),
          });
        } else {
          await REQUEST_SET_CAR_AVAILABILITY({
            token,
            rental_car_id: state.id,
            data: JSON.stringify(availabilityList),
          });
        }

        // if (discountList.length > 0) {
        await REQUEST_SET_CAR_DISCOUNT({
          token,
          rental_car_id: state.id,
          data: JSON.stringify(discountList),
        });
        // }
        // remove the car id from storage
        jsCookie.remove("new_car");
        const partial_car_res = await REQUEST_SET_CAR_PARTIAL({
          id: state.id,
          deliver_at_renters_place: state.deliver_at_renters_place,
          with_driver:
            state.driver_status === 2 || state.driver_status === 3
              ? true
              : false,
          without_driver:
            state.driver_status === 1 || state.driver_status === 3
              ? true
              : false,
          max_km_per_day: state.max_km_per_day,
          extra_km_price: state.extra_km_price,
          extra_hour_price: state.extra_hour_price,
          cancellation_policy: state.cancellation_policy.trim(),
          days_to_get_reminded: state.days_to_get_reminded,
          min_days_to_rent: state.min_days_to_rent,
          is_out_of_service: state.is_out_of_service,
          token: token,
        });
        localStorage.removeItem("red_dot");
        if (router.query?.newcaradded === "true") {
          window["dataLayer"].push({
            event: "conversions",
            action: "new_car",
            pagePath: "/set-car-timing",
            pageURL: window.location.href,
            car_id: state.id,
            label: state.location,
          });
          TOAST_CONTEXT.toast_option({
            message: dynamicString([CarModelName[activeLanguage]], language.CAR_SETTING.toast),
            time: 20,
            autoClose: true,
          });
          router.push(
            { pathname: "/user/[id]?newcaradded=true`" },
            `/user/${state.owner_id}?newcaradded=true`
          );
        } else {
          router.push({ pathname: "/user/[id]" }, `/user/${state.owner_id}`);
        }
      } catch (error) {
        setLoading(false);
        if (error === 111) {
          netCTX.toggleTheContainer(true);
        } else
          TOAST_CONTEXT.toast_option({
            message: error.response
              ? ErrorHelper({
                errorObj: error.response,
                _400Message: language.COMMON.errorInSubmittingCar,
              })
              : error,
            color: "#ed9026",
            time: 0,
            autoClose: false,
          });
      }
    } else setLoading(false);
  };

  // receive the Reducer type and reset the error status
  const resetTheErrorStatus = (value_name) => {
    if (value_name === "error_message") {
      ErrorDispatch({
        type: value_name,
        error_message: null,
      });
    } else {
      ErrorDispatch({
        type: value_name,
        [value_name]: null,
        error_message: null,
      });
    }
  };

  const validation = (state) => {
    if (!state.id) {
      ErrorDispatch({
        type: "id",
        id: true,
        error_message: language.CAR_SETTING.error1,
      });
      return false;
    } else {
      resetTheErrorStatus("id");
    }
    if (DateAndPrice === 1 && state.price_per_day === "") {
      ErrorDispatch({
        type: "price_per_day",
        price_per_day: true,
        error_message: language.CAR_SETTING.error2,
      });
      return false;
    } else if (DateAndPrice === 1 && +state.price_per_day < 50000) {
      ErrorDispatch({
        type: "price_per_day",
        price_per_day: true,
        error_message: language.CAR_SETTING.error3,
      });
      return false;
    } else {
      resetTheErrorStatus("price_per_day");
    }
    // Commented for a while ***
    if (DateAndPrice === 2 && availabilityList.length === 0) {
      ErrorDispatch({
        type: "price_range",
        price_range: true,
        error_message: "لطفا نرخ اجاره را وارد کنید",
      });
      return false;
    } else {
      resetTheErrorStatus("price_range");
    }
    if (state.days_to_get_reminded < 0) {
      ErrorDispatch({
        type: "days_to_get_reminded",
        days_to_get_reminded: true,
        error_message: language.CAR_SETTING.error4,
      });
      return false;
    } else {
      resetTheErrorStatus("days_to_get_reminded");
    }
    if (state.min_days_to_rent === 0) {
      ErrorDispatch({
        type: "min_days_to_rent",
        min_days_to_rent: true,
        error_message: language.CAR_SETTING.error5,
      });
      return false;
    } else {
      resetTheErrorStatus("min_days_to_rent");
    }
    if (state.max_km_per_day === "") {
      ErrorDispatch({
        type: "max_km_per_day",
        max_km_per_day: true,
        error_message: language.CAR_SETTING.error6,
      });
      return false;
    } else {
      resetTheErrorStatus("max_km_per_day");
    }
    if (state.extra_km_price === "") {
      ErrorDispatch({
        type: "extra_km_price",
        extra_km_price: true,
        error_message: language.CAR_SETTING.error7,
      });
      return false;
    } else if (+state.extra_km_price < 100) {
      ErrorDispatch({
        type: "extra_km_price",
        extra_km_price: true,
        error_message: language.CAR_SETTING.error8,
      });
      return false;
    } else {
      resetTheErrorStatus("extra_km_price");
    }
    if (state.extra_hour_price === "") {
      ErrorDispatch({
        type: "extra_hour_price",
        extra_hour_price: true,
        error_message: language.CAR_SETTING.error12,
      });
      return false;
    } else if (+state.extra_hour_price < 100) {
      ErrorDispatch({
        type: "extra_hour_price",
        extra_hour_price: true,
        error_message: language.CAR_SETTING.error13,
      });
      return false;
    } else {
      resetTheErrorStatus("extra_hour_price");
    }
    if (showDiscount !== 0 && discountList.length === 0) {
      ErrorDispatch({
        type: "discount_error",
        discount_error: true,
        error_message: language.CAR_SETTING.error9,
      });
      return false;
    } else {
      resetTheErrorStatus("discount_error");
    }

    if (!state.cancellation_policy) {
      ErrorDispatch({
        type: "cancellation_policy",
        cancellation_policy: true,
        error_message: language.CAR_SETTING.error10,
      });
      return false;
    } else if (state.cancellation_policy.trim() === "") {
      ErrorDispatch({
        type: "cancellation_policy",
        cancellation_policy: true,
        error_message: language.CAR_SETTING.error10,
      });
      return false;
    } else {
      resetTheErrorStatus("cancellation_policy");
    }
    return true;
  };

  const addToAvailabilityList = (data, edit = false) => {
    // get the data and add new item to avail list
    /**
     * @edit
     *  if a item edited update that in the array
     */
    if (edit) {
      setAvailabilityList(data);
    } else {
      // otherwise add new item to list
      setAvailabilityList((availabilityList) =>
        availabilityList.concat({
          start_date: data.start_date,
          end_date: data.end_date,
          price_per_day: data.price_per_day,
          status_id: "available",
        })
      );
    }
  };

  const removeFromAvailabilityList = (i) => {
    // remove an item from avail list
    setAvailabilityList((availabilityList) =>
      availabilityList.filter((_, index) => {
        return index !== i;
      })
    );
  };

  /**
   *
   * @param edit
   * if it's edit mode update the list
   * @param data
   * if it's new item add that to the list
   */
  const addToDiscountList = (data, edit = false) => {
    if (edit) {
      setDiscountList(data);
    } else {
      setDiscountList((districtList) => districtList.concat(data));
    }
  };

  // remove the given index from the lisr
  const removeFromDiscountList = (i) => {
    setDiscountList((discountList) =>
      discountList.filter((_, index) => {
        return index !== i;
      })
    );
  };

  return (
    <article className="responsive step_2_form_container" dir={activeLanguage === "fa" ? 'rtl' : 'ltr'}>
      <div className="step_2_main_container">
        <div className="pageTitle">
          {/* <IoIosCalendar className="car_icon" size="3.3rem" color="#4ba3ce" /> */}
          <h3>{language.CAR_SETTING.title}</h3>

          <div className="pelak_container">
            <p className="car_name_brand">
              <IoIosCar className="car_icon" size="2.3rem" color="#313131" />
              {Brand_Name ? (
                `${Brand_Name[activeLanguage]} - ${CarModelName[activeLanguage]}`
              ) : (
                <span className="carName_placeHoler Gradient"></span>
              )}
            </p>
            {/* {year && <p>{year}</p>} */}
            <div className="licence_number">
              <p>{state.registration_plate_forth_part}</p>
              <p>|</p>
              <p>{state.registration_plate_third_part}</p>
              <p>{state.registration_plate_second_part}</p>
              <p>{state.registration_plate_first_part}</p>
            </div>
          </div>
        </div>
        <form onSubmit={(e) => submitHandler(e, state)}>
          <div className="add_car_form_step_2">
            <h4 className="extra_text">
              {language.CAR_SETTING.rentPrice}
              <span> {language.CAR_SETTING.daily}</span>
            </h4>
            <div
              // className="Set_Price_date_options"
              className={ Edit?[
                "transition_type_Label",
                ErrorState.transmission_type_id ? "Error_color" : null
              ].join(" ") : 'Set_Price_date_options'}
            >
              {/* toggle between same price for all time and custom range of price  */}
              {Edit ?<Radio
              name="DateAndPrice"
              error_status={ErrorState.price_per_day}
              SelectHandler={(i) => {
                setDateAndPrice(+i);
                if (i !== "1") {
                  dispatch({
                    type: "extra_km_price",
                    extra_km_price: "",
                  });
                }
              }}
              defaultCheck={DateAndPrice}
              data={[
                {
                  label: "موجود در تمام تاریخ‌ها با قیمت یکسان",
                  value: 1,
                },
                {
                  label: "موجود در بازه‌های زمانی مختلف با قیمت‌های متفاوت",
                  value: 2,
                },
              ]}
            />:null}
            </div>
            {DateAndPrice === 1 ? (
              <> 
            <div className="custom_input_container_step_2 daily_price_container">
              <TextInput
                name="price_per_day"
                number={true}
                onChangeHandler={(e) => {
                  if (ErrorState.price_per_day) {
                    ErrorDispatch({
                      type: "price_per_day",
                      price_per_day: false,
                      error_message: "",
                    });
                  }
                  dispatch({
                    type: "price_per_day",
                    price_per_day: e,
                  });
                  let each_hour = roundup(e / 24);
                  if (each_hour > 100) {
                    // let firstTwo: string | number = `${each_hour}`.slice(0, 2);
                    // let restOfIt = `${each_hour}`.slice(2, 3);
                    // if (+restOfIt > 5) {
                    //   firstTwo = +firstTwo + 1;
                    // }
                    // let hour_price = `${firstTwo}${"0".repeat(
                    //   `${each_hour}`.length - 2
                    // )}`;
                    dispatch({
                      type: "extra_hour_price",
                      extra_hour_price: each_hour,
                    });
                  }
                  if (state.max_km_per_day) {
                    dispatch({
                      type: "extra_km_price",
                      extra_km_price: roundup(+e / state.max_km_per_day),
                    });
                  }
                }}
                clearField={() =>
                  dispatch({
                    type: "price_per_day",
                    price_per_day: "",
                  })
                }
                error={{
                  status: ErrorState.price_per_day,
                  message: "",
                }}
                autoFocus={false}
                // min={4}
                max={10}
                showTail={true}
                tail_value={`${NumbersAndCurrencyUnit({
                  value: state.price_per_day,
                  locale: activeLanguage
                })} ${language.COMMON.toman}`}
                placeholder={language.CAR_SETTING.pricePlaceholder}
                value={state.price_per_day}
                validation={{
                  number: true,
                  min: 50000,
                  required: true,
                  messages: {
                    required: language.CAR_SETTING.error14,
                    min: language.CAR_SETTING.error15,
                  },
                }}
              />
              {recommendationPrice ? (
                <p className="our_recommendation">
                  {`${language.CAR_SETTING.recommendation
                    } ${recommendationPrice.toLocaleString()}`}{" "}
                  {language.COMMON.tomanPerDay}
                </p>
              ) : (
                <p className="our_recommendation_placeHoler Gradient"></p>
              )}
            </div>
            {state.price_per_day.length > 3 && (
                <p>
                  اجاره خودرو شما در تمام روز ها با قیمت{" "}
                  {Number(state.price_per_day).toLocaleString()} تومان است
                </p>
              )}
            </> 
            ) : ( 
            Edit ?<PriceBox
              initialAvailabilityList={initialAvailabilityList}
              addAvailList={addToAvailabilityList}
              removeAvailList={removeFromAvailabilityList}
              error={ErrorState.price_range}
            />:null
          )}
            {/* <h4 className="extra_text">شرایط اجاره</h4> */}

            <div className="custom_input_container_step_2 DropDown_extra_km">
              <DropdownSearch
                language={language}
                label={language.COMMON.kmLimitInDay}
                InputDisable={true}
                error_status={ErrorState.max_km_per_day}
                data={[
                  { value: 100, name: { fa: 100, en: 100 } },
                  { value: 150, name: { fa: 150, en: 150 } },
                  { value: 200, name: { fa: 200, en: 200 } },
                  { value: 250, name: { fa: 250, en: 250 } },
                  { value: 300, name: { fa: 300, en: 300 } },
                ]}
                disableSearch={true}
                defaultVal={state.max_km_per_day}
                // clearField={() => {
                //   dispatch({
                //     type: "max_km_per_day",
                //     max_km_per_day: "",
                //   });
                //   dispatch({
                //     type: "extra_km_price",
                //     extra_km_price: "",
                //   });
                // }}
                Select={(i) => {
                  dispatch({
                    type: "max_km_per_day",
                    max_km_per_day: i.value,
                  });
                  if (DateAndPrice === 1 && state.price_per_day) {
                    dispatch({
                      type: "extra_km_price",
                      extra_km_price: Math.floor(
                        +state.price_per_day / i.value
                      ),
                    });
                  }
                }}
              />
              <span className="tail_text">{language.COMMON.kmInDay}</span>
            </div>
            <div className="custom_input_container_step_2 extra_km_price_container">
              <TextInput
                name="extra_km_price"
                number={true}
                autoFocus={false}
                onChangeHandler={(e) => {
                  if (ErrorState.extra_km_price) {
                    ErrorDispatch({
                      type: "extra_km_price",
                      extra_km_price: false,
                      error_message: "",
                    });
                  }
                  dispatch({
                    type: "extra_km_price",
                    extra_km_price: e,
                  });
                }}
                clearField={() =>
                  dispatch({
                    type: "extra_km_price",
                    extra_km_price: "",
                  })
                }
                error={{
                  status: ErrorState.extra_km_price,
                  message: null,
                }}
                // min={4}
                max={7}
                placeholder={language.CAR_SETTING.limitPlaceholder}
                showTail={true}
                tail_value={`${NumbersAndCurrencyUnit({
                  value: state.extra_km_price,
                  locale: activeLanguage
                })} ${language.COMMON.toman}`}
                value={state.extra_km_price}
                label={language.COMMON.extraKm}
                validation={{
                  number: true,
                  required: true,
                  min: 100,
                  messages: {
                    required: language.CAR_SETTING.error16,
                    min: language.CAR_SETTING.error18,
                  },
                }}
              />
            </div>
            <div className="custom_input_container_step_2 extra_km_price_container">
              <TextInput
                name="extra_hour_price"
                number={true}
                autoFocus={false}
                onChangeHandler={(e) => {
                  if (ErrorState.extra_hour_price) {
                    ErrorDispatch({
                      type: "extra_hour_price",
                      extra_hour_price: false,
                      error_message: "",
                    });
                  }
                  dispatch({
                    type: "extra_hour_price",
                    extra_hour_price: e,
                  });
                }}
                clearField={() =>
                  dispatch({
                    type: "extra_hour_price",
                    extra_hour_price: "",
                  })
                }
                error={{
                  status: ErrorState.extra_hour_price,
                  message: null,
                }}
                // min={4}
                max={7}
                placeholder={language.CAR_SETTING.limitPlaceholder}
                showTail={true}
                tail_value={`${NumbersAndCurrencyUnit({
                  value: state.extra_hour_price,
                  locale: activeLanguage
                })} ${language.COMMON.toman}`}
                value={state.extra_hour_price}
                label={language.CAR_SETTING.extraHour}
                validation={{
                  number: true,
                  required: true,
                  min: 100,
                  messages: {
                    required: language.CAR_SETTING.error17,
                    min: language.CAR_SETTING.error18,
                  },
                }}
              />
            </div>
            {/* <Counter
              max={31}
              min={0}
              AddTo={() => dispatch({ type: "ADD_days_to_get_reminded" })}
              reduceTo={() => dispatch({ type: "REDUCE_days_to_get_reminded" })}
              label={language.reminded_me}
              text={language.severl_days}
              value={state.days_to_get_reminded}
            /> */}
            <Counter
              max={31}
              min={1}
              AddTo={() => dispatch({ type: "ADD_min_days_to_rent" })}
              reduceTo={() => dispatch({ type: "REDUCE_min_days_to_rent" })}
              label={language.CAR_SETTING.minimumDuration}
              text={language.COMMON.day}
              value={state.min_days_to_rent}
            />
            <div className="driver_satus">
              <label>{language.CAR_SETTING.rentCondition}</label>
              <p>{language.CAR_SETTING.note}</p>
              <Radio
                name="driver_status"
                error_status={ErrorState.driver_status}
                SelectHandler={(i) => {
                  // setDriver_status(+i);
                  dispatch({
                    type: "driver_status",
                    driver_status: +i,
                  });
                }}
                defaultCheck={state.driver_status}
                data={[
                  {
                    label: language.CAR_SETTING.withoutDriver,
                    value: 1,
                  },
                  {
                    label: language.CAR_SETTING.withDriver,
                    value: 2,
                  },
                  {
                    label: language.CAR_SETTING.bothCondition,
                    value: 3,
                  },
                ]}
              />
            </div>
            <label>{language.CAR_SETTING.delivetyType}</label>
            <Checkbox
              initialValue={[state.deliver_at_renters_place]}
              data={[
                {
                  name: { fa: language.CAR_SETTING.delivery, en: language.CAR_SETTING.delivery },
                  value: state.deliver_at_renters_place,
                },
              ]}
              name="deliver_at_renters_place"
              clearField={() =>
                dispatch({
                  type: "deliver_at_renters_place",
                  deliver_at_renters_place: 0,
                })
              }
              Select={() => {
                dispatch({
                  type: "deliver_at_renters_place",
                  deliver_at_renters_place: 1,
                });
              }}
            />
            {/* <Checkbox
              initialValue={[state.with_driver]}
              data={[
                {
                  text: language.with_driver,
                  value: state.with_driver,
                },
              ]}
              name='with_driver'
              clearField={() => {
                dispatch({
                  type: "with_driver",
                  with_driver: 0,
                });
              }}
              Select={() => {
                dispatch({
                  type: "with_driver",
                  with_driver: 1,
                });
              }}
            /> */}
          </div>
          <div className="add_car_form_step_2">
            <h4 className="extra_text">{language.CAR_SETTING.discounts}</h4>
            {/* DiscountBox component  */}
            <DiscountBox
              language={language}
              initialDiscountList={initialDiscountList}
              addDiscount={addToDiscountList}
              removeDiscountList={removeFromDiscountList}
              showDiscount={showDiscount}
              setShowBox={(v) => setShowDiscount(v)}
              discountCheck={setShowDiscount}
              error={ErrorState.discount_error}
            />
          </div>
          <div className="add_car_form_step_2">
            <h4 className="extra_text">{language.CAR_SETTING.conditions}</h4>
            <div className="cancelation_items_container">
              {/* <div className="deposit_container">
              <p>ودیعه نقدی به مبلغ</p>
              <TextInput
                name="insurance_amount"
                number={true}
                autoFocus={false}
                onChangeHandler={(e) => {
                  setInsurance_amount(e);
                }}
                clearField={() => setInsurance_amount("")}
                error={{
                  status: false,
                  message: null,
                }}
                // min={4}
                max={15}
                placeholder="مثال: 1,000,000"
                value={insurance_amount}
                Input_onBlur={() => {
                  if (insurance_amount)
                    dispatch({
                      type: "cancellation_policy",
                      cancellation_policy: state.cancellation_policy
                        ? `${
                            state.cancellation_policy
                          }\nودیعه نقدی به مبلغ ${Number(
                            insurance_amount
                          ).toLocaleString()} تومان`
                        : `ودیعه به مبلغ ${Number(
                            insurance_amount
                          ).toLocaleString()} تومان`,
                    });
                }}
              />
              <p>تومان</p>
            </div> */}
              <Checkbox
                initialValue={checkbox_list}
                data={[
                  {
                    name: { fa: "گواهینامه معتبر", en: "Valid License Driver" },
                    value: 1,
                  },
                  {
                    name: { fa: "بیمه‌نامه اجاره خودرو سپریس", en: 'Sepris Car Insurance' },
                    value: 2,
                  },
                  {
                    name: { fa: "چک یا سفته به مبلغ ماشین", en: 'چک یا سفته به مبلغ ماشین' },
                    value: 3,
                  },
                  {
                    name: { fa: "ودیعه نقدی به مبلغ:", en: 'Cash deposit:' },
                    value: 4,
                  },
                ]}
                name="deliver_at_renters_place"
                clearField={(item) => {
                  let checkListInstance = null;
                  setCheckbox_list((checkbox_list) => {
                    checkListInstance = checkbox_list.concat(item);
                    return checkListInstance;
                  });
                  dispatch({
                    type: "cancellation_policy",
                    cancellation_policy: state.cancellation_policy
                      ? `${state.cancellation_policy}\n${checkListInstance[checkListInstance.length - 1].name[activeLanguage]
                      }`
                      : `${checkListInstance[checkListInstance.length - 1].name[activeLanguage]
                      }`,
                  });
                }}
                Select={(item) => {
                  let checkListInstance = null;
                  setCheckbox_list((checkbox_list) => {
                    checkListInstance = checkbox_list.concat(item);
                    return checkListInstance;
                  });
                  dispatch({
                    type: "cancellation_policy",
                    cancellation_policy: state.cancellation_policy
                      ? `${state.cancellation_policy}\n${checkListInstance[checkListInstance.length - 1].name[activeLanguage]
                      }`
                      : `${checkListInstance[checkListInstance.length - 1].name[activeLanguage]
                      }`,
                  });
                }}
              />
            </div>
            <textarea
              className={[
                "text_area_step_2",
                ErrorState.cancellation_policy ? "inputError" : null,
              ].join(" ")}
              value={state.cancellation_policy}
              onChange={(e) => {
                if (ErrorState.cancellation_policy) {
                  ErrorDispatch({
                    type: "cancellation_policy",
                    cancellation_policy: false,
                    error_message: "",
                  });
                }
                ErrorDispatch({
                  type: "cancellation_policy",
                  cancellation_policy: false,
                  error_message: "",
                });
                dispatch({
                  type: "cancellation_policy",
                  cancellation_policy: e.target.value,
                });
              }}
              placeholder={language.CAR_SETTING.cancellationPolicies}
            />
            <label>
              <span
                onClick={() => MODAL_CONTEXT.modalHandler("Assurance")}
                className="anchorTagInStep2"
              >
                {language.CAR_SETTING.requirements}
              </span>
            </label>
            <Button
              value={language.COMMON.submit}
              loading={Loading}
              disable={Loading}
              class="Blue_BTN local_style HEAP_SetCarTiming_Btn_Submit"
              click={() => { }}
            />
            {ErrorState.error_message ? (
              <p className="Error_message_text">{ErrorState.error_message}</p>
            ) : null}
          </div>
        </form>
      </div>
    </article>
  );
};
interface IAdd_Car_Step_2 {
  language: any;
}

export default Add_Car_Step_2;
