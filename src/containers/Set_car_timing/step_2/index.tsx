import React, { useEffect, useReducer, useState, useRef } from "react";
import { IoIosCalendar } from "react-icons/io";
import "./step_2.scss";
import {
  REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING,
  REQUEST_GET_RENTAL_CAR_AVAILABILITIES,
  REQUEST_GET_RENTAL_CAR_DISCOUNTS,
  REQUEST_SET_CAR_AVAILABILITY,
  REQUEST_SET_CAR_DISCOUNT,
  REQUEST_SET_CAR_PARTIAL,
} from "../../../API";
import Radio from "../../../components/form/Radio";
import TextInput from "../../../components/form/TextInput";
import Checkbox from "../../../components/form/Checkbox";
import Button from "../../../components/form/Button";
import Router from "next/router";
import jsCookie from "js-cookie";
import validator from "validator";
import PelakView from "../../../components/pelak";
import Spinner from "../../../components/Spinner";
import Counter from "../../../components/Counter";
import PriceBox from "../PriceBox";
import DiscountBox from "../DiscountBox";

const token = jsCookie.get("token");

const stateReducer = (current, action) => {
  switch (action.type) {
    case "id":
      return { ...current, id: action.id };
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
    case "deliver_at_renters_place":
      return {
        ...current,
        deliver_at_renters_place: action.deliver_at_renters_place,
      };
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
    case "location_id":
      return {
        ...current,
        location_id: action.location_id,
        error_message: action.error_message,
      };
    case "car_id":
      return {
        ...current,
        car_id: action.car_id,
        error_message: action.error_message,
      };
    case "year_id":
      return {
        ...current,
        year_id: action.year_id,
        error_message: action.error_message,
      };
    case "transmission_type_id":
      return {
        ...current,
        transmission_type_id: action.transmission_type_id,
        error_message: action.error_message,
      };
    case "body_style_id":
      return {
        ...current,
        body_style_id: action.body_style_id,
        error_message: action.error_message,
      };
    case "cylinder_id":
      return {
        ...current,
        cylinder_id: action.cylinder_id,
        error_message: action.error_message,
      };
    case "capacity":
      return {
        ...current,
        capacity: action.capacity,
        error_message: action.error_message,
      };
    case "mileage_range_id":
      return {
        ...current,
        mileage_range_id: action.mileage_range_id,
        error_message: action.error_message,
      };
    case "value":
      return {
        ...current,
        value: action.value,
        error_message: action.error_message,
      };
    case "registration_plate_first_part":
      return {
        ...current,
        registration_plate_first_part: action.registration_plate_first_part,
        error_message: action.error_message,
      };
    case "registration_plate_second_part":
      return {
        ...current,
        registration_plate_second_part: action.registration_plate_second_part,
        error_message: action.error_message,
      };
    case "registration_plate_third_part":
      return {
        ...current,
        registration_plate_third_part: action.registration_plate_third_part,
        error_message: action.error_message,
      };
    case "registration_plate_forth_part":
      return {
        ...current,
        registration_plate_forth_part: action.registration_plate_forth_part,
        error_message: action.error_message,
      };
    case "facility_id":
      return {
        ...current,
        facility_id: action.facility_id,
        error_message: action.error_message,
      };
    case "media_id":
      return {
        ...current,
        media_id: action.media_id,
        error_message: action.error_message,
      };
    case "color_id":
      return {
        ...current,
        color_id: action.color_id,
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

const Add_Car_Step_2 = () => {
  const [DateAndPrice, setDateAndPrice] = useState(1);
  const [initialAvailabilityList, setInitialAvailabilityList] = useState([]);
  const [availabilityList, setAvailabilityList] = useState([]);

  const [initialDiscountList, setInitialDiscountList] = useState([]);
  const [discountList, setDiscountList] = useState([]);
  const [showDiscount, setShowDiscount] = useState(0);
  const [initialImage, setInitialImage] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Brand_Name, setBrand_Name] = useState(null);
  const [CarModelName, setCarModelName] = useState(null);

  const [ErrorState, ErrorDispatch] = useReducer(error_reducer, {
    location_id: null,
    car_id: null,
    year_id: null,
    transmission_type_id: null,
    capacity: null,
    body_style_id: null,
    mileage_range_id: null,
    color_id: null,
    // vin: null,
    registration_plate_first_part: null,
    registration_plate_second_part: null,
    registration_plate_third_part: null,
    registration_plate_forth_part: null,
    facility_id: null,
    media_id: null,
    cylinder_id: null,
    value: null,
    max_km_per_day: null,
    extra_km_price: null,
    days_to_get_reminded: null,
    min_days_to_rent: null,
    price_per_day: null,
    cancellation_policy: null,
  });

  const [state, dispatch] = useReducer(stateReducer, {
    id: null,
    registration_plate_first_part: "",
    registration_plate_second_part: null,
    registration_plate_third_part: "",
    registration_plate_forth_part: "",
    max_km_per_day: "",
    extra_km_price: "",
    days_to_get_reminded: 0,
    deliver_at_renters_place: 0,
    with_driver: 0,
    is_out_of_service: false,
    min_days_to_rent: 1,
    price_per_day: "",
    cancellation_policy: "",
  });

  useEffect(() => {
    getCarInfoToEdit(Router.router.query.car_id);
    // if (Router.router.query.mode === "edit") {
    // } else {
    //   getInitials(Router.router.query.car_id);
    // }
  }, []);

  const getCarInfoToEdit = async (id) => {
    const car_info_res = await REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING({
      id: id,
      token: token,
    });
    SetCar(car_info_res);
    const car_availability_res: any = await REQUEST_GET_RENTAL_CAR_AVAILABILITIES(
      { id: id, token: token }
    );
    if (car_availability_res.length > 0) {
      AvailabilityController(car_availability_res);
    }
    const car_discount_res: any = await REQUEST_GET_RENTAL_CAR_DISCOUNTS({
      id: id,
      token: token,
    });
    if (car_discount_res.length > 0) {
      setShowDiscount(1);
      setDiscountList(car_discount_res);
      setInitialDiscountList(car_discount_res);
    }
  };

  const AvailabilityController = (data) => {
    if (data[0].is_all_time) {
      setDateAndPrice(1);
      dispatch({
        type: "price_per_day",
        price_per_day: data[0].price_per_day,
      });
    } else {
      setDateAndPrice(2);
      setInitialAvailabilityList(data);
    }
  };

  const SetCar = (car) => {
    // SET CAR ID
    dispatch({ type: "id", id: car.id });

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

    // SET CAR OUT OF SERVICE
    dispatch({
      type: "is_out_of_service",
      is_out_of_service: false,
    });

    // SET CAR WITH DRIVER
    dispatch({
      type: "with_driver",
      with_driver: car.with_driver ? 1 : 0,
    });

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

    setInitialImage(car.media_set[0].thumbnail_url);

    // SET CAR CANCELLATION POLICY
    dispatch({
      type: "cancellation_policy",
      cancellation_policy: car.cancellation_policy,
    });

    // EXTRA INFO
    setBrand_Name(car.car.brand.name.fa);
    setCarModelName(car.car.name.fa);
  };

  const submitHandler = async (e, state) => {
    e.preventDefault();
    // setLoading(true);
    // if (validation(state)) {
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

      if (showDiscount === 1) {
        await REQUEST_SET_CAR_DISCOUNT({
          token,
          rental_car_id: state.id,
          data: JSON.stringify(discountList),
        });
      }
      const partial_car_res = await REQUEST_SET_CAR_PARTIAL({
        id: state.id,
        deliver_at_renters_place: state.deliver_at_renters_place,
        with_driver: state.with_driver,
        max_km_per_day: state.max_km_per_day,
        extra_km_price: state.extra_km_price,
        cancellation_policy: state.cancellation_policy,
        days_to_get_reminded: state.days_to_get_reminded,
        min_days_to_rent: state.min_days_to_rent,
        is_out_of_service: state.is_out_of_service,
        token: token,
      });
    } catch (error) {
      setLoading(false);
    }
    // } else setLoading(false);
  };

  // const validation = (state) => {
  //   if (!validator.isNumeric(`${state.location_id}`) && !showDistrict) {
  //     ErrorDispatch({
  //       type: "location_id",
  //       location_id: true,
  //       error_message: "لطفا شهر خودرو را انتخاب کنید",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "location_id",
  //       location_id: null,
  //       error_message: null,
  //     });
  //   }
  //   if (showDistrict) {
  //     if (state.location_id === 1 || !state.location_id) {
  //       ErrorDispatch({
  //         type: "location_id",
  //         location_id: true,
  //         error_message: "لطفا محله را انتخاب کنید",
  //       });
  //       return false;
  //     } else {
  //       ErrorDispatch({
  //         type: "location_id",
  //         location_id: null,
  //         error_message: null,
  //       });
  //     }
  //   }
  //   if (!validator.isNumeric(`${Brand_id}`)) {
  //     setBrand_id_error(true);
  //     ErrorDispatch({
  //       type: "error_message",
  //       error_message: "لطفا برند را انتخاب کنید",
  //     });
  //     return false;
  //   } else {
  //     setBrand_id_error(false);
  //     ErrorDispatch({
  //       type: "error_message",
  //       error_message: null,
  //     });
  //   }
  //   if (!validator.isNumeric(`${state.car_id}`)) {
  //     ErrorDispatch({
  //       type: "car_id",
  //       car_id: true,
  //       error_message: "لطفا مدل را انتخاب کنید",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "car_id",
  //       car_id: null,
  //       error_message: null,
  //     });
  //   }
  //   if (!validator.isNumeric(`${state.year_id}`)) {
  //     ErrorDispatch({
  //       type: "year_id",
  //       year_id: true,
  //       error_message: " لطفا سال را انتخاب کنید",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "year_id",
  //       year_id: false,
  //       error_message: null,
  //     });
  //   }
  //   if (!validator.isNumeric(`${state.transmission_type_id}`)) {
  //     ErrorDispatch({
  //       type: "transmission_type_id",
  //       transmission_type_id: true,
  //       error_message: "لطفا نوع دنده را انتخاب کنید",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "transmission_type_id",
  //       transmission_type_id: false,
  //       error_message: null,
  //     });
  //   }
  //   if (!validator.isNumeric(`${state.body_style_id}`)) {
  //     ErrorDispatch({
  //       type: "body_style_id",
  //       body_style_id: true,
  //       error_message: "لطفا نوع دنده را انتخاب کنید",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "body_style_id",
  //       body_style_id: false,
  //       error_message: null,
  //     });
  //   }
  //   if (!validator.isNumeric(`${state.cylinder_id}`)) {
  //     ErrorDispatch({
  //       type: "cylinder_id",
  //       cylinder_id: true,
  //       error_message: "لطفا تعداد سیلندر را انتخاب کنید",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "cylinder_id",
  //       cylinder_id: false,
  //       error_message: null,
  //     });
  //   }
  //   if (!validator.isNumeric(`${state.capacity}`)) {
  //     ErrorDispatch({
  //       type: "capacity",
  //       capacity: true,
  //       error_message: "لطفا ظرفیت خودرو را انتخاب کنبد",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "capacity",
  //       capacity: false,
  //       error_message: null,
  //     });
  //   }
  //   if (!validator.isNumeric(`${state.mileage_range_id}`)) {
  //     ErrorDispatch({
  //       type: "mileage_range_id",
  //       mileage_range_id: true,
  //       error_message: "لطفا کارکرد خودرو را انتخاب کنید",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "mileage_range_id",
  //       mileage_range_id: false,
  //       error_message: null,
  //     });
  //   }
  //   if (!validator.isNumeric(`${state.value}`)) {
  //     scrollTo(0, valueRef.current.offsetTop);
  //     ErrorDispatch({
  //       type: "value",
  //       value: true,
  //       error_message: "لطفا ارزش خودرو را وارد کنید",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "value",
  //       value: false,
  //       error_message: null,
  //     });
  //   }
  //   if (`${state.registration_plate_first_part}`.length !== 2) {
  //     scrollTo(0, pelakRef.current.offsetTop);
  //     ErrorDispatch({
  //       type: "registration_plate_first_part",
  //       registration_plate_first_part: true,
  //       error_message: "بخش نخست شماره پلاک باید ۲ رقم باشد",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "registration_plate_first_part",
  //       registration_plate_first_part: false,
  //       error_message: null,
  //     });
  //   }
  //   if (!state.registration_plate_second_part) {
  //     scrollTo(0, pelakRef.current.offsetTop);
  //     ErrorDispatch({
  //       type: "registration_plate_second_part",
  //       registration_plate_second_part: true,
  //       error_message: "لطفا بخش دوم پلاک را کامل کنید",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "registration_plate_second_part",
  //       registration_plate_second_part: false,
  //       error_message: null,
  //     });
  //   }
  //   if (`${state.registration_plate_third_part}`.length !== 3) {
  //     scrollTo(0, pelakRef.current.offsetTop);
  //     ErrorDispatch({
  //       type: "registration_plate_third_part",
  //       registration_plate_third_part: true,
  //       error_message: "بخش سوم شماره پلاک باید ۳ رقم باشد",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "registration_plate_third_part",
  //       registration_plate_third_part: false,
  //       error_message: null,
  //     });
  //   }
  //   if (`${state.registration_plate_forth_part}`.length !== 2) {
  //     scrollTo(0, pelakRef.current.offsetTop);
  //     ErrorDispatch({
  //       type: "registration_plate_forth_part",
  //       registration_plate_forth_part: true,
  //       error_message: "کد استانی شماره پلاک باید ۲ رقم باشد",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "registration_plate_forth_part",
  //       registration_plate_forth_part: false,
  //       error_message: null,
  //     });
  //   }
  //   if (state.media_id.length < 1) {
  //     ErrorDispatch({
  //       type: "media_id",
  //       media_id: true,
  //       error_message: "لطفاً حداقل یک تصویر بارگذاری کنید",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "media_id",
  //       media_id: false,
  //       error_message: null,
  //     });
  //   }
  //   if (!validator.isNumeric(`${state.color_id}`)) {
  //     ErrorDispatch({
  //       type: "color_id",
  //       color_id: true,
  //       error_message: "لطفا رنگ خود را انتخاب کنید",
  //     });
  //     return false;
  //   } else {
  //     ErrorDispatch({
  //       type: "color_id",
  //       color_id: false,
  //       error_message: null,
  //     });
  //   }
  //   return true;
  // };

  const addToAvailabilityList = (data, edit = false) => {
    if (edit) {
      setAvailabilityList(data);
    } else {
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
    setAvailabilityList((availabilityList) =>
      availabilityList.filter((_, index) => {
        return index !== i;
      })
    );
  };

  const addToDiscountList = (data, edit = false) => {
    if (edit) {
      console.log("edit", data);

      setDiscountList(data);
    } else {
      setDiscountList((districtList) => districtList.concat(data));
    }
  };

  const removeFromDiscountList = (i) => {
    setDiscountList((discountList) =>
      discountList.filter((_, index) => {
        return index !== i;
      })
    );
  };

  return (
    <article className="responsive step_2_form_container">
      <div className="pageTitle">
        <IoIosCalendar className="car_icon" size="6rem" color="#4ba3ce" />
        <h3>تعیین شرایط اجاره</h3>
      </div>
      <article className="step_2_image_pelak add_car_form_step_2">
        <div className="Image_container">
          {initialImage ? (
            <img src={initialImage} alt="تصویر کوچک خودرو" />
          ) : (
            <Spinner display="inline-block" width={30} color="#9E9E9E" />
          )}
        </div>
        <div className="pelak_container">
          <p>{`${Brand_Name} - ${CarModelName}`}</p>
          <img />
          <PelakView
            registration_plate_first_part={state.registration_plate_first_part}
            registration_plate_second_part={
              state.registration_plate_second_part
            }
            registration_plate_third_part={state.registration_plate_third_part}
            registration_plate_forth_part={state.registration_plate_forth_part}
          />
        </div>
      </article>
      <form onSubmit={(e) => submitHandler(e, state)}>
        <div className="add_car_form_step_2">
          <h4 className="extra_text">شرایط اجاره</h4>
          <Counter
            max={31}
            min={1}
            AddTo={() => dispatch({ type: "ADD_days_to_get_reminded" })}
            reduceTo={() => dispatch({ type: "REDUCE_days_to_get_reminded" })}
            label="زمان اطلاع از اجاره"
            text="روز قبل"
            value={state.days_to_get_reminded}
          />
          <Counter
            max={31}
            min={1}
            AddTo={() => dispatch({ type: "ADD_min_days_to_rent" })}
            reduceTo={() => dispatch({ type: "REDUCE_min_days_to_rent" })}
            label="حداقل مدت اجاره"
            text="روز"
            value={state.min_days_to_rent}
          />
          <div className="custom_input_container_step_2">
            <TextInput
              name="max_km_per_day"
              number={true}
              autoFocus={false}
              onChangeHandler={(e) => {
                dispatch({
                  type: "max_km_per_day",
                  max_km_per_day: e,
                });
              }}
              clearField={() =>
                dispatch({
                  type: "max_km_per_day",
                  max_km_per_day: "",
                })
              }
              error={{
                status: ErrorState.max_km_per_day,
                message: "",
              }}
              min={2}
              max={5}
              value={state.max_km_per_day}
              label="محدودیت مسافت"
            />
            <span className="tail_text">کیلومتر در روز</span>
          </div>
          <div className="custom_input_container_step_2">
            <TextInput
              name="extra_km_price"
              number={true}
              autoFocus={false}
              onChangeHandler={(e) => {
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
                message: "",
              }}
              min={4}
              max={8}
              value={state.extra_km_price}
              label="هزینه هر کیلومتر اضافه"
            />
            <span className="tail_text">تومان</span>
          </div>
          <Checkbox
            initialValue={[state.deliver_at_renters_place]}
            data={[
              {
                text: "در محل اجاره‌گیرنده تحویل می‌دهم",
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
          <Checkbox
            initialValue={[state.with_driver]}
            data={[
              {
                text: "فقط با راننده اجاره می‌دهم",
                value: state.with_driver,
              },
            ]}
            name="with_driver"
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
          />
        </div>
        <div className="add_car_form_step_2">
          <h4 className="extra_text">تاریخ و نرخ اجاره</h4>
          <div
            className="Set_Price_date_options"
            //   className={[
            //     "transition_type_Label",
            //     ErrorState.transmission_type_id ? "Error_color" : null
            //   ].join(" ")}
          >
            <Radio
              name="DateAndPrice"
              error_status={ErrorState.transmission_type_id}
              SelectHandler={(i) => setDateAndPrice(+i)}
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
            />
            <hr />
          </div>
          {DateAndPrice === 1 ? (
            <>
              <div className="custom_input_container_step_2">
                <TextInput
                  name="price_per_day"
                  number={true}
                  onChangeHandler={(e) => {
                    dispatch({
                      type: "price_per_day",
                      price_per_day: e,
                    });
                  }}
                  clearField={() =>
                    dispatch({
                      type: "price_per_day",
                      price_per_day: "",
                    })
                  }
                  label="قیمت روزانه"
                  error={{
                    status: ErrorState.price_per_day,
                    message: "",
                  }}
                  autoFocus={false}
                  min={4}
                  max={8}
                  value={state.price_per_day}
                />
                <span className="tail_text">تومان</span>
              </div>
              {state.price_per_day.length > 3 && (
                <p>
                  اجاره خودرو شما در تمام روز ها با قیمت{" "}
                  {Number(state.price_per_day).toLocaleString()} تومان است
                </p>
              )}
            </>
          ) : (
            <PriceBox
              initialAvailabilityList={initialAvailabilityList}
              addAvailList={addToAvailabilityList}
              removeAvailList={removeFromAvailabilityList}
            />
          )}
        </div>
        <div className="add_car_form_step_2">
          <h4 className="extra_text">تخفیف ها</h4>
          <DiscountBox
            initialDiscountList={initialDiscountList}
            addDiscount={addToDiscountList}
            removeDiscountList={removeFromDiscountList}
            showDiscount={showDiscount}
            discountCheck={setShowDiscount}
          />
          <label>شرایط اجاره و کنسلی</label>
          <textarea
            className="text_area_step_2"
            placeholder="شرایط اجاره و کنسلی"
            value={state.cancellation_policy}
            onChange={(e) => {
              dispatch({
                type: "cancellation_policy",
                cancellation_policy: e.target.value,
              });
            }}
          />
          <Button
            value="ثبت"
            loading={Loading}
            disable={Loading}
            class="Blue_BTN local_style"
            click={() => {}}
          />
          <p>{ErrorState.error_message}</p>
        </div>
      </form>
    </article>
  );
};

export default Add_Car_Step_2;
