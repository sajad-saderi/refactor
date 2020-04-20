import React, { useState, useEffect, useContext } from "react";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { DayRange, utils } from "react-modern-calendar-datepicker";
import moment from "moment-jalaali";

import DropdownSearch from "../../components/form/Dropdown";
import { REQUEST_GET_LOCATION } from "../../API/index";

import Router from "next/router";

import "./search.scss";
import Button from "../../components/form/Button";

import modal_context from "../../context/Modal_context";

moment.loadPersian({ dialect: "persian-modern" });

const Search = (props: ISearch) => {
  const [LocationId, setLocationId] = useState(1);
  const [fromDay, setFromDay] = useState("");
  const [toDay, setToDay] = useState("");
  const [dayRange, setDayRange] = React.useState<DayRange>({
    from: null,
    to: null,
  });

  const [locationsList, setLocationsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const MODAL_CONTEXT = useContext(modal_context);

  const get_car_location = async () => {
    const res: any = await REQUEST_GET_LOCATION();
    setLocationsList(res.data);
  };

  useEffect(() => {
    get_car_location();
    setDateFromStorage();
  }, []);

  const setDateFromStorage = () => {
    if (localStorage["start"] && localStorage["end"]) {
      if (localStorage["start"] !== null && localStorage["end"] !== null) {
        let start = JSON.parse(localStorage["start"]);
        if (start.day > moment().jDate()) {
          if (start.month >= moment().jMonth() + 1) {
            setDayRange({
              from: JSON.parse(localStorage["start"]),
              to: JSON.parse(localStorage["end"]),
            });
          } else {
            localStorage.removeItem("start");
            localStorage.removeItem("end");
          }
        } else if (start.month > moment().jMonth() + 1) {
          setDayRange({
            from: JSON.parse(localStorage["start"]),
            to: JSON.parse(localStorage["end"]),
          });
        } else {
          localStorage.removeItem("start");
          localStorage.removeItem("end");
        }
      }
    }
  };

  const GotoSearchResult = (e) => {
    e.preventDefault();
    if (dayRange.from && dayRange.to) {
      if (props.dynamic) {
        props.searchSubmit({
          location_id: 1,
          date: {
            Start_date: `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
            End_date: `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
          },
        });
        return;
      }
      localStorage["start"] = JSON.stringify(dayRange.from);
      localStorage["end"] = JSON.stringify(dayRange.to);
      setLoading(true);
      Router.push({
        pathname: "/search-result",
        query: {
          location_id: LocationId,
          start_date: `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
          end_date: `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`,
        },
      });
    }
  };

  useEffect(() => {
    if (dayRange.from) {
      setFromDay(convertDate(dayRange.from));
    } else {
      setFromDay(" ");
      setToDay(" ");
    }
    if (dayRange.to) {
      setToDay(convertDate(dayRange.to));
    } else {
      setToDay(" ");
    }
  }, [dayRange]);

  const convertDate = (v) => {
    let value = moment(`${v.year}/${v.month}/${v.day}`, "jYYYY/jM/jD").format(
      "dddd jDD jMMMM jYY"
    );
    return value;
  };

  return (
    <section className="search_box">
      <form data-test-id="GotoSearchResult" onSubmit={(e) => GotoSearchResult(e)}>
        <div className="search_box_div">
          <p className="label">خودرو خود را کجا تحویل میگیرید؟</p>
          <DropdownSearch
            data={locationsList}
            InputDisable={true}
            hardValue="تهران"
            Select={(i) => {
              // setLocationId(i.key);
              localStorage["User_Location"] = JSON.stringify(i);
              MODAL_CONTEXT.modalHandler("TellMe");
            }}
            clearField={() => setLocationId(1)}
          />
        </div>
        <div className="Date_picker_container">
          <div className="date_Input_Container">
            <DatePicker
              value={dayRange}
              onChange={setDayRange}
              shouldHighlightWeekends
              minimumDate={utils("fa").getToday()}
              locale="fa"
              colorPrimary="#4ba3ce"
              disabledDays={[utils("fa").getToday()]}
            />
            <div className="input_container">
              <p className="label">از تاریخ</p>
              <input readOnly={true} value={fromDay ? fromDay : ""}></input>
            </div>
            <div className="input_container">
              <p className="label">تا تاریخ</p>
              <input
                readOnly={true}
                className="exception_input"
                value={toDay ? toDay : ""}
              ></input>
            </div>
          </div>
        </div>
        <div className="search_box_div">
          <p className="Search_Text_transparent">search</p>
          <Button
            value="جستجو"
            class="Blue_BTN search_Btn"
            loading={loading}
            click={() => {}}
          />
        </div>
      </form>
    </section>
  );
};

interface ISearch {
  dynamic?: boolean;
  searchSubmit?: any;
}

export default Search;
