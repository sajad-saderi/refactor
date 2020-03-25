import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { DayRange, utils } from "react-modern-calendar-datepicker";
import moment from "moment-jalaali";
import "./PriceBox.module.scss";
import TextInput from "../../../components/form/TextInput";
// moment.loadPersian({ dialect: "persian-modern" });

const PriceBox = (props: IPriceBox) => {
  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null
  });
  const [price_per_day, setPrice_per_day] = useState("");
  const [DisableList, setDisableList] = useState([]);
  const [availList, setAvailList] = useState([]);
  const [DateDuration, setDateDuration] = useState([]);
  const [EditMode, setEditMode] = useState({
    status: false,
    index: null
  });
  console.log(DisableList);

  const convertDateToMoment = date => {
    if (!date) return;
    const formatedDate = `${date.year}/${date.month}/${date.day}`;
    return moment(formatedDate, "jYYYY/jMM/jDD");
  };

  const convertRangeDateToMoment = date => {
    if (!date) return;
    return {
      from: convertDateToMoment(date.from),
      to: convertDateToMoment(date.to)
    };
  };

  const convertMomentToDate = date => {
    if (!date) return;
    return {
      day: Number(moment(date).format("jDD")),
      month: Number(moment(date).format("jMM")),
      year: Number(moment(date).format("jYYYY"))
    };
  };

  const convertMomentsToDateRange = (start, end) => {
    if (!start && !end) return;
    return {
      from: convertMomentToDate(start),
      to: convertMomentToDate(end)
    };
  };

  const getBetweenRange = (date, returnValue?: boolean) => {
    const { from, to } = convertRangeDateToMoment(date);
    if (from && to) {
      // console.log('from and to  are:', { from, to });
      const days = [];
      const out = [];
      const duration = from.diff(to, "days");
      setDateDuration(DateDuration =>
        DateDuration.concat(Math.abs(duration) + 1)
      );
      for (let i = 0; i <= -duration; i++) {
        days.push(moment(from).add(i, "days"));
      }
      // console.log('days is:', out);
      days.map((value, index) => {
        out.push(convertMomentToDate(value));
      });
      console.log("out is:", out);
      if (returnValue) {
        return out;
      } else setDisableList(DisableList => DisableList.concat(out));
    }
  };

  const onConfirm = () => {
    if (EditMode.status) {
      let tempArr = [...availList];
      tempArr[EditMode.index] = {
        start_date: dayRange.from,
        end_date: dayRange.to,
        price_per_day: price_per_day
      };
      setAvailList(tempArr);
      setEditMode({
        status: false,
        index: null
      });
    } else {
      getBetweenRange(dayRange);
      setAvailList(availList =>
        availList.concat({
          start_date: dayRange.from,
          end_date: dayRange.to,
          price_per_day: price_per_day
        })
      );
    }
    setDayRange({
      from: null,
      to: null
    });
    setPrice_per_day("");
  };

  const releaseDisableDays = index => {
    let FindIndex = 0;
    DateDuration.forEach((element, i) => {
      if (i < index) {
        FindIndex = FindIndex + element;
      }
    });
    const tempArr = [...DisableList];
    tempArr.splice(FindIndex, DateDuration[index]);
    setDateDuration(DateDuration => DateDuration.filter((_, i) => index !== i));
    setDisableList(tempArr);
    console.log("returnValue", tempArr);
    // console.log(returnValue.join('') == DisableList.join(''));
  };
  return (
    <div className="Price_form_container">
      <div className="Price_container input_price_Box">
        <div className="divs">
          <label className="Diff_margin">از تاریخ</label>
          <DatePicker
            inputPlaceholder="از تاریخ تا تاریخ"
            value={dayRange}
            onChange={setDayRange}
            shouldHighlightWeekends
            minimumDate={utils("fa").getToday()}
            locale="fa"
            colorPrimary="#4ba3ce"
            disabledDays={DisableList}
          />
        </div>
        <div className="divs  tail">
          <TextInput
            name="price_per_day"
            error={{
              status: false,
              message: ""
            }}
            label="قیمت"
            value={price_per_day}
            number={true}
            autoFocus={false}
            clearField={() => {
              setPrice_per_day("");
            }}
            min={4}
            max={10}
            onChangeHandler={e => {
              setPrice_per_day(e);
            }}
          />
          <span>تومان</span>
        </div>
        <div className="divs button_box">
          <p className="confirm" onClick={onConfirm}>
            تایید
          </p>
          {EditMode.status && (
            <p
              className="cancel"
              onClick={() => {
                setEditMode({
                  status: false,
                  index: null
                });
                setDayRange({
                  from: null,
                  to: null
                });
                setPrice_per_day("");
              }}
            >
              لغو
            </p>
          )}
        </div>
      </div>
      <div className="Price_container Date_list">
        {availList.length > 0 ? (
          availList.map((item, i) => {
            return (
              <div>
                <p>
                  - اجاره خودرو از تاریخ {item.start_date.month}/{item.start_date.day} تا{" "}
                  {item.end_date.month}/{item.end_date.day} با قیمت{" "}
                  {Number(item.price_per_day).toLocaleString()} تومان
                </p>
                <div className="button_box">
                  <span
                    className="confirm"
                    onClick={() => {
                      setEditMode({
                        status: true,
                        index: i
                      });
                      setPrice_per_day(item.price_per_day);
                      setDayRange({
                        from: item.start_date,
                        to: item.end_date
                      });
                    }}
                  >
                    ویرایش
                  </span>
                  <span
                    className="cancel"
                    onClick={() => {
                      releaseDisableDays(i);
                      setAvailList(availList =>
                        availList.filter((_, index) => {
                          return index !== i;
                        })
                      );
                    }}
                  >
                    حذف
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="nothing">بازه زمانی ثبت شده ندارید</p>
        )}
      </div>
    </div>
  );
};

interface IPriceBox {}

export default PriceBox;
