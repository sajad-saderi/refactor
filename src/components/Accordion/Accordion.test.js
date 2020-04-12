import React from "react";
import { mount } from "enzyme";
import Accordion from ".";

const props = {
  question_set: [
    { title: "text", content: "test content" },
    { title: "text2", content: "test content2" },
    { title: "text3", content: "test content3" },
  ],
};
const wrapper = mount(<Accordion {...props} />);
describe("components/", () => {
  describe("Accordion/index.js", () => {
    it("Click on a div and add active classes to h3 and content section ", () => {
      wrapper.find(".FQ_BOX").at(1).simulate("click", 1);
      expect(
        wrapper.find(".FQ_BOX").at(1).find("h3").props().className
      ).toEqual("activeQA");
      expect(
        wrapper.find(".FQ_BOX").at(1).find(".QuestionPart").props().className
      ).toEqual("QuestionPart activeQA");
      expect(
        wrapper.find(".FQ_BOX").at(1).find("svg.ICON_CHevron").props().className
      ).toEqual("ICON_CHevron ACTIVE_CHEVRON");
    });
    it("Click again on the same div and remove active classes", () => {
      wrapper.find(".FQ_BOX").at(1).simulate("click", 1);
      expect(
        wrapper.find(".FQ_BOX").at(1).find("h3").props().className
      ).toEqual("");
      expect(
        wrapper.find(".FQ_BOX").at(1).find("div.QuestionPart").props().className
      ).toEqual("QuestionPart ");
      expect(
        wrapper.find(".FQ_BOX").at(1).find("svg.ICON_CHevron").props().className
      ).toEqual("ICON_CHevron ");
    });
  });
});
