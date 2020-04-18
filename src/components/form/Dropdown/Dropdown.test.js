import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../../testUtil/FindByAttr";
import Dropdown from "./";

const setup = (props) => {
  return mount(<Dropdown {...props} />);
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

  describe("search_input", () => {
    let wrapper = setup(props);
    const drop_down_input = FindByAttr(wrapper, "drop_down_input");
    test("active `search_input` ", () => {
      drop_down_input.simulate("click");
      let search_input = FindByAttr(wrapper, "search_input");
      search_input.simulate("change", { target: { value: "a" } });
      expect(search_input.instance().value).toEqual("a");
    });
  });

  describe("filter result base on search input", () => {
    let wrapper = setup(props);
    const drop_down_input = FindByAttr(wrapper, "drop_down_input");
    drop_down_input.simulate("click");
    let search_input = FindByAttr(wrapper, "search_input");
    test("input controller and filter array ", () => {
      search_input.simulate("change", { target: { value: "a" } });
      const Items = FindByAttr(wrapper, "Items");
      expect(Items.length).toEqual(1);
    });
    test("input controller and filter array ", () => {
      search_input.simulate("change", { target: { value: "ab" } });
      const Items = FindByAttr(wrapper, "Items");
      expect(Items.length).toEqual(1);
    });
    test("input controller and filter array ", () => {
      search_input.simulate("change", { target: { value: "" } });
      const Items = FindByAttr(wrapper, "Items");
      expect(Items.length).toEqual(2);
    });
  });

  describe("click on item", () => {
    let wrapper = setup(props);
    const drop_down_input = FindByAttr(wrapper, "drop_down_input");
    drop_down_input.simulate("click");
    const Items = FindByAttr(wrapper, "Items");
    test("fill the input value and close the drop down box", () => {
      Items.last().simulate("click");
      expect(drop_down_input.instance().value).toEqual("b");
      expect(SelectMock).toHaveBeenCalledTimes(1);
      expect(SelectMock).toHaveBeenCalledWith({"text": "b", "value": "b"});
      const Locations_list_container = FindByAttr(
        wrapper,
        "Locations_list_container"
      );
      expect(Locations_list_container.length).toEqual(0);
    });
  });
});
