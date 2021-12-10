import moment from "moment-jalaali";
import { twoWayDateConvertor } from '../src/helpers/dateControler';

const dateRangeCreator = (durations, kickoff) => {
  let start_date = moment()
    .add(kickoff, "day")
    .format("jYYYY/jM/jD");
  let end_date = moment()
    .add(durations, "day")
    .format("jYYYY/jM/jD");
  return { start_date, end_date };
};

export const payBackInString = (durations: number, kickoff: number) => {
  const { start_date, end_date } = dateRangeCreator(durations, kickoff);
  return { start_date, end_date };
};

export const payBackInObject = (durations: number, kickoff: number) => {
  const { start_date, end_date } = dateRangeCreator(durations, kickoff);
  let startDateArray = start_date.split("/");
  let endDateArray = end_date.split("/");
  return {
    from: {
      year: +startDateArray[0],
      month: +startDateArray[1],
      day: +startDateArray[2],
    },
    to: {
      year: +endDateArray[0],
      month: +endDateArray[1],
      day: +endDateArray[2],
    },
  };
};

export const initialDate = (durations: number, kickoff: number) => {
  const { start_date, end_date } = dateRangeCreator(durations, kickoff);
  return {
    from: twoWayDateConvertor(start_date),
    to: twoWayDateConvertor(end_date)
  };
};
