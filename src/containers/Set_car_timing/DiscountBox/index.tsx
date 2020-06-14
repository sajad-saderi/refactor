import React, { useState, useEffect, useRef } from "react";
import TextInput from "../../../components/form/TextInput";
import DropdownSearch from "../../../components/form/Dropdown";
import Checkbox from "../../../components/form/Checkbox";
// import "./DiscountBox.scss";
import { IoMdAdd, IoMdTrash, IoMdCreate } from "react-icons/io";

const DiscountBox = (props: IDiscountBox) => {
  const [discount_percent, setDiscount_percent] = useState("");
  const [Error_discount_percent, setError_discount_percent] = useState({
    status: false,
    message: "",
  });
  const [DiscountList, setDiscountList] = useState([]);
  const [days_limit, setDays_limit] = useState(null);
  const [days_limit_name, setDays_limit_name] = useState(null);
  const [Error_days_limit, setError_days_limit] = useState({
    status: false,
    message: "",
  });
  const [Discountcheck, setDiscountcheck] = useState(0);
  const [mode, setMode] = useState({
    status: false,
    index: null,
  });
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
    { key: "30", value: "30", text: "۳۰ روز" },
  ];
  const DiscountWrapper = useRef(null);

  const onConfirm = (data?, autoFill = false) => {
    // if it's edit mode fill it
    if (autoFill) {
      setDiscountList((DiscountList) =>
        DiscountList.concat({
          days_limit: data.days_limit,
          discount_percent: data.discount_percent,
        })
      );
    } else {
      if (!days_limit) {
        setError_days_limit({
          status: true,
          message: "لطفا تعداد روز را مشخص کنید",
        });
        return;
      }
      setError_days_limit({
        status: false,
        message: "",
      });
      if (discount_percent === "") {
        setError_discount_percent({
          status: true,
          message: "لطفا درصد تخفیف را مشخص کنید",
        });
        return;
      }
      setError_discount_percent({
        status: false,
        message: "",
      });
      // if (mode.status) {
      //   let temp = [...DiscountList];
      //   temp[mode.index] = {
      //     days_limit: days_limit,
      //     discount_percent: discount_percent,
      //   };
      //   setDiscountList(temp);
      //   props.addDiscount(temp, true);
      //   setMode({
      //     status: false,
      //     index: null,
      //   });
      // } else {
      setDiscountList((DiscountList) =>
        DiscountList.concat({
          days_limit: days_limit,
          discount_percent: discount_percent,
        })
      );
      props.addDiscount({
        days_limit: days_limit,
        discount_percent: discount_percent,
      });
      // }
      setDiscount_percent("");
      setDays_limit_name(null);
      setDays_limit(null);
      setDiscountcheck(0);
    }
  };

  useEffect(() => {
    if (props.initialDiscountList) {
      setDiscountcheck(props.showDiscount);
      props.initialDiscountList.forEach((item) => {
        onConfirm(item, true);
      });
      setDiscountcheck(0);
    }
  }, [props.initialDiscountList]);

  useEffect(() => {
    if (props.error) {
      scrollTo(0, DiscountWrapper.current.offsetTop);
    }
  }, [props.error]);

  return (
    <div className="Discount_form_container" ref={DiscountWrapper}>
      <p>می‌توانید برای اجاره‌های با مدت بیشتر تخفیف تعیین کنید</p>
      {Discountcheck === 1 ? (
        <div className="Discount_Controller">
          <div className="containers">
            <DropdownSearch
              data={daysFarsi}
              clearField={() => {
                setDays_limit_name(null);
                setDays_limit(null);
              }}
              label="بیشتر از"
              disableSearch={true}
              error_status={Error_days_limit.status || props.error}
              InputDisable={true}
              defaultVal={days_limit_name}
              Select={(e) => {
                setDays_limit_name(e.text);
                setDays_limit(e.value);
              }}
            />
            {Error_days_limit.status && (
              <p className="input_error_message">{Error_days_limit.message}</p>
            )}
          </div>
          <div className="tail containers">
            <TextInput
              name="price"
              label="درصد تخفیف"
              error={{
                status: Error_discount_percent.status || props.error,
                message: Error_discount_percent.message,
              }}
              value={discount_percent}
              number={true}
              autoFocus={false}
              clearField={() => {
                setDiscount_percent("");
              }}
              min={1}
              max={2}
              onChangeHandler={(e) => {
                setDiscount_percent(e);
              }}
            />
            <span> %</span>
          </div>
          <div className="divs button_box">
            <p className="confirm" onClick={onConfirm}>
              ثبت
            </p>
            <p
              // className="cancel"
              onClick={() => {
                if (mode.status) {
                  onConfirm();
                } else {
                  setMode({
                    status: false,
                    index: null,
                  });
                  setDiscount_percent("");
                  setDays_limit_name(null);
                  setDays_limit(null);
                  setDiscountcheck(0);
                }
                props.setShowBox(0);
              }}
            >
              لغو
            </p>
            {mode.status && (
              <IoMdTrash
                className="Trash_icon_in_price_cart"
                onClick={() => {
                  setMode({
                    status: false,
                    index: null,
                  });
                  setDiscount_percent("");
                  setDays_limit_name(null);
                  setDays_limit(null);
                  setDiscountcheck(0);
                }}
                color="#737373"
                size="2rem"
              />
            )}
          </div>
        </div>
      ) : (
          <div
            className="add_new_one"
            onClick={() => {
              props.setShowBox(1);
              setDiscountcheck(1);
            }}
          >
            <p>
              <IoMdAdd size="2rem" color="#4ba3ce" /> افزودن تخفیف
          </p>
          </div>
        )}
      <div className="Discount_list">
        {DiscountList.map((item, i) => {
          return (
            <div key={i} className="discount_item_container">
              <div className="discount_item">
                <p>
                  برای اجاره‌ بیشتر از {item.days_limit} روز <br />
                  {item.discount_percent} درصد تخفیف
                </p>
                <span
                  // className="confirm"
                  onClick={() => {
                    setMode({
                      status: true,
                      index: i,
                    });
                    setDays_limit(item.days_limit);
                    setDays_limit_name(`${item.days_limit} روز`);
                    setDiscountcheck(1);
                    setDiscount_percent(item.discount_percent);

                    setDiscountList((DiscountList) =>
                      DiscountList.filter((_, index) => {
                        return index !== i;
                      })
                    );
                    props.removeDiscountList(i);
                  }}
                >
                  <IoMdCreate size="2rem" />
                </span>
                <span
                  // className="cancel"
                  onClick={() => {
                    setDiscountList((DiscountList) =>
                      DiscountList.filter((_, index) => {
                        return index !== i;
                      })
                    );
                    props.removeDiscountList(i);
                  }}
                >
                  <IoMdTrash size="2rem" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface IDiscountBox {
  initialDiscountList: any;
  addDiscount: any;
  removeDiscountList: any;
  discountCheck: any;
  showDiscount: number;
  setShowBox: any;
  error?: boolean;
}

export default DiscountBox;
