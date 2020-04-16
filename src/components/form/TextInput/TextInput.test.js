import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../../testUtil/FindByAttr";
import TextInput from "./";

const onChangeHandlerMock = jest.fn();
const clearFieldMock = jest.fn();

const props = {
  clearField: clearFieldMock,
  onChangeHandler: onChangeHandlerMock,
  value: "text",
  error: {
    status: false,
    message: "",
  },
  autoFocus: false,
};

const setup = (props) => {
  return mount(<TextInput {...props} />);
};

describe("Text Input component", () => {
  describe("Snapshot", () => {
    test("Text Input component snapshot", () => {
      const wrapper = setup(props);
      expect(wrapper).toMatchSnapshot;
    });
  });

  describe("call props functions", () => {
    let input;
    let wrapper;
    beforeEach(() => {
      onChangeHandlerMock.mockClear();
      clearFieldMock.mockClear();
      wrapper = setup(props);
      input = FindByAttr(wrapper, "input");
    });
    test("check onchange function and call mock functions", () => {
      input.simulate("change", {
        target: { value: "text", setCustomValidity: () => {} },
      });
      expect(onChangeHandlerMock).toBeCalledTimes(1);
      expect(onChangeHandlerMock).toHaveBeenCalledWith("text");
    });
    test("clear input", () => {
      wrapper = setup({ ...props, HideClearIcon: false, value: "a" });
      input.simulate("change", {
        target: { value: "text", setCustomValidity: () => {} },
      });
      let clearIcon = FindByAttr(wrapper, "svg-icon");
      expect(clearIcon.exists()).toEqual(true);
      clearIcon.first().simulate("click");
      expect(clearFieldMock).toBeCalledTimes(1);
      expect(clearFieldMock).toHaveBeenCalledWith();
    });
  });

  describe("Active number property for input", () => {
    let wrapper;
    let input;
    beforeEach(() => {
      onChangeHandlerMock.mockClear();
      wrapper = setup({ ...props, number: true });
      input = FindByAttr(wrapper, "input");
    });
    test("Return '' if enter text", () => {
      input.simulate("change", {
        target: { value: "text", setCustomValidity: () => {} },
      });
      expect(onChangeHandlerMock).toBeCalledTimes(1);
      expect(onChangeHandlerMock).toHaveBeenCalledWith("");
    });
    test("Return English Number if enter persian number", () => {
      wrapper = setup({
        ...props,
        number: true,
        value: "123456789",
      });
      input.simulate("change", {
        target: { value: "۱۲۳۴۵۶۷۸۹", setCustomValidity: () => {} },
      });
      expect(onChangeHandlerMock).toBeCalledTimes(1);
      expect(onChangeHandlerMock).toHaveBeenCalledWith("123456789");
    });
    test("Return Just numbers if the string has word in it", () => {
      input.simulate("change", {
        target: { value: "aAآس۱۲۳۴۵۶۷۸۹", setCustomValidity: () => {} },
      });
      expect(onChangeHandlerMock).toBeCalledTimes(1);
      expect(onChangeHandlerMock).toHaveBeenCalledWith("123456789");
    });
  });

  describe("Errors check", () => {
    let wrapper;
    let input;
    beforeEach(() => {
      wrapper = setup({ ...props, value: "123456789" });
      input = FindByAttr(wrapper, "input");
    });
    test("Check status and message", () => {
      wrapper = setup({ ...props, error: { status: true, message: "error" } });
      input.simulate("change", {
        target: { value: "123456789", setCustomValidity: () => {} },
      });
      let errorMessage = FindByAttr(wrapper, "input_error_message");
      expect(errorMessage.text()).toEqual("error");
    });
  });
});
