import React from "react";
import { mount } from "enzyme";
import { FindByAttr } from "../../../../../testUtil/FindByAttr";
import Car from "./";

const getListAgainMock = jest.fn();

const props = {
  is_mine: false,
  data: {
    car: {
      brand: { name: { fa: "brand_name" } },
      name: { fa: "model_name" },
    },
    id: 12,
    is_out_of_service: true,
    media_set: [{ thumbnail_url: "img", thumbnail_height: 400 }],
    year: { name: { fa: "1398" } },
  },
  getListAgain: getListAgainMock,
};

const setup = (props) => {
  return mount(<Car {...props} />);
};

describe("Profile component", () => {
  describe("car", () => {
    test("SnapShot", () => {
      let wrapper;
      wrapper = setup(props);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe("Test props", () => {
  let wrapper = null;
  it("renders user data", () => {
    wrapper = setup(props);
    const car_brand_h3 = FindByAttr(wrapper, "car_brand_h3");
    const Link = FindByAttr(wrapper, "Link");
    expect(car_brand_h3.text()).toEqual("brand_name model_name");
    expect(Link.props().href).toEqual("/car/12");
  });
});

describe("my account", () => {
  let wrapper = null;
  wrapper = setup({ ...props, is_mine: true });
  it("Is mine active", () => {
    const Link = FindByAttr(wrapper, "Link");
    expect(Link.props().href).toEqual("/car/12?owner=true");
  });
  it("OUT_OF_SERVICE", () => {
    const OUT_OF_SERVICE = FindByAttr(wrapper, "OUT_OF_SERVICE");
    expect(OUT_OF_SERVICE.text()).toEqual("نمایش مجدد خودرو");
  });
});
