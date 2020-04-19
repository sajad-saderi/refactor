import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../testUtil/FindByAttr";
import CountDown from "./";

const setup = (props) => {
  return mount(<CountDown {...props} />);
};

const props = {
  time: 20,
  Done: () => {},
};

describe("CountDown component", () => {
  describe("snapshot", () => {
    test("/components/calculator", () => {
      const wrapper = setup(props);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe("Time props", () => {
    test("set Timer", () => {
      const wrapper = setup(props);
      const time = FindByAttr(wrapper, "time");
      expect(time.text()).toEqual("20");
    });
  });
});
