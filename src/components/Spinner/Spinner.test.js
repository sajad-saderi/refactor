import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../testUtil/FindByAttr";
import Spinner from "./";

const setup = (props) => {
  return mount(<Spinner {...props} />);
};

const props = {
  display: "block",
  width: 20,
  color: "#0099ff",
};

describe("Spinner component", () => {
  describe("snapshot", () => {
    test("/components/Spinner", () => {
      const wrapper = setup(props);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("props", () => {
    test("display props", () => {
      const wrapper = setup(props);
      const span = FindByAttr(wrapper, "span");
      expect(span.instance().style.display).toEqual("block");
    });
  });
});
