import React from "react";
import { mount } from "enzyme";
import TextInput from "./";

const props = {
  name: "input",
  clearField: () => {},
  onChangeHandler: () => {},
  value: "",
  error: { status: false, message: "" },
  autoFocus: false,
};
const wrapper = mount(<TextInput {...props} />);

describe("Text Input component", () => {
  it("Text Input snap shot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
