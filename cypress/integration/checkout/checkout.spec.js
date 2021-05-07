import { set_default_date_for_search } from "../utils/set_defult_date_for_search";

const date = set_default_date_for_search();
const core_url = "https://core.sepris.com/core";
let car_information = null;
let search_id = null;
let car_index_in_list = 0;

describe("بررسی مسیر حرکت کاربر از خانه به صفجه چک اوت", () => {
  it(`شروع از صفحه خانه، کلیک بر روی اولین نتیجه برای شهر تهران در تاریخ رفت ${date.from_date_form} و برگشت ${date.to_date_form} قیمت زیاد به کم در صفحه جستجو و رسیدن به صفحه خودرو`, () => {
    cy.visit("http://localhost:3000/")
      .intercept(
        "GET",
        core_url +
          `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=-price&page=1&limit=15`
      )
      .as("rentalCarList")
      .get(".search_box form .search_Btn")
      .click()
      .wait(2000)
      .wait("@rentalCarList")
      .then((result) => {
        cy.url().should(
          "contain",
          `http://localhost:3000/search-result?location_id=1&location_name=%D8%AA%D9%87%D8%B1%D8%A7%D9%86&start_date=${date.from_date_form}&end_date=${date.to_date_form}&price_order=-price&page=1&limit=15`
        );
        expect(result.response.statusCode).equal(200);
        cy.intercept("GET", core_url + "/rental-car/search-for-rent/get")
          .as("get_the_car")
          .get(".carCart.HEAP_SearchResult_Card_Car")
          .eq(car_index_in_list)
          .click()
          .wait(2000)
          .wait("@get_the_car")
          .then((data) => {
            search_id = data.response.body.search_id;
            car_information = result.response.body.items[car_index_in_list];
            cy.url()
              .should("include", "/car/")
              .get(".Blue_BTN.localClass.HEAP_Car_Btn_Continue")
              .click()
              .wait(5000)
              .url()
              .should("include", "/checkout")
              .get("footer")
              .should("have.class", "hide_footer")
              .get(".continue_to_pay button")
              .click()
              .wait(3000)
              .url()
              .should("include", "/login")
              .go("back")
              .get(".coupon_Text_show.HEAP_Checkout_Btn_Coupon")
              .click()
              .get(".coupon_form")
              .should("exist")
              .get(".coupon_form input")
              .type("test")
              .get(".coupon_form button")
              .click()
              .wait(1000)
              .url()
              .should("include", "/login")
              .go("back");
          });
      });
  });
  it("بررسی محتوا صفحه در صفحه چک اوت", () => {
    cy.viewport(360, 660);
    cy.visit(`http://localhost:3000/checkout?search_id=${search_id}`);

    if (!car_information.can_get_insurance) {
      cy.get(".insurance").should("not.exist");
    } else cy.get(".insurance").should("exist");
    if (car_information.total_discount > 0) {
      cy.get(".Discount_color").should("exist");
    }
    cy.get(".car_info_insurance > .Date_container")
      .should("exist")
      .get(".payment_info_container")
      .should("have.css", "width", "311px")
      .get(".continue_to_pay")
      .should("have.css", "position", "fixed")
      .get(".coupon_Text_show.HEAP_Checkout_Btn_Coupon")
      .click()
      .get(".coupon_form")
      .get(".close_icon")
      .click()
      .get(".coupon_form")
      .should("not.exist");
  });
  it("کد جستجو منقضی شده", () => {
    cy.visit(`http://localhost:3000/checkout?search_id=invalid`)
      .get(".minHeight.expired_order p")
      .contains("این سفارش منقضی شده است.")
      .get(".minHeight.expired_order ._404PageAnchor.Blue_BTN")
      .should("have.attr", "href", "/")
      .click()
      .url()
      .should("match", /http\:\/\/localhost\:3000\//);
  });
});
