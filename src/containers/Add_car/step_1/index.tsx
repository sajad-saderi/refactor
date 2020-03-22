import React, { useEffect, useReducer, useState } from "react";
import { IoIosCar } from "react-icons/io";
import "./step_1.module.scss";
import DropdownSearch from "../../../components/form/Dropdown";
import {
  REQUEST_GET_LOCATION,
  REQUEST_GET_CAR_BRAND,
  REQUEST_GET_YEAR,
  REQUEST_GET_CAR_MODEL,
  REQUEST_GET_CAR_BODY_STYLE,
  REQUEST_GET_CAR_CYLINDER,
  REQUEST_GET_CAR_FACILITIES,
  REQUEST_GET_CAR_COLORS,
  REQUEST_GET_MODEL_INFO,
  REQUEST_GET_CAR
} from "../../../API";
import Radio from "../../../components/form/Radio";
import TextInput from "../../../components/form/TextInput";
import pelak from "../../../../public/image/pelak.png";
import Checkbox from "../../../components/form/Checkbox";
import ImageUploader from "../../../components/ImageUploader";
import Button from "../../../components/form/Button";
import Router from "next/router";

const stateReducer = (current, action) => {
  switch (action.type) {
    case "id":
      return { ...current, id: action.id };
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
    default:
      throw new Error("There is a problem!");
  }
};

const Add_Car_Step_1 = () => {
  const [locationList, setLocationList] = useState([]);
  const [locationName, setLocationName] = useState(null);
  const [showDistrict, setShowDistrict] = useState(false);
  const [DistrictName, setDistrictName] = useState(null);
  const [districtList, setDistrictList] = useState([]);
  const [BrandList, setBrandList] = useState([]);
  const [Brand_id, setBrand_id] = useState(null);
  const [Brand_Name, setBrand_Name] = useState(null);
  const [ModelList, setModelList] = useState([]);
  const [CarModelName, setCarModelName] = useState(null);
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
  const [colorList, setColorList] = useState([]);
  const [Loading, setLoading] = useState(false);

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
    special_type_id: null,
    // vin: null,
    registration_plate_first_part: "",
    registration_plate_second_part: null,
    registration_plate_third_part: "",
    registration_plate_forth_part: "",
    days_to_get_reminded: null,
    min_days_to_rent: null,
    deliver_at_renters_place: null,
    facility_id: [],
    description: null,
    media_id: [],
    cylinder_id: null,
    value: ""
  });

  useEffect(() => {
    console.log(Router.router.query);
    if (Router.router.query.mode === "edit") {
      getCarInfoToEdit(Router.router.query.car_id);
    }
    getInitials();
  }, []);

  const getCarInfoToEdit = async id => {
    const car_info_res = await REQUEST_GET_CAR({ id: id });
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
  };

  const getInitials = async () => {
    const location_Res: any = await REQUEST_GET_LOCATION();
    const car_brand_Res: any = await REQUEST_GET_CAR_BRAND();
    const year_Res: any = await REQUEST_GET_YEAR();
    const bodyStyle_res: any = await REQUEST_GET_CAR_BODY_STYLE();
    const cylinder_res: any = await REQUEST_GET_CAR_CYLINDER();
    const facilities_res: any = await REQUEST_GET_CAR_FACILITIES();
    const colorList_res: any = await REQUEST_GET_CAR_COLORS();
    setLocationList(location_Res.data);
    setBrandList(car_brand_Res.carBrands);
    setYearList(year_Res.data);
    setBodyStyleList(bodyStyle_res.data);
    setCylinderList(cylinder_res.data);
    setFacilitesList(facilities_res.data);
    setColorList(colorList_res.data);
  };

  const submitHandler = (e, state) => {
    e.preventDefault();
    // setLoading(true);
    console.log(state);
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
    <article className="responsive add_car_form_container">
      <div className="pageTitle">
        <IoIosCar className="car_icon" size="6rem" color="#4ba3ce" />
        <h3>افزودن خودرو</h3>
      </div>
      <form
        className="add_car_form_step_1"
        onSubmit={e => submitHandler(e, state)}
      >
        <p className="extra_text">
          مشخصات خودرو را با مطابق با مدارک آن پر کنید.{" "}
        </p>
        <DropdownSearch
          InputDisable={true}
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
            defaultVal={YearName}
            disableSearch={true}
            data={YearList}
            clearField={() => dispatch({ type: "year_id", year_id: null })}
            Select={i => dispatch({ type: "year_id", year_id: i.value })}
          />
        </div>
        <div className="radio_father">
          <label className="transition_type_Label">نوع دنده</label>
          <Radio
            name="transmission_type_id"
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
          label="ظرفیت خودرو"
          data={capacityList}
          disableSearch={true}
          defaultVal={state.capacity}
          clearField={() => dispatch({ type: "capacity", capacity: null })}
          Select={i => dispatch({ type: "capacity", capacity: i.value })}
        />
        <DropdownSearch
          InputDisable={true}
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
        <div className="value_container">
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
              status: false,
              message: ""
            }}
            min={7}
            max={14}
            value={state.value}
            label="ارزش خودرو"
          />
          <span>تومان</span>
        </div>
        <div className="pelak_container">
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
                    status: false,
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
                    status: false,
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
                    status: false,
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
          delete_image={id => {
            dispatch({
              type: "Remove_media_id",
              Remove_media_id: id
            });
          }}
        />
        <DropdownSearch
          label="رنگ خودرو"
          InputDisable={true}
          data={colorList}
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
          onChange={e => {
            dispatch({
              type: "description",
              description: e.target.value
            });
          }}
        />
        <Button
          value="ثبت"
          loading={Loading}
          disable={Loading}
          class="Blue_BTN local_style"
        />
      </form>
    </article>
  );
};

export default Add_Car_Step_1;
