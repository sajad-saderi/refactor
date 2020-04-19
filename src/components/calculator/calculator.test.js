import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../testUtil/FindByAttr";
import Calculator from "./";

const setup = (props) => {
  return mount(<Calculator {...props} />);
};

describe("Calculator component", () => {
  describe("snapshot", () => {
    test("/components/calculator", () => {
      const wrapper = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Spinner", () => {
    test("test disable loading spinner ", () => {
      const wrapper = setup();
      const form = FindByAttr(wrapper, "form");
      form.simulate("submit", { preventDefault: () => {} });
      const local_Button_joinUs = FindByAttr(wrapper, "local_Button_joinUs");
      expect(local_Button_joinUs.props().loading).toEqual(false);
    });
  });

  // describe("react library tests", () => {
  //   test("should increment counter", () => {
  //     const wrapper = setup(); 
  //       const brand = FindByAttr(wrapper, "brand");
  //       brand.props().Select({ value: "a", text: "a" }); 
  //       expect(wrapper.prop('brand')).toEqual('a')
  //     // expect(wrapper.brand).toBe(1);
  //   });
  // });

  //   const setShowCalculateBoxMock = jest.fn();
  //   React.useState = jest
  //     .fn()
  //     .mockReturnValue([false, setShowCalculateBoxMock]);
  //   expect(setShowCalculateBoxMock).toHaveBeenCalledTimes(1);
  // });

  // describe("AB test props", () => {
  //   test("check value of anchor tag", () => {
  //     const wrapper = setup({
  //       AbText: "از درخواست‌های اجاره مرتبط باخبر شوید",
  //     });
  //     const form = FindByAttr(wrapper, "form");
  //     form.simulate("submit")
  //     const addCar_top_joinus_a = FindByAttr(wrapper, "addCar_top_joinus_a");
  //     expect(addCar_top_joinus_a.text()).toEqual(
  //       "از درخواست‌های اجاره مرتبط باخبر شوید"
  //     );
  //   });
  // });
});
