import React, { useState } from "react";
import TextInput from "../../../components/form/TextInput";
import DropdownSearch from "../../../components/form/Dropdown";

const DiscountBox = (props: IDiscountBox) => {
  const [discount_percent, setDiscount_percent] = useState("");
  const [DiscountList, setDiscountList] = useState([]);
  const [days_limit, setDays_limit] = useState(null);

  const daysFarsi = [
    { key: "1", value: "1", text: "۱ روز" },
    { key: "2", value: "2", text: "۲ روز" },
    { key: "3", value: "3", text: "۳ روز" },
    { key: "4", value: "4", text: "۴ روز" },
    { key: "5", value: "5", text: "۵ روز" },
    { key: "6", value: "6", text: "۶ روز" },
    { key: "7", value: "7", text: "۷ روز" },
    { key: "8", value: "8", text: "۸ روز" },
    { key: "9", value: "9", text: "۹ روز" },
    { key: "10", value: "10", text: "۱۰ روز" },
    { key: "11", value: "11", text: "۱۱ روز" },
    { key: "12", value: "12", text: "۱۲ روز" },
    { key: "13", value: "13", text: "۱۳ روز" },
    { key: "14", value: "14", text: "۱۴ روز" },
    { key: "15", value: "15", text: "۱۵ روز" },
    { key: "16", value: "16", text: "۱۶ روز" },
    { key: "17", value: "17", text: "۱۷ روز" },
    { key: "18", value: "18", text: "۱۸ روز" },
    { key: "19", value: "19", text: "۱۹ روز" },
    { key: "20", value: "20", text: "۲۰ روز" },
    { key: "21", value: "21", text: "۲۱ روز" },
    { key: "22", value: "22", text: "۲۲ روز" },
    { key: "23", value: "23", text: "۲۳ روز" },
    { key: "24", value: "24", text: "۲۴ روز" },
    { key: "25", value: "25", text: "۲۵ روز" },
    { key: "26", value: "26", text: "۲۶ روز" },
    { key: "27", value: "27", text: "۲۷ روز" },
    { key: "28", value: "28", text: "۲۸ روز" },
    { key: "29", value: "29", text: "۲۹ روز" },
    { key: "30", value: "30", text: "۳۰ روز" }
  ];

  return (
    <div className="Price_form_container">
      <DropdownSearch
        data={daysFarsi}
        clearField={() => {
          setDays_limit(null);
        }}
        label="بیشتر از"
        disableSearch={true}
        InputDisable={true}
        Select={e => {
          setDays_limit(e.value);
        }}
      />
      <TextInput
        name="price"
        label="درصد تخفیف"
        error={{
          status: false,
          message: ""
        }}
        value={discount_percent}
        number={true}
        autoFocus={false}
        clearField={() => {
          setDiscount_percent("");
        }}
        min={1}
        max={2}
        onChangeHandler={e => {
          setDiscount_percent(e);
        }}
      />
      <p
        onClick={() => {
          setDiscountList(DiscountList =>
            DiscountList.concat({
              days_limit: days_limit,
              discount_percent: discount_percent
            })
          );
        }}
      >
        ثبت
      </p>
      <div>
        {DiscountList.map(item => {
          return (
            <p>
              از
              {days_limit} هست {discount_percent}
            </p>
          );
        })}
      </div>
    </div>
  );
};

interface IDiscountBox {}

export default DiscountBox;
