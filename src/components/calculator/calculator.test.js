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

//   describe("AB test props", () => {
//     test("check value of anchor tag", () => {
//       const wrapper = setup({
//         AbText: "از درخواست‌های اجاره مرتبط باخبر شوید",
//       });
//       const form = FindByAttr(wrapper, "form");
//       form.simulate("submit")
//       const addCar_top_joinus_a = FindByAttr(wrapper, "addCar_top_joinus_a");
//       expect(addCar_top_joinus_a.text()).toEqual(
//         "از درخواست‌های اجاره مرتبط باخبر شوید"
//       );
//     });
//   });
});
