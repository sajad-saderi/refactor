import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../testUtil/FindByAttr";
import Footer from "./";

const setup = (props) => {
  return mount(<Footer {...props} />);
};

describe("/component/footer", () => {
  test("render without crash ", () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
describe("/component/footer", () => {
    const wrapper = setup({ hide: true });
  test("Hide footer", () => {
    const footer = FindByAttr(wrapper, "footer");
    expect(footer.props().className).toEqual("hide_footer");
  });
});
