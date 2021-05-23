import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

export const set_default_date_for_search = () => {
  let from_text_form = null;
  let from_date_form = null;
  let to_text_form = null;
  let to_date_form = null;
  // if start date and end date is not set, automatically show the result for 3 to 6 days ahead
  from_text_form = moment()
    .add(3, "day")
    .format("dddd jDD jMMMM");
  from_date_form = moment()
    .add(3, "day")
    .format("jYYYY/jM/jD");
  to_text_form = moment()
    .add(6, "day")
    .format("dddd jDD jMMMM");
  to_date_form = moment()
    .add(6, "day")
    .format("jYYYY/jM/jD");
  return {
    from_text_form,
    from_date_form,
    to_text_form,
    to_date_form,
  };
};
