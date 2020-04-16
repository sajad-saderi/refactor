import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../../testUtil/FindByAttr";
import Button from "./";

const setup = (props) => {
  return mount(<Button {...props} />);
};

const clearFieldMock = jest.fn();
const SelectMock = jest.fn();

const props = {
  data: [
    { text: "a", value: "a" },
    { text: "b", value: "b" },
  ],
  clearField: clearFieldMock,
  Select: SelectMock,
};

describe("/Dropdown component", () => {
  let wrapper;
  describe("To match snapshot", () => {
    test("dropDown Snapshot", () => {
      wrapper = setup(props);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
