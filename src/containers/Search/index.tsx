import React, { useState, useEffect, useContext } from "react";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { DayRange, utils } from "react-modern-calendar-datepicker";
import moment from "moment-jalaali";

import DropdownSearch from "../../components/form/Dropdown";
import { REQUEST_GET_LOCATION } from "../../API/index";

import Router from "next/router";

import "./search.module.scss";
import Button from "../../components/form/Button";

import modal_context from "../../context/Modal_context";

const Search = (props: ISearch) => {
  const [LocationId, setLocationId] = useState(1);
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
    setDateFromStorage();
    get_car_location();
  }, []);

  const setDateFromStorage = () => {
    if (localStorage["start"] && localStorage["end"]) {
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
  };

  const GotoSearchResult = (e) => {
    e.preventDefault();
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
  };

  return (
    <section className="search_box">
      <form onSubmit={(e) => GotoSearchResult(e)}>
        <div className="search_box_div">
          <p>خودرو خود را کجا تحویل میگیرید؟</p>
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
        <div className="search_box_div">
          <p>انتخاب تاریخ تحویل و بازگشت خودرو</p>
          <DatePicker
            inputPlaceholder="از تاریخ تا تاریخ"
            value={dayRange}
            onChange={setDayRange}
            shouldHighlightWeekends
            minimumDate={utils("fa").getToday()}
            locale="fa"
            colorPrimary="#4ba3ce"
            disabledDays={[utils("fa").getToday()]}
          />
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
