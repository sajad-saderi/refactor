import * as React from "react";
import { shallow, mount } from "enzyme";
import HomePage from "../pages/index";

describe("Pages", () => {
  describe("Index", () => {
    it("should render without throwing an error", function () {
      const wrap = mount(<HomePage />);
      expect(wrap.find("h1").text()).toBe("اتولی، اجاره آسان خودرو");
    });
  });
});
