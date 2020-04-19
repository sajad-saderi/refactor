import React from "react";
import { shallow } from "enzyme";
import { FindByAttr } from "../../../../testUtil/FindByAttr";
import Modal from "./";

const setup = (props) => {
  return shallow(<Modal {...props} />);
};

describe("Spinner component", () => {
  let Container_class;
  describe("snapshot", () => {
    test("/components/Modal", () => {
      const wrapper = setup({ modal_type: "Login" });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("props", () => {
    test("TellMe modal", () => {
      const wrapper = setup({ modal_type: "TellMe" });
      Container_class = FindByAttr(wrapper, "Container_class");
      const TellMe = FindByAttr(wrapper, "TellMe");
      expect(TellMe.length).toEqual(1);
      expect(Container_class.props().className).toEqual("modal_box Tell_me");
    });
  });

  describe("props", () => {
    test("Law modal", () => {
      const wrapper = setup({ modal_type: "Law" });
      Container_class = FindByAttr(wrapper, "Container_class");
      const Law = FindByAttr(wrapper, "Law");
      expect(Law.length).toEqual(1);
      expect(Container_class.props().className).toEqual("modal_box Law");
    });
  });
  describe("props", () => {
    test("Renter modal", () => {
      const wrapper = setup({ modal_type: "Renter" });
      Container_class = FindByAttr(wrapper, "Container_class");
      const Renter = FindByAttr(wrapper, "Renter");
      expect(Renter.length).toEqual(1);
      expect(Container_class.props().className).toEqual("modal_box Renter");
    });
  });
  describe("props", () => {
    test("Owner modal", () => {
      const wrapper = setup({ modal_type: "Owner" });
      Container_class = FindByAttr(wrapper, "Container_class");
      const Owner = FindByAttr(wrapper, "Owner");
      expect(Owner.length).toEqual(1);
      expect(Container_class.props().className).toEqual("modal_box Owner");
    });
  });
  describe("props", () => {
    test("Login modal", () => {
      const wrapper = setup({ modal_type: "Login" });
      Container_class = FindByAttr(wrapper, "Container_class");
      const GetUserCellPhone = FindByAttr(wrapper, "GetUserCellPhone");
      expect(GetUserCellPhone.length).toEqual(1);
      expect(Container_class.props().className).toEqual(
        "modal_box login_modal"
      );
    });
  });
});
