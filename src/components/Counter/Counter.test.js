import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../testUtil/FindByAttr";
import Counter from "./";

const setup = (props) => {
  return mount(<Counter {...props} />);
};

const AddToMock = jest.fn();
const reduceToMock = jest.fn();

const props = {
  max: 10,
  min: 0,
  AddTo: AddToMock,
  reduceTo: reduceToMock,
  label: "text",
  text: "placeHolder",
  value: 1,
};

describe("Counter component", () => {
  describe("snapshot", () => {
    test("/components/Counter", () => {
      const wrapper = setup(props);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("counter props", () => {
    const wrapper = setup(props);
    const label = FindByAttr(wrapper, "label");
    const tail = FindByAttr(wrapper, "tail");
    expect(label.text()).toEqual("text");
    expect(tail.text()).toEqual("placeHolder");
  });

  describe("counter mockfunction", () => {
    const wrapper = setup(props);
    const add = FindByAttr(wrapper, "add");
    const remove = FindByAttr(wrapper, "remove");

    add.first().simulate("click");
    expect(AddToMock).toHaveBeenCalledTimes(1);

    remove.first().simulate("click");
    expect(reduceToMock).toHaveBeenCalledTimes(1);
  });
});
