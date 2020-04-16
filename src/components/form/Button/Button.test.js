import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../../testUtil/FindByAttr";
import Button from "./";

const setup = (props) => {
  return mount(<Button {...props} />);
};

const clickMock = jest.fn();

const props = {
  value: "placeHolder",
  class: "BTN",
  loading: false,
  click: clickMock,
};

describe("Button component", () => {
  let wrapper;
  test("To Match Snapshot", () => {
    wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

  describe("Props Attributes", () => {
    wrapper = setup(props);
    const button = FindByAttr(wrapper, "btn");
    const spinner = FindByAttr(wrapper, "Loading");
    test("has Class name", () => {
      expect(button.hasClass("BTN")).toEqual(true);
      expect(spinner.exists()).toEqual(false);
    });
  });

  describe("Show Spinner", () => {
    wrapper = setup({ ...props, loading: true });
    const spinner = FindByAttr(wrapper, "Loading");
    test("Show spinner if it's loading", () => {
      expect(spinner.exists()).toEqual(true);
    });
  });

  describe("Click mock simulator", () => {
    beforeEach(() => {
      clickMock.mockClear();
    });
    let button;
    test("disable click if it's loading", () => {
      wrapper = setup({ ...props, loading: true });
      button = FindByAttr(wrapper, "btn");
      button.simulate("click");
      expect(clickMock).toBeCalledTimes(0);
    });
    test("disable click if it's disable", () => {
      wrapper = setup({ ...props, disable: true });
      button = FindByAttr(wrapper, "btn");
      button.simulate("click");
      expect(clickMock).toBeCalledTimes(0);
    });
    test("disable click if it's loading", () => {
      wrapper = setup({ ...props, loading: false, disable: false });
      button = FindByAttr(wrapper, "btn");
      button.simulate("click");
      expect(button.text()).toEqual("placeHolder");
      expect(clickMock).toBeCalledTimes(1);
    });
  });
});
