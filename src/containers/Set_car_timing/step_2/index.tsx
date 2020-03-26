import React, { useEffect, useReducer, useState, useRef } from "react";
import { IoIosCalendar } from "react-icons/io";
import "./step_2.module.scss";
import DropdownSearch from "../../../components/form/Dropdown";
import {
  REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING,
  REQUEST_GET_RENTAL_CAR_AVAILABILITIES,
  REQUEST_GET_RENTAL_CAR_DISCOUNTS,
  REQUEST_GET_LOCATION,
  REQUEST_GET_CAR_BRAND,
  REQUEST_GET_YEAR,
  REQUEST_GET_CAR_MODEL,
  REQUEST_GET_CAR_BODY_STYLE,
  REQUEST_GET_CAR_CYLINDER,
  REQUEST_GET_CAR_FACILITIES,
  REQUEST_GET_CAR_COLORS,
  REQUEST_GET_MODEL_INFO,
  REQUEST_ADD_NEW_CAR
} from "../../../API";
import Radio from "../../../components/form/Radio";
import TextInput from "../../../components/form/TextInput";
import pelak from "../../../../public/image/pelak.png";
import Checkbox from "../../../components/form/Checkbox";
import ImageUploader from "../../../components/ImageUploader";
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
        days_to_get_reminded: current.days_to_get_reminded + 1
      };
    case "REDUCE_days_to_get_reminded":
      return {
        ...current,
        days_to_get_reminded: current.days_to_get_reminded - 1
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
        deliver_at_renters_place: action.deliver_at_renters_place
      };
    case "with_driver":
      return {
        ...current,
        with_driver: action.with_driver
      };
    case "price_per_day":
      return {
        ...current,
        price_per_day: action.price_per_day
      };
    case "cancellation_policy":
      return {
        ...current,
        cancellation_policy: action.cancellation_policy
      };

    case "location_id":
      return { ...current, location_id: action.location_id };
    case "car_id":
      return { ...current, car_id: action.car_id };
    case "year_id":
      return { ...current, year_id: action.year_id };
    case "transmission_type_id":
      return { ...current, transmission_type_id: action.transmission_type_id };
    case "body_style_id":
      return { ...current, body_style_id: action.body_style_id };
    case "cylinder_id":
      return { ...current, cylinder_id: action.cylinder_id };
    case "capacity":
      return { ...current, capacity: action.capacity };
    case "mileage_range_id":
      return { ...current, mileage_range_id: action.mileage_range_id };
    case "value":
      return { ...current, value: action.value };
    case "registration_plate_first_part":
      return {
        ...current,
        registration_plate_first_part: action.registration_plate_first_part
      };
    case "registration_plate_second_part":
      return {
        ...current,
        registration_plate_second_part: action.registration_plate_second_part
      };
    case "registration_plate_third_part":
      return {
        ...current,
        registration_plate_third_part: action.registration_plate_third_part
      };
    case "registration_plate_forth_part":
      return {
        ...current,
        registration_plate_forth_part: action.registration_plate_forth_part
      };
    case "facility_id":
      return {
        ...current,
        facility_id: current.facility_id.concat(action.facility_id)
      };
    case "empty_facility_id":
      return {
        ...current,
        facility_id: action.empty_facility_id
      };
    case "Remove_facility_id":
      return {
        ...current,
        facility_id: current.facility_id.filter(item => {
          return item !== action.remove_id;
        })
      };
    case "media_id":
      return {
        ...current,
        media_id: current.media_id.concat(action.media_id)
      };
    case "Remove_media_id":
      return {
        ...current,
        media_id: current.media_id.filter(item => {
          return item !== action.Remove_media_id;
        })
      };
    case "color_id":
      return { ...current, color_id: action.color_id };
    case "description":
      return { ...current, description: action.description };
    case "is_out_of_service":
      return { ...current, is_out_of_service: action.is_out_of_service };
    case "min_days_to_rent":
      return { ...current, min_days_to_rent: action.min_days_to_rent };
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
        error_message: action.error_message
      };
    case "car_id":
      return {
        ...current,
        car_id: action.car_id,
        error_message: action.error_message
      };
    case "year_id":
      return {
        ...current,
        year_id: action.year_id,
        error_message: action.error_message
      };
    case "transmission_type_id":
      return {
        ...current,
        transmission_type_id: action.transmission_type_id,
        error_message: action.error_message
      };
    case "body_style_id":
      return {
        ...current,
        body_style_id: action.body_style_id,
        error_message: action.error_message
      };
    case "cylinder_id":
      return {
        ...current,
        cylinder_id: action.cylinder_id,
        error_message: action.error_message
      };
    case "capacity":
      return {
        ...current,
        capacity: action.capacity,
        error_message: action.error_message
      };
    case "mileage_range_id":
      return {
        ...current,
        mileage_range_id: action.mileage_range_id,
        error_message: action.error_message
      };
    case "value":
      return {
        ...current,
        value: action.value,
        error_message: action.error_message
      };
    case "registration_plate_first_part":
      return {
        ...current,
        registration_plate_first_part: action.registration_plate_first_part,
        error_message: action.error_message
      };
    case "registration_plate_second_part":
      return {
        ...current,
        registration_plate_second_part: action.registration_plate_second_part,
        error_message: action.error_message
      };
    case "registration_plate_third_part":
      return {
        ...current,
        registration_plate_third_part: action.registration_plate_third_part,
        error_message: action.error_message
      };
    case "registration_plate_forth_part":
      return {
        ...current,
        registration_plate_forth_part: action.registration_plate_forth_part,
        error_message: action.error_message
      };
    case "facility_id":
      return {
        ...current,
        facility_id: action.facility_id,
        error_message: action.error_message
      };
    case "media_id":
      return {
        ...current,
        media_id: action.media_id,
        error_message: action.error_message
      };
    case "color_id":
      return {
        ...current,
        color_id: action.color_id,
        error_message: action.error_message
      };
    case "error_message":
      return {
        ...current,
        error_message: action.error_message
      };
    default:
      throw new Error("There is a problem!");
  }
};

