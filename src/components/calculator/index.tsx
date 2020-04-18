import React, { useEffect, useState } from "react";
import {
  REQUEST_GET_CAR_BRAND,
  REQUEST_GET_CAR_MODEL,
  REQUEST_GET_CAR_PRICE_ESTIMATION,
} from "../../API";
import DropdownSearch from "../form/Dropdown";
import TextInput from "../form/TextInput";
import Button from "../form/Button";
import ShowResult from "./ShowResult/ShowResult";
import Link from "next/link";

const Calculator = (props: ICalculator) => {
  const [brandList, setBrandList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState({
    name: null,
    id: null,
  });
  const [model, setModel] = useState({
    name: null,
    id: null,
  });
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [showCalculateBox, setShowCalculateBox] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const brand_list_res: any = await REQUEST_GET_CAR_BRAND();
    console.log(brand_list_res);

    setBrandList(brand_list_res.carBrands);
  };

  const fetchModelList = async (brand_id) => {
    console.log(brand_id);

    const model_list_res: any = await REQUEST_GET_CAR_MODEL(brand_id);
    setModelList(model_list_res.data);
  };

  const calculator = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (value === "" || !brand.id || !model.id) {
      setLoading(false);
      return;
    }
    const estimation_res = await REQUEST_GET_CAR_PRICE_ESTIMATION({
      car_id: model.id,
      price: value,
    }); 

    setLoading(false);
    setShowCalculateBox(false);
    setDaily(0);
    setWeekly(0);
    setMonthly(0);
    if (+value < 10000000) return;
    let conToNum = Number(value);
    let eachDaily = conToNum * 0.0022;
    let Round = Math.ceil(eachDaily / 10) * 10;
    let eachWeek = Round * 7;
    let eachMonth = Round * 30;
    setDaily(eachDaily);
    setWeekly(eachWeek);
    setMonthly(eachMonth);
  };
  return (
    <>
      {showCalculateBox ? (
        <>
          <h2>چقدر می‌توانید از ماشینتان کسب درآمد کنید؟</h2>
          <p className="title">مشخصات ماشین‌تان را وارد کنید:</p>
          <form data-test-id="form" onSubmit={calculator}>
            <DropdownSearch
              defaultVal={brand.name}
              data={brandList}
              clearField={() =>
                setBrand({
                  id: null,
                  name: null,
                })
              }
              Select={(v) => {
                fetchModelList(v.value);
                // TODO:
                //   if(window.heap){
                //     window.heap.addUserProperties({Calc_Car_Brand: `${e.text}`});
                // }
                setBrand({
                  id: v.value,
                  name: v.text,
                });
              }}
              placeholder="برند"
              InputDisable={true}
            />

            <DropdownSearch
              defaultVal={model.name}
              data={modelList}
              clearField={() => {
                setModel({ id: null, name: null });
              }}
              disabled={!brand.id ? true : false}
              InputDisable={true}
              Select={(v) => {
                // if (window.heap) {
                //   window.heap.addUserProperties({
                //     Calc_Car_Brand: `${e.text}`,
                //   });
                // }
                setModel({ id: v.value, name: v.name });
              }}
              placeholder="مدل"
            />
            <div className="value_container">
              <TextInput
                name="value"
                number={true}
                onChangeHandler={(e) => {
                  setValue(e);
                }}
                clearField={() => setValue("")}
                autoFocus={false}
                error={{
                  status: false,
                  message: "",
                }}
                min={7}
                max={14}
                value={value}
                placeholder="ارزش خودرو"
              />
              <span>تومان</span>
            </div>
            <Button
              value="تخمین درآمد"
              click={() => {}}
              class="Blue_BTN local_Button_joinUs"
              loading={loading}
            />
          </form>
        </>
      ) : (
        <>
          <ShowResult daily={daily} weekly={weekly} monthly={monthly} />

          <div className="addCarnowInlanding">
            <Link href="/add-car">
              <a className="Blue_BTN addCar_top_joinus_a" 
              data-test-id="addCar_top_joinus_a">
                {props.AbText
                  ? "از درخواست‌های اجاره مرتبط باخبر شوید"
                  : "ماشین‌تان را اضافه کنید"}
              </a>
            </Link>
          </div>
          <p
            className="tryAgainCalc"
            onClick={() => {
              window.scrollTo(0, 0);
              setValue("");
              setLoading(false);
              setShowCalculateBox(true);
            }}
          >
            محاسبه مجدد
          </p>
        </>
      )}
    </>
  );
};

interface ICalculator {
  AbText?: string;
}

export default Calculator;
