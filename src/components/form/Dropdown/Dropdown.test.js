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
  describe("To match snapshot", () => {
    let wrapper;
    test("dropDown Snapshot", () => {
      wrapper = setup(props);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("label props", () => {
    test("show label", () => {
      let wrapper = setup({ ...props, label: "Label" });
      const label = FindByAttr(wrapper, "label");
      expect(label.exists()).toEqual(true);
    });
    test("hide label", () => {
      let wrapper = setup(props);
      const label = FindByAttr(wrapper, "label");
      expect(label.exists()).toEqual(false);
    });
  });

  describe("hardValue props", () => {
    test("hardValue", () => {
      let wrapper = setup({ ...props, hardValue: "text" });
      const drop_down_input = FindByAttr(wrapper, "drop_down_input");
      expect(drop_down_input.props().value).toEqual("text");
    });
    test("hardValue disable", () => {
      let wrapper = setup(props);
      const drop_down_input = FindByAttr(wrapper, "drop_down_input");
      expect(drop_down_input.props().value).toEqual("");
    });
  });

  describe("click handler on drop down", () => {
    let wrapper = setup(props);
    const drop_down_input = FindByAttr(wrapper, "drop_down_input");
    let Locations_list_container;
    beforeEach(() => {
      drop_down_input.simulate("click");
      Locations_list_container = FindByAttr(
        wrapper,
        "Locations_list_container"
      );
    });
    test("active `Locations_list_container` ", () => {
      expect(Locations_list_container.exists()).toEqual(true);
    });
    test("hide `Locations_list_container` ", () => {
      expect(Locations_list_container.exists()).toEqual(false);
    });
  });

  // describe("test search array", () => {
  //   let wrapper = setup(props);
  //   const drop_down_input = FindByAttr(wrapper, "drop_down_input");
  //   let search_input;
  //   const setDataMock = jest.fn();
  //   const useStateSpy = jest.spyOn(React, "useState");
  //   beforeEach(() => {
  //     drop_down_input.simulate("click");
  //     search_input = FindByAttr(wrapper, "search_input");
  //     search_input.simulate("change", { target: { value: "a" } });
  //     setDataMock.mockClear();
  //   });
  //   test("update list after search ", () => {
  //     useStateSpy.mockImplementation((init) => [init, setDataMock]);
  //     expect(setDataMock).toHaveBeenCalledTimes(1);
  //     expect(setDataMock).toHaveBeenCalledWith([{ text: "a", value: "a" }]);
  //   });
  // });

  // describe("search input handler", () => {
  //   wrapper = setup({ ...props, disableSearch: false });
  //   const drop_down_input = FindByAttr(wrapper, "drop_down_input");
  //   drop_down_input.simulate("click");
  //   const search_input = FindByAttr(wrapper, "search-input");
  //   search_input.simulate("change", { target: { value: "a" } });

  //   beforeEach(() => {
  //     wrapper.update()
  //   });

  //   test("search_value state", () => {
  //     // const setSearch_valueMock = jest.fn();
  //     // const useStateSpy = jest.spyOn(React, "useState");
  //     // useStateSpy.mockImplementation((init) => [init, setSearch_valueMock]);
  //     expect(search_input.text()).toEqual("text");

  //     // expect(setSearch_valueMock).toHaveBeenCalledWith("Test");
  //     // const setSearch_valueMock = jest.fn();
  //     // const useStateSpy = jest.spyOn(React, "useState");
  //     // const setSearch_valueMock = jest.fn();
  //     // React.useState = jest.fn(() => ["", setSearch_valueMock]);
  //     // expect(setSearch_valueMock).toHaveBeenCalledWith("text");
  //   });
  // });
});
