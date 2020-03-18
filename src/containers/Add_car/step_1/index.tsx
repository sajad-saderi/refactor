import React, { useEffect, useReducer, useState } from "react";
import { IoIosCar } from "react-icons/io";
import "./step_1.module.scss";
import DropdownSearch from "../../../components/form/Dropdown";
import {
  REQUEST_GET_LOCATION,
  REQUEST_GET_CAR_BRAND,
  REQUEST_GET_YEAR,
  REQUEST_GET_CAR_MODEL
} from "../../../API";
import Radio from "../../../components/form/Radio";
const stateReducer = (current, action) => {
  switch (action.type) {
    case "location_id":
      return { ...current, location_id: action.location_id };
    case "car_id":
      return { ...current, car_id: action.car_id };
    case "year_id":
      return { ...current, year_id: action.year_id };
    case "transmission_type_id":
      return { ...current, transmission_type_id: action.transmission_type_id };
    default:
      throw new Error("There is a problem!");
  }
};

const Add_Car_Step_1 = () => {
  const [locationList, setLocationList] = useState([]);
  const [showDistrict, setShowDistrict] = useState(true);
  const [districtList, setDistrictList] = useState([]);
  const [BrandList, setBrandList] = useState([]);
  const [ModelList, setModelList] = useState([]);
  const [YearList, setYearList] = useState([]);

  const [state, dispatch] = useReducer(stateReducer, {
    location_id: 1,
    id: null,
    car_id: null,
    year_id: null,
    transmission_type_id: null,
    body_style_id: null,
    mileage_range_id: null,
    color_id: null,
    special_type_id: null,
    // vin: null,
    registration_plate_first_part: null,
    registration_plate_second_part: null,
    registration_plate_third_part: null,
    registration_plate_forth_part: null,
    days_to_get_reminded: null,
    min_days_to_rent: null,
    capacity: null,
    deliver_at_renters_place: null,
    facility_id: null,
    description: null,
    media_id: null,
    cylinder_id: null,
    value: null
  });

  useEffect(() => {
    getInitials();
  }, []);

  const getInitials = async () => {
    const location_Res: any = await REQUEST_GET_LOCATION();
    const car_brand_Res: any = await REQUEST_GET_CAR_BRAND();
    const year_Res: any = await REQUEST_GET_YEAR();
    setLocationList(location_Res.data);
    setBrandList(car_brand_Res.carBrands);
    setYearList(year_Res.data);
  };

  const submitHandler = e => {
    e.preventDefault();
  };
  console.log(state);

  const getModelList = async i => {
    const car_model_res: any = await REQUEST_GET_CAR_MODEL(i);
    setModelList(car_model_res.data);
  };

  const getDistricts = async parent_id => {
    const car_districts_res: any = await REQUEST_GET_LOCATION(parent_id);
    setDistrictList(car_districts_res.data);
  };

  return (
    <article className="responsive">
      <div className="pageTitle">
        <IoIosCar className="car_icon" size="6rem" color="#4ba3ce" />
        <h3>افزودن خودرو</h3>
      </div>
      <form className="add_car_form_step_1" onSubmit={submitHandler}>
        <p>مشخصات خودرو را با مطابق با مدارک آن پر کنید. </p>

        <DropdownSearch
          label="ماشین شما کجاست؟"
          data={locationList}
          clearField={() => {}}
          Select={i => {
            if (i.value === 1) setShowDistrict(true);
            else setShowDistrict(false);
            dispatch({ type: "location_id", location_id: i.value });
            if (i.value === 1) getDistricts(i.value);
          }}
        />
        {showDistrict && (
          <DropdownSearch
            label="محله"
            data={districtList}
            clearField={() => {}}
            Select={i =>
              dispatch({ type: "location_id", location_id: i.value })
            }
          />
        )}
        <div>
          <DropdownSearch
            label="برند"
            data={BrandList}
            clearField={() => {}}
            Select={i => {
              getModelList(i.value);
            }}
          />
          <DropdownSearch
            label="مدل"
            data={ModelList}
            clearField={() => {}}
            Select={i => dispatch({ type: "car_id", car_id: i.value })}
          />
          <DropdownSearch
            label="سال"
            data={YearList}
            clearField={() => {}}
            Select={i => dispatch({ type: "year_id", year_id: i.value })}
          />
        </div>
        <Radio
          name="transmission_type_id"
          SelectHandler={i =>
            dispatch({
              type: "transmission_type_id",
              transmission_type_id: i
            })
          }
          data={[
            { label: "دنده دستی", value: 2, checked: null },
            { label: "دنده اتوماتیک", value: 1, checked: null }
          ]}
        />
        <p>{state.location_id}</p>
      </form>
    </article>
  );
};

export default Add_Car_Step_1;
