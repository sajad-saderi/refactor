import React, { useState, useEffect } from "react";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { DayRange, utils } from "react-modern-calendar-datepicker";

import DropdownSearch from "../../components/form/Dropdown";
import { REQUEST_GET_LOCATION } from "../../API/index";

import Router from "next/router";

const Search = () => {
  const [LocationId, setLocationId] = useState(null);
  const [dayRange, setDayRange] = React.useState<DayRange>({
    from: null,
    to: null
  });
  const [locationsList, setLocationsList] = useState([
    { text: "درحال دریافت اطلاعات...", value: null }
  ]);

  const get_car_location = async () => {
    const res: any = await REQUEST_GET_LOCATION();
    setLocationsList(res.citiesFarsi);
  };

  useEffect(() => {
    get_car_location();
  }, []);

  const GotoSearchResult = e => {
    e.preventDefault();
    Router.push({
      pathname: "/search-result",
      query: {
        location_id: LocationId,
        start_date: `${dayRange.from.year}/${dayRange.from.month}/${dayRange.from.day}`,
        end_date: `${dayRange.to.year}/${dayRange.to.month}/${dayRange.to.day}`
      }
    });
  };

  return (
    <section className="search_container">
      <form onSubmit={e => GotoSearchResult(e)}>
        <div>
          <DropdownSearch
            data={locationsList}
            Select={i => setLocationId(i.key)}
            clearField={() => setLocationId("")}
          />
        </div>
        <div>
          <DatePicker
            value={dayRange}
            onChange={setDayRange}
            inputPlaceholder="Select a day range"
            shouldHighlightWeekends
            minimumDate={utils("fa").getToday()}
            locale="fa"
          />
        </div>
        <div>
          <button>جستجو</button>
        </div>
      </form>
    </section>
  );
};

export default Search;