const Add_Car_Step_2 = () => {
  const [DateAndPrice, setDateAndPrice] = useState(1);

  const [locationList, setLocationList] = useState([]);
  const [locationName, setLocationName] = useState(null);
  const [showDistrict, setShowDistrict] = useState(false);
  const [DistrictName, setDistrictName] = useState(null);
  const [districtList, setDistrictList] = useState([]);
  const [BrandList, setBrandList] = useState([]);
  const [Brand_id, setBrand_id] = useState(null);
  const [Brand_id_error, setBrand_id_error] = useState(null);
  const [Brand_Name, setBrand_Name] = useState("");
  const [ModelList, setModelList] = useState([]);
  const [CarModelName, setCarModelName] = useState("");
  const [YearList, setYearList] = useState([]);
  const [YearName, setYearName] = useState(null);
  const [BodyStyleList, setBodyStyleList] = useState([]);
  const [BodyStyleName, setBodyStyleName] = useState(null);
  const [cylinderList, setCylinderList] = useState([]);
  const [CylinderName, setCylinderName] = useState(null);
  const [capacityList, setCapacity] = useState([
    { value: 1, text: "۱" },
    { value: 2, text: "۲" },
    { value: 3, text: "۳" },
    { value: 4, text: "۴" },
    { value: 5, text: "۵" },
    { value: 6, text: "۶" },
    { value: 7, text: "۷" },
    { value: 8, text: "۸" },
    { value: 9, text: "۹" },
    { value: 10, text: "۱۰" },
    { value: 11, text: "۱۱" },
    { value: 12, text: "۱۲" },
    { value: 13, text: "۱۳" },
    { value: 14, text: "۱۴" },
    { value: 15, text: "۱۵" },
    { value: 16, text: "۱۶" },
    { value: 17, text: "۱۷" }
  ]);
  const [mileRange, setMileRange] = useState([
    { key: "1", value: "1", text: "۰ - ۵۰٫۰۰۰ کیلومتر" },
    { key: "2", value: "2", text: "۵۰٫۰۰۰ - ۱۰۰٫۰۰۰ کیلومتر" },
    { key: "3", value: "3", text: "۱۰۰٫۰۰۰ - ۲۰۰٫۰۰۰ کیلومتر" },
    { key: "4", value: "4", text: "+۲۰۰٫۰۰۰  کیلومتر" }
  ]);
  const [PelakList, setPelakList] = useState([
    { value: "الف", text: "الف" },
    { value: "ب", text: "ب" },
    { value: "ت", text: "ت" },
    { value: "ج", text: "ج" },
    { value: "د", text: "د" },
    { value: "ژ", text: "ژ" },
    { value: "س", text: "س" },
    { value: "ٌص", text: "ص" },
    { value: "ط", text: "ط" },
    { value: "ق", text: "ق" },
    { value: "گ", text: "گ" },
    { value: "ل", text: "ل" },
    { value: "م", text: "م" },
    { value: "ن", text: "ن" },
    { value: "و", text: "و" },
    { value: "ه", text: "هـ" },
    { value: "ی", text: "ی" }
  ]);
  const [facilitesList, setFacilitesList] = useState([]);
  const [initialImage, setInitialImage] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [colorName, setColorName] = useState(null);
  const [Loading, setLoading] = useState(false);
  // REFs
  const valueRef = useRef(null);
  const pelakRef = useRef(null);

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
    cancellation_policy:null
  });

  const [state, dispatch] = useReducer(stateReducer, {
    id: null,
    location_id: null,
    car_id: null,
    year_id: null,
    transmission_type_id: null,
    capacity: null,
    body_style_id: null,
    mileage_range_id: null,
    color_id: null,
    // vin: null,
    registration_plate_first_part: "",
    registration_plate_second_part: null,
    registration_plate_third_part: "",
    registration_plate_forth_part: "",
    facility_id: [],
    description: null,
    media_id: [],
    cylinder_id: null,
    value: "",
    max_km_per_day: "",
    extra_km_price: "",
    days_to_get_reminded: 1,
    deliver_at_renters_place: false,
    with_driver: false,
    special_type_id: 1,
    is_out_of_service: true,
    min_days_to_rent: 1,
    price_per_day: "",
    discount_persent: [],
    cancellation_policy: ""
  });

  useEffect(() => {
    if (Router.router.query.mode === "edit") {
      getCarInfoToEdit(Router.router.query.car_id);
      getInitials(Router.router.query.car_id);
    } else {
    }
  }, []);

  const getCarInfoToEdit = async id => {
    const car_info_res = await REQUEST_GET_RENTAL_CAR_SET_CAR_TIMING({
      id: id,
      token: token
    });
    SetCar(car_info_res);
    console.log(car_info_res);
  };

  const SetCar = car => {
    // SET CAR ID
    dispatch({ type: "id", id: car.id });

    // SET CAR LOCATION AND DISTRICT
    if (car.location.parent_id === 1) {
      setLocationName("تهران");
      setShowDistrict(true);
      dispatch({ type: "location_id", location_id: car.location.id });
      setDistrictName(car.location.name.fa);
    } else {
      setLocationName(car.location.name.fa);
      setShowDistrict(false);
      dispatch({ type: "location_id", location_id: car.location.id });
    }

    // SET CAR MODEL
    setBrand_id(car.car.brand.id);
    setBrand_Name(car.car.brand.name.fa);
    getModelList(car.car.brand.id);
    dispatch({ type: "car_id", car_id: car.car.id });
    setCarModelName(car.car.name.fa);

    // SET YEAR
    dispatch({ type: "year_id", year_id: car.year.id });
    setYearName(car.year.name.fa);

    // SET TRANSMISSION
    dispatch({
      type: "transmission_type_id",
      transmission_type_id: car.transmission_type.id
    });

    // SET BODY STYLE
    dispatch({
      type: "body_style_id",
      body_style_id: car.body_style.id
    });
    setBodyStyleName(car.body_style.name.fa);

    // SET CYLINDER
    dispatch({
      type: "cylinder_id",
      cylinder_id: car.cylinder.id
    });
    setCylinderName(car.cylinder.name.fa);

    // SET CAPACITY
    dispatch({ type: "capacity", capacity: car.capacity });

    // SET MILE RANGE
    dispatch({
      type: "mileage_range_id",
      mileage_range_id: car.mileage_range.id
    });

    // SET CAR VALUE
    dispatch({
      type: "value",
      value: car.value
    });

    // SET PELAK VALUES
    dispatch({
      type: "registration_plate_first_part",
      registration_plate_first_part: car.registration_plate_first_part
    });
    dispatch({
      type: "registration_plate_second_part",
      registration_plate_second_part: car.registration_plate_second_part
    });
    dispatch({
      type: "registration_plate_third_part",
      registration_plate_third_part: car.registration_plate_third_part
    });
    dispatch({
      type: "registration_plate_forth_part",
      registration_plate_forth_part: car.registration_plate_forth_part
    });

    // SET FACILITIES
    if (car.facility_set.length > 0) {
      car.facility_set.forEach(item => {
        dispatch({ type: "facility_id", facility_id: item.id });
      });
    } else dispatch({ type: "empty_facility_id", empty_facility_id: [] });

    // SET IMAGE UPLOADED
    car.media_set.forEach(item => {
      dispatch({
        type: "media_id",
        media_id: item.id
      });
      setInitialImage(InitialImage =>
        InitialImage.concat({
          img: item.thumbnail_url,
          id: item.id
        })
      );
    });

    // SET COLOR
    dispatch({
      type: "color_id",
      color_id: car.color.id
    });
    setColorName(car.color.name.fa);

    // SET DESCRIPTION
    dispatch({
      type: "description",
      description: car.description
    });

    // SET EXTRA INFO
    dispatch({
      type: "deliver_at_renters_place",
      deliver_at_renters_place: car.deliver_at_renters_place
    });
    dispatch({
      type: "is_out_of_service",
      is_out_of_service: car.is_out_of_service
    });
    dispatch({
      type: "min_days_to_rent",
      min_days_to_rent: car.min_days_to_rent
    });
  };

  const getInitials = async id => {
    const car_availability_res: any = await REQUEST_GET_RENTAL_CAR_AVAILABILITIES(
      { id: id, token: token }
    );
    const car_discount_res = await REQUEST_GET_RENTAL_CAR_DISCOUNTS({
      id: id,
      token: token
    });
    console.log("car_availability_res", car_availability_res, car_discount_res);
    // const car_brand_Res: any = await REQUEST_GET_CAR_BRAND();
    // const year_Res: any = await REQUEST_GET_YEAR();
    // const bodyStyle_res: any = await REQUEST_GET_CAR_BODY_STYLE();
    // const cylinder_res: any = await REQUEST_GET_CAR_CYLINDER();
    // const facilities_res: any = await REQUEST_GET_CAR_FACILITIES();
    // const colorList_res: any = await REQUEST_GET_CAR_COLORS();
    // setBrandList(car_brand_Res.carBrands);
    // setYearList(year_Res.data);
    // setBodyStyleList(bodyStyle_res.data);
    // setCylinderList(cylinder_res.data);
    // setFacilitesList(facilities_res.data);
    // console.log(facilities_res);
    // setColorList(colorList_res.data);
  };

  const submitHandler = async (e, state) => {
    e.preventDefault();
    setLoading(true);
    if (validation(state)) {
      try {
        const add_new_car_res = await REQUEST_ADD_NEW_CAR({
          data: state,
          token: token
        });
      } catch (error) {
        setLoading(false);
      }
    } else setLoading(false);
  };

  const validation = state => {
    if (!validator.isNumeric(`${state.location_id}`) && !showDistrict) {
      ErrorDispatch({
        type: "location_id",
        location_id: true,
        error_message: "لطفا شهر خودرو را انتخاب کنید"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "location_id",
        location_id: null,
        error_message: null
      });
    }
    if (showDistrict) {
      if (state.location_id === 1 || !state.location_id) {
        ErrorDispatch({
          type: "location_id",
          location_id: true,
          error_message: "لطفا محله را انتخاب کنید"
        });
        return false;
      } else {
        ErrorDispatch({
          type: "location_id",
          location_id: null,
          error_message: null
        });
      }
    }
    if (!validator.isNumeric(`${Brand_id}`)) {
      setBrand_id_error(true);
      ErrorDispatch({
        type: "error_message",
        error_message: "لطفا برند را انتخاب کنید"
      });
      return false;
    } else {
      setBrand_id_error(false);
      ErrorDispatch({
        type: "error_message",
        error_message: null
      });
    }
    if (!validator.isNumeric(`${state.car_id}`)) {
      ErrorDispatch({
        type: "car_id",
        car_id: true,
        error_message: "لطفا مدل را انتخاب کنید"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "car_id",
        car_id: null,
        error_message: null
      });
    }
    if (!validator.isNumeric(`${state.year_id}`)) {
      ErrorDispatch({
        type: "year_id",
        year_id: true,
        error_message: " لطفا سال را انتخاب کنید"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "year_id",
        year_id: false,
        error_message: null
      });
    }
    if (!validator.isNumeric(`${state.transmission_type_id}`)) {
      ErrorDispatch({
        type: "transmission_type_id",
        transmission_type_id: true,
        error_message: "لطفا نوع دنده را انتخاب کنید"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "transmission_type_id",
        transmission_type_id: false,
        error_message: null
      });
    }
    if (!validator.isNumeric(`${state.body_style_id}`)) {
      ErrorDispatch({
        type: "body_style_id",
        body_style_id: true,
        error_message: "لطفا نوع دنده را انتخاب کنید"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "body_style_id",
        body_style_id: false,
        error_message: null
      });
    }
    if (!validator.isNumeric(`${state.cylinder_id}`)) {
      ErrorDispatch({
        type: "cylinder_id",
        cylinder_id: true,
        error_message: "لطفا تعداد سیلندر را انتخاب کنید"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "cylinder_id",
        cylinder_id: false,
        error_message: null
      });
    }
    if (!validator.isNumeric(`${state.capacity}`)) {
      ErrorDispatch({
        type: "capacity",
        capacity: true,
        error_message: "لطفا ظرفیت خودرو را انتخاب کنبد"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "capacity",
        capacity: false,
        error_message: null
      });
    }
    if (!validator.isNumeric(`${state.mileage_range_id}`)) {
      ErrorDispatch({
        type: "mileage_range_id",
        mileage_range_id: true,
        error_message: "لطفا کارکرد خودرو را انتخاب کنید"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "mileage_range_id",
        mileage_range_id: false,
        error_message: null
      });
    }
    if (!validator.isNumeric(`${state.value}`)) {
      scrollTo(0, valueRef.current.offsetTop);
      ErrorDispatch({
        type: "value",
        value: true,
        error_message: "لطفا ارزش خودرو را وارد کنید"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "value",
        value: false,
        error_message: null
      });
    }
    if (`${state.registration_plate_first_part}`.length !== 2) {
      scrollTo(0, pelakRef.current.offsetTop);
      ErrorDispatch({
        type: "registration_plate_first_part",
        registration_plate_first_part: true,
        error_message: "بخش نخست شماره پلاک باید ۲ رقم باشد"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "registration_plate_first_part",
        registration_plate_first_part: false,
        error_message: null
      });
    }
    if (!state.registration_plate_second_part) {
      scrollTo(0, pelakRef.current.offsetTop);
      ErrorDispatch({
        type: "registration_plate_second_part",
        registration_plate_second_part: true,
        error_message: "لطفا بخش دوم پلاک را کامل کنید"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "registration_plate_second_part",
        registration_plate_second_part: false,
        error_message: null
      });
    }
    if (`${state.registration_plate_third_part}`.length !== 3) {
      scrollTo(0, pelakRef.current.offsetTop);
      ErrorDispatch({
        type: "registration_plate_third_part",
        registration_plate_third_part: true,
        error_message: "بخش سوم شماره پلاک باید ۳ رقم باشد"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "registration_plate_third_part",
        registration_plate_third_part: false,
        error_message: null
      });
    }
    if (`${state.registration_plate_forth_part}`.length !== 2) {
      scrollTo(0, pelakRef.current.offsetTop);
      ErrorDispatch({
        type: "registration_plate_forth_part",
        registration_plate_forth_part: true,
        error_message: "کد استانی شماره پلاک باید ۲ رقم باشد"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "registration_plate_forth_part",
        registration_plate_forth_part: false,
        error_message: null
      });
    }
    if (state.media_id.length < 1) {
      ErrorDispatch({
        type: "media_id",
        media_id: true,
        error_message: "لطفاً حداقل یک تصویر بارگذاری کنید"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "media_id",
        media_id: false,
        error_message: null
      });
    }
    if (!validator.isNumeric(`${state.color_id}`)) {
      ErrorDispatch({
        type: "color_id",
        color_id: true,
        error_message: "لطفا رنگ خود را انتخاب کنید"
      });
      return false;
    } else {
      ErrorDispatch({
        type: "color_id",
        color_id: false,
        error_message: null
      });
    }
    return true;
  };

  const getModelList = async i => {
    const car_model_res: any = await REQUEST_GET_CAR_MODEL(i);
    setModelList(car_model_res.data);
  };

  const getDistricts = async parent_id => {
    const car_districts_res: any = await REQUEST_GET_LOCATION(parent_id);
    setDistrictList(car_districts_res.data);
  };

  const clearRelativeToModel = () => {
    // RESET ALL BRAND RELATED FIELDS
    dispatch({ type: "capacity", capacity: null });
    dispatch({ type: "transmission_type_id", transmission_type_id: null });
    dispatch({ type: "cylinder_id", cylinder_id: null });
    dispatch({ type: "body_style_id", body_style_id: null });
    dispatch({ type: "empty_facility_id", empty_facility_id: [] });
    setBodyStyleName("");
  };

  const getBrandInfo = async id => {
    clearRelativeToModel();
    const model_info_res: any = await REQUEST_GET_MODEL_INFO(id);
    console.log("model_info_res", model_info_res);
    if (model_info_res.facility_set.length > 0) {
      model_info_res.facility_set.forEach(item => {
        dispatch({ type: "facility_id", facility_id: item.id });
      });
    } else dispatch({ type: "empty_facility_id", empty_facility_id: [] });
    if (model_info_res.capacity)
      dispatch({ type: "capacity", capacity: model_info_res.capacity });
    else dispatch({ type: "capacity", capacity: null });
    if (model_info_res.transmission_type)
      dispatch({
        type: "transmission_type_id",
        transmission_type_id: model_info_res.transmission_type.id
      });
    else
      dispatch({
        type: "transmission_type_id",
        transmission_type_id: null
      });
    if (model_info_res.cylinder) {
      dispatch({
        type: "cylinder_id",
        cylinder_id: model_info_res.cylinder.id
      });
      setCylinderName(model_info_res.cylinder.name.fa);
    } else {
      dispatch({
        type: "cylinder_id",
        cylinder_id: null
      });
      setCylinderName("");
    }
    if (model_info_res.body_style) {
      dispatch({
        type: "body_style_id",
        body_style_id: model_info_res.body_style.id
      });
      setBodyStyleName(model_info_res.body_style.name.fa);
    } else {
      dispatch({
        type: "body_style_id",
        body_style_id: null
      });
      setBodyStyleName("");
    }
  };

  return (
    <article className="responsive step_2_form_container">
      <div className="pageTitle">
        <IoIosCalendar className="car_icon" size="6rem" color="#4ba3ce" />
        <h3>تعیین شرایط اجاره</h3>
      </div>
      <article className="step_2_image_pelak add_car_form_step_2">
        <div className="Image_container">
          {initialImage.length > 0 ? (
            <img src={initialImage[0].img} alt="تصویر کوچک خودرو" />
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
      <form onSubmit={e => submitHandler(e, state)}>
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
              onChangeHandler={e => {
                dispatch({
                  type: "max_km_per_day",
                  max_km_per_day: e
                });
              }}
              clearField={() =>
                dispatch({
                  type: "max_km_per_day",
                  max_km_per_day: ""
                })
              }
              error={{
                status: ErrorState.max_km_per_day,
                message: ""
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
              onChangeHandler={e => {
                dispatch({
                  type: "extra_km_price",
                  extra_km_price: e
                });
              }}
              clearField={() =>
                dispatch({
                  type: "extra_km_price",
                  extra_km_price: ""
                })
              }
              error={{
                status: ErrorState.extra_km_price,
                message: ""
              }}
              min={4}
              max={8}
              value={state.extra_km_price}
              label="هزینه هر کیلومتر اضافه"
            />
            <span className="tail_text">تومان</span>
          </div>
          <Checkbox
            initialValue={[
              {
                value: state.deliver_at_renters_place
              }
            ]}
            data={[
              {
                text: "در محل اجاره‌گیرنده تحویل می‌دهم",
                value: state.deliver_at_renters_place
              }
            ]}
            name="deliver_at_renters_place"
            clearField={item =>
              dispatch({
                type: "deliver_at_renters_place",
                deliver_at_renters_place: item.value
              })
            }
            Select={item => {
              dispatch({
                type: "deliver_at_renters_place",
                deliver_at_renters_place: item.value
              });
            }}
          />
          <Checkbox
            initialValue={[
              {
                value: state.with_driver
              }
            ]}
            data={[
              {
                text: "فقط با راننده اجاره می‌دهم",
                value: state.with_driver
              }
            ]}
            name="with_driver"
            clearField={item =>
              dispatch({
                type: "with_driver",
                with_driver: item.value
              })
            }
            Select={item => {
              dispatch({
                type: "with_driver",
                with_driver: item.value
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
              SelectHandler={i => setDateAndPrice(+i)}
              defaultCheck={DateAndPrice}
              data={[
                {
                  label: "موجود در تمام تاریخ‌ها با قیمت یکسان",
                  value: 1
                },
                {
                  label: "موجود در بازه‌های زمانی مختلف با قیمت‌های متفاوت",
                  value: 2
                }
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
                  onChangeHandler={e => {
                    dispatch({
                      type: "price_per_day",
                      price_per_day: e
                    });
                  }}
                  clearField={() =>
                    dispatch({
                      type: "price_per_day",
                      price_per_day: ""
                    })
                  }
                  label="قیمت روزانه"
                  error={{
                    status: ErrorState.price_per_day,
                    message: ""
                  }}
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
            <PriceBox />
          )}
        </div>
        <div className="add_car_form_step_2">
          <h4 className="extra_text">تخفیف ها</h4>
          <DiscountBox />
          <label>شرایط اجاره و کنسلی</label>
          <textarea
            className="text_area_step_2"
            placeholder="شرایط اجاره و کنسلی"
            value={state.cancellation_policy}
            onChange={e => {
              dispatch({
                type: "cancellation_policy",
                cancellation_policy: e.target.value
              });
            }}
          />
        </div>

        {/* <DropdownSearch
          InputDisable={true}
          error_status={!showDistrict ? ErrorState.location_id : false}
          label="ماشین شما کجاست؟"
          data={locationList}
          defaultVal={locationName}
          clearField={() => {
            dispatch({ type: "location_id", location_id: null });
            setShowDistrict(false);
          }}
          Select={i => {
            if (i.value === 1) setShowDistrict(true);
            else {
              setLocationName(i.text);
              setShowDistrict(false);
            }
            dispatch({ type: "location_id", location_id: i.value });
            if (i.value === 1) getDistricts(i.value);
          }}
        />
        {state.location_id !== 1 &&
          state.location_id !== null &&
          !showDistrict && (
            <p className="extra_text">{`اتولی فعلا فقط در تهران فعال است اما می‌توانید ثبت ماشین‌تان را کامل کنید. به محض اینکه در ${locationName} فعال شویم با هماهنگی شما خودروتان را نمایش می‌دهیم.`}</p>
          )}

        {showDistrict && (
          <DropdownSearch
            error_status={showDistrict ? ErrorState.location_id : false}
            InputDisable={true}
            label="محله"
            defaultVal={DistrictName}
            data={districtList}
            disabled={!showDistrict}
            clearField={() =>
              dispatch({ type: "location_id", location_id: null })
            }
            Select={i =>
              dispatch({ type: "location_id", location_id: i.value })
            }
          />
        )}
        <div className="Car_info_step_1">
          <DropdownSearch
            InputDisable={true}
            error_status={Brand_id_error}
            label="برند"
            defaultVal={Brand_Name}
            data={BrandList}
            clearField={() => {
              setBrand_id(null);
            }}
            Select={i => {
              setBrand_id(i.value);
              setModelList([]);
              getModelList(i.value);
            }}
          />
          <DropdownSearch
            InputDisable={true}
            error_status={ErrorState.car_id}
            disabled={!Brand_id ? true : false}
            defaultVal={CarModelName}
            label="مدل"
            data={ModelList}
            clearField={() => dispatch({ type: "car_id", car_id: null })}
            Select={i => {
              getBrandInfo(i.value);
              dispatch({ type: "car_id", car_id: i.value });
            }}
          />
          <DropdownSearch
            InputDisable={true}
            label="سال"
            error_status={ErrorState.year_id}
            defaultVal={YearName}
            disableSearch={true}
            data={YearList}
            clearField={() => dispatch({ type: "year_id", year_id: null })}
            Select={i => dispatch({ type: "year_id", year_id: i.value })}
          />
        </div>
        <div className="radio_father">
          <label
            className={[
              "transition_type_Label",
              ErrorState.transmission_type_id ? "Error_color" : null
            ].join(" ")}
          >
            نوع دنده
          </label>
          <Radio
            name="transmission_type_id"
            error_status={ErrorState.transmission_type_id}
            SelectHandler={i =>
              dispatch({
                type: "transmission_type_id",
                transmission_type_id: +i
              })
            }
            defaultCheck={state.transmission_type_id}
            data={[
              {
                label: "دنده دستی",
                value: 2
              },
              {
                label: "دنده اتوماتیک",
                value: 1
              }
            ]}
          />
        </div>
        <DropdownSearch
          InputDisable={true}
          error_status={ErrorState.body_style_id}
          label="نوع شاسی"
          data={BodyStyleList}
          disableSearch={true}
          defaultVal={BodyStyleName}
          clearField={() =>
            dispatch({ type: "body_style_id", body_style_id: null })
          }
          Select={i =>
            dispatch({ type: "body_style_id", body_style_id: i.value })
          }
        />
        <DropdownSearch
          InputDisable={true}
          error_status={ErrorState.cylinder_id}
          label="تعداد سیلندر"
          data={cylinderList}
          disableSearch={true}
          defaultVal={CylinderName}
          clearField={() =>
            dispatch({ type: "cylinder_id", cylinder_id: null })
          }
          Select={i => dispatch({ type: "cylinder_id", cylinder_id: i.value })}
        />
        <DropdownSearch
          InputDisable={true}
          error_status={ErrorState.capacity}
          label="ظرفیت خودرو"
          data={capacityList}
          disableSearch={true}
          defaultVal={state.capacity}
          clearField={() => dispatch({ type: "capacity", capacity: null })}
          Select={i => dispatch({ type: "capacity", capacity: i.value })}
        />
        <DropdownSearch
          InputDisable={true}
          error_status={ErrorState.mileage_range_id}
          label="کارکرد خودرو"
          defaultVal={
            state.mileage_range_id
              ? mileRange[state.mileage_range_id - 1].text
              : ""
          }
          data={mileRange}
          disableSearch={true}
          clearField={() =>
            dispatch({ type: "mileage_range_id", mileage_range_id: null })
          }
          Select={i =>
            dispatch({ type: "mileage_range_id", mileage_range_id: i.value })
          }
        />
        <div className="value_container" ref={valueRef}>
          <TextInput
            name="value"
            number={true}
            onChangeHandler={e => {
              dispatch({
                type: "value",
                value: e
              });
            }}
            clearField={() =>
              dispatch({
                type: "value",
                value: ""
              })
            }
            error={{
              status: ErrorState.value,
              message: ""
            }}
            min={7}
            max={14}
            value={state.value}
            label="ارزش خودرو"
          />
          <span>تومان</span>
        </div>
        <div className="pelak_container" ref={pelakRef}>
          <label>پلاک خودرو</label>
          <img src={pelak} alt="تصویر پلاک" />
          <p className="extra_text">
            پلاک خودرو جهت جلوگیری از ثبت خودروی تکراری استفاده می‌شود و در
            نتایج جستجو نمایش داده نمی‌شود.
          </p>
          <div className="pelak_input">
            <div className="pelak_input_box_controller">
              <div className="Fourth_part_pelak">
                <TextInput
                  label="4"
                  name="registration_plate_forth_part"
                  clearField={() =>
                    dispatch({
                      type: "registration_plate_forth_part",
                      registration_plate_forth_part: ""
                    })
                  }
                  HideClearIcon={true}
                  onChangeHandler={e => {
                    dispatch({
                      type: "registration_plate_forth_part",
                      registration_plate_forth_part: e
                    });
                  }}
                  min={2}
                  max={2}
                  autoFocus={false}
                  value={state.registration_plate_forth_part}
                  error={{
                    status: ErrorState.registration_plate_forth_part,
                    message: ""
                  }}
                />
              </div>
              <div className="Third_part_pelak">
                <TextInput
                  label="3"
                  name="registration_plate_third_part"
                  clearField={() =>
                    dispatch({
                      type: "registration_plate_third_part",
                      registration_plate_third_part: ""
                    })
                  }
                  min={3}
                  max={3}
                  HideClearIcon={true}
                  autoFocus={false}
                  value={state.registration_plate_third_part}
                  error={{
                    status: ErrorState.registration_plate_third_part,
                    message: ""
                  }}
                  onChangeHandler={e =>
                    dispatch({
                      type: "registration_plate_third_part",
                      registration_plate_third_part: e
                    })
                  }
                />
              </div>
              <div className="Second_part_pelak">
                <DropdownSearch
                  InputDisable={true}
                  error_status={ErrorState.registration_plate_second_part}
                  data={PelakList}
                  disableSearch={true}
                  defaultVal={state.registration_plate_second_part}
                  clearField={() =>
                    dispatch({
                      type: "registration_plate_second_part",
                      registration_plate_second_part: null
                    })
                  }
                  Select={i =>
                    dispatch({
                      type: "registration_plate_second_part",
                      registration_plate_second_part: i.value
                    })
                  }
                  hideArrowDown={true}
                  hideClearField={true}
                />
              </div>
              <div className="First_part_pelak">
                <TextInput
                  label="1"
                  name="registration_plate_first_part"
                  value={state.registration_plate_first_part}
                  error={{
                    status: ErrorState.registration_plate_first_part,
                    message: ""
                  }}
                  min={2}
                  max={2}
                  HideClearIcon={true}
                  clearField={() =>
                    dispatch({
                      type: "registration_plate_first_part",
                      registration_plate_first_part: ""
                    })
                  }
                  onChangeHandler={e =>
                    dispatch({
                      type: "registration_plate_first_part",
                      registration_plate_first_part: e
                    })
                  }
                  autoFocus={false}
                />
              </div>
            </div>
          </div>
        </div>
        <label className="add_car_Facilities_label">امکانات خودرو</label>
        <Checkbox
          initialValue={state.facility_id}
          data={facilitesList}
          name="facility_id"
          clearField={item =>
            dispatch({
              type: "Remove_facility_id",
              remove_id: item.value
            })
          }
          Select={item => {
            dispatch({
              type: "facility_id",
              facility_id: item.value
            });
          }}
        />
        <ImageUploader
          Upload_image={id => {
            dispatch({
              type: "media_id",
              media_id: id
            });
          }}
          error_status={ErrorState.media_id}
          default_image={initialImage}
          delete_image={id => {
            dispatch({
              type: "Remove_media_id",
              Remove_media_id: id
            });
          }}
        />
        <DropdownSearch
          label="رنگ خودرو"
          error_status={ErrorState.color_id}
          InputDisable={true}
          data={colorList}
          defaultVal={colorName}
          disableSearch={true}
          clearField={() =>
            dispatch({
              type: "color_id",
              color_id: null
            })
          }
          Select={i =>
            dispatch({
              type: "color_id",
              color_id: i.value
            })
          }
        />
        <label>
          توضیحات<span> (اختیاری)</span>
        </label>
        <textarea
          className="text_area_step_1"
          placeholder={
            "برای ماشین‌تان توضیحات جذاب بنویسید تا احتمال اجاره آن بیشتر شود.\nاگر برای اجاره شرایط خاصی، مثل سیگار نکشیدن، دارید می‌توانید اینجا وارد کنید."
          }
          value={state.description}
          onChange={e => {
            dispatch({
              type: "description",
              description: e.target.value
            });
          }}
        /> */}
        <Button
          value="ثبت"
          loading={Loading}
          disable={Loading}
          class="Blue_BTN local_style"
        />
        <p>{ErrorState.error_message}</p>
      </form>
    </article>
  );
};

export default Add_Car_Step_2;
