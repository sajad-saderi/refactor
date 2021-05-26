import log_me_in from "../../utils/log_me_in";
import { set_default_date_for_search } from "../../utils/set_defult_date_for_search";

const date = set_default_date_for_search();
const core_url = "https://core.sepris.com/core";
let home = "http://localhost:3000";
let search_id = null;
let car_index_in_list = 0;
let cell_phone = "09380158835";

describe("بررسی صفحه لاگین", () => {
  beforeEach(() => {
    cy.visit(home);
  });
  it("دسترسی بدون لاگین", () => {
    cy.get(".HEAP_Header_Btn_Login a")
      .click()
      .wait(3000)
      .url()
      .should("contain", "/login")
      .go("back")
      .get(".add_car_section .Blue_BTN.add_car_custom")
      .click()
      .wait(6000)
      .url()
      .should("contain", "/login")
      .visit(home)
      .get(".Blue_BTN.search_Btn.HEAP_Home_Btn_Search")
      .click()
      .wait(3000)
      .request(
        "GET",
        core_url +
          `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=-price&page=1&limit=1`
      )
      .then(() => {
        cy.get(".carCart.HEAP_SearchResult_Card_Car")
          .eq(0)
          .click()
          .wait(3000)
          .get(".Blue_BTN.localClass.HEAP_Car_Btn_Continue")
          .click()
          .wait(3000)
          .get(".Blue_BTN.localClass.HEAP_Checkout_Btn_Book")
          .click()
          .wait(3000)
          .url()
          .should("contain", "/login");
      });
    cy
      // .visit(`${home}/requests`)
      //   .wait(3000)
      //   .url()
      // .should("contain", "/login")
      .visit(`${home}/request/12`)
      .wait(3000)
      .url()
      .should("contain", "/login");
  });
  it("بررسی عملکرد باکس لاگین", () => {
    cy.get(".Blue_BTN.add_car_custom")
      .click()
      .wait(2000)
      .url()
      .should("contain", "/login")
      .get(
        ".Blue_BTN.login_submit.HEAP_ModalGetUserCellPhone_Btn_RequestForConfirmCode "
      )
      .as("submit_form")
      .contains("ارسال کد ورود")
      .get(".input_surround input")
      .as("input")
      .type(12345678999)
      .get("@submit_form")
      .click()
      .get("@input")
      .should("have.class", "inputError")
      .get("@input")
      .clear()
      .type(1234)
      .trigger("blur")
      .get("@input")
      .should("have.class", "inputError")
      .get(".login_person_icon")
      .click()
      .get(".login_modal_title h2")
      .contains("ورود / ثبت نام")
      .get("@input")
      .clear()
      .type(cell_phone)
      .get("@submit_form")
      .click()
      .wait(2000)
      .request({
        method: "POST",
        url: `${core_url}/device/send-code`,
        form: true,
        body: {
          cell: cell_phone,
        },
      })
      .then((result) => {
        console.log(result);
        expect(result.status).to.eq(200);
        cy.get(".text_input_container label")
          .contains(cell_phone)
          .get(".separated_places .text_input.data-hj-allow")
          .as("separated_input")
          .type(1111)
          .get(".Blue_BTN.login_submit.HEAP_ModalConfirmCode_Btn_Login ")
          .as("submit_login_form")
          .click()
          .get(".border_on_each_Item ")
          .should("have.class", "span_error")
          .get("@separated_input")
          .clear()
          .type(9931)
          .get("@submit_login_form")
          .click()
          .url()
          .should("contain", "/login");
      });
  });
  it("بررسی دسترسی های صفحه", () => {
    log_me_in("9380158835").then(() => {
      cy.wait(2000)
        .get(".Nav> ul")
        .children()
        .should("have.length", 3)
        // .intercept("/add-car")
        // .as("go_to_add_car_after_login")
        .get(".Blue_BTN.add_car_custom")
        .click()
        // .wait("@go_to_add_car_after_login")
        .then(() => {
          cy.url()
            .should("contain", "/add-car")
            // .intercept("/requests")
            // .as("request-page")
            .get(".Nav .HEAP_Header_Link_MyOrders")
            .click()
            // .wait("@request-page")
            .then(() => {
              cy.url()
                .should("contain", "/requests")
                // .intercept("/user/")
                // .as("profile")
                .get(".first_element_li")
                .click()
                // .wait("@profile")
                .then(() => {
                  cy.url()
                    .should("contain", "/user")
                    .visit(home)
                    .get(".Blue_BTN.search_Btn.HEAP_Home_Btn_Search")
                    .click()
                    .wait(6000)
                    .request(
                      "GET",
                      core_url +
                        `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=-price&page=1&limit=1`
                    )
                    .then(() => {
                      cy.get(".carCart.HEAP_SearchResult_Card_Car")
                        .eq(0)
                        .click()
                        .wait(5000)
                        .get(".Blue_BTN.localClass.HEAP_Car_Btn_Continue")
                        .click()
                        .wait(5000)
                        .get(".coupon_Text_show.HEAP_Checkout_Btn_Coupon")
                        .click()
                        .get(".coupon_form input")
                        .type("sajad4test")
                        .get(
                          ".Blue_BTN.coupan_BTN.HEAP_Checkout_Btn_CouponSubmit"
                        )
                        .click()
                        .get(".coupon_Text_show.HEAP_Checkout_Btn_Coupon")
                        .should("not.exist");
                    });
                });
            });
        });
    });
  });
});
