import React, { useState, useEffect } from "react";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { DayRange, utils } from "react-modern-calendar-datepicker";

import DropdownSearch from "../../components/form/Dropdown";
import { REQUEST_GET_LOCATION } from "../../API/index";

const Search = () => {
  const [dayRange, setDayRange] = React.useState<DayRange>({
    from: null,
    to: null
  });
  const [locations, setLocations] = useState([
    { text: "درحال دریافت اطلاعات...", value: null }
  ]);

  const get_car_location = async () => {
    const res: any = await REQUEST_GET_LOCATION();    
    setLocations(res.citiesFarsi);
  };

  useEffect(() => {
    get_car_location();
  }, []);

  return (
    <section>
      <div>
        <DropdownSearch data={locations} />
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
      <div>دکمه</div>
    </section>
  );
};

export default Search;
