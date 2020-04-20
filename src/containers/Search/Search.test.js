import React from "react";
import { shallow } from "enzyme";
import { FindByAttr } from "../../../testUtil/FindByAttr";
import Search from "./";

const searchSubmitMock = jest.fn();

const props = {
  dynamic: true,
  searchSubmit: searchSubmitMock,
};

const setup = (props) => {
  return shallow(<Search {...props} />);
};

describe("Search component", () => {
  describe("snapshot", () => {
    test("/components/Search", () => {
      const wrapper = setup(props);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
