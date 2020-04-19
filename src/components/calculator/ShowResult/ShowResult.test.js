import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../../testUtil/FindByAttr";
import ShowResult from "./ShowResult";

const props = {
  daily: 90000,
  weekly: 100000,
  monthly: 1000000,
};
const setup = (props) => {
  return mount(<ShowResult {...props} />);
};

describe("component/calculator/showResult", () => {
  test("render without crash", () => {
    const wrapper = setup(props);
    const daily = FindByAttr(wrapper, "daily");
    const weekly = FindByAttr(wrapper, "weekly");
    const monthly = FindByAttr(wrapper, "monthly");
    expect(daily.text()).toEqual("90هزار تومان")
    expect(weekly.text()).toEqual("100هزار تومان")
    expect(monthly.text()).toEqual("1,000میلیون تومان")
  });
});
