import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../../testUtil/FindByAttr";
import Radio from "./";

const SelectHandlerMock = jest.fn();

const props = {
  data: [
    { value: "a", text: "a" },
    { value: "b", text: "b" },
    { value: "c", text: "c" },
  ],
  name: "name",
  SelectHandler: SelectHandlerMock,
};
const setup = (props) => {
  return mount(<Radio {...props} />);
};

describe("Radio component", () => {
  describe("snapshot", () => {
    test("/component/form/Radio snapshot", () => {
      const wrapper = setup(props);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe("Click om radio", () => {
    test("check mocks functions", () => {
      const wrapper = setup(props);
      const radio = FindByAttr(wrapper, "radio");
      radio.first().simulate("change", { target: { value: 0 } });
      expect(SelectHandlerMock).toHaveBeenCalledTimes(1);
      expect(SelectHandlerMock).toHaveBeenCalledWith(0);
    });
  });
});
