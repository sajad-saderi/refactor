import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../../testUtil/FindByAttr";
import CheckBox from "./";

const clearFieldMock = jest.fn();
const SelectMock = jest.fn();

const props = {
  data: [
    { value: "a", text: "a" },
    { value: "b", text: "b" },
    { value: "c", text: "c" },
  ],
  name: "name",
  clearField: clearFieldMock,
  Select: SelectMock,
};
const setup = (props) => {
  return mount(<CheckBox {...props} />);
};

describe("Checkbox component", () => {
  describe("snapshot", () => {
    test("/component/form/checkbox snapshot", () => {
      const wrapper = setup(props);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe("show spinner", () => {
    test("empty data should show spinner", () => {
      const wrapper = setup({ ...props, data: [] });
      const resultList = FindByAttr(wrapper, "resultList");
      expect(resultList.length).toEqual(1);
    });
  });
  describe("show checkboxes", () => {
    test("render 3 checkboxes", () => {
      const wrapper = setup({ ...props });
      const container = FindByAttr(wrapper, "container");
      expect(container.length).toEqual(3);
      expect(container.first().text()).toEqual("a");
    });
  });
  describe("change controller", () => {
    const wrapper = setup({ ...props });
    const checkbox = FindByAttr(wrapper, "checkbox");
    test("click and call `SelectMock`", () => {
      checkbox.first().simulate("change", { target: { checked: true } });
      expect(SelectMock).toHaveBeenCalledTimes(1);
      expect(SelectMock).toHaveBeenCalledWith({ value: "a", text: "a" });
    });
    test("click and call `SelectMock`", () => {
      checkbox.first().simulate("change", { target: { checked: false } });
      expect(clearFieldMock).toHaveBeenCalledTimes(1);
      expect(clearFieldMock).toHaveBeenCalledWith({ value: "a", text: "a" });
    });
  });
});
