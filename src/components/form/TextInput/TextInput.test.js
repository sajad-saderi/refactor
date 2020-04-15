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
  number: false,
};

const setup = (props) => {
  return mount(<TextInput {...props} />);
};

describe("Text Input component", () => {
  test("check onchange function", () => {
    const wrapper = setup(props);
    const input = FindByAttr(wrapper, "input");
    input.simulate("change", { target: { value: "text" } });
    expect(onChangeHandlerMock).toBeCalledTimes(1);
    expect(onChangeHandlerMock).toHaveBeenCalledWith("text");
  });
  // it("Text Input snap shot", () => {
  //   const wrapper = setup();
  //   expect(wrapper).toMatchSnapshot;
  // });
  // it("Call onChange handler with correct value", () => {
  //   const wrapper = setup();
  //   wrapper
  //     .find("input.text_input")
  //     .simulate("change", { target: { value: "text" } });
  //   expect(onChangeHandlerMock).toHaveBeenCalledTimes(1);
  //   expect(onChangeHandlerMock).toHaveBeenCalledWith("text");
  // });
  // it("fill value of input with correct value", () => {
  //   expect(wrapper.find("input.text_input").instance().value).toEqual("text");
  // });
});
