import log_me_in from "../../utils/log_me_in";
import random_number_generator from "../../utils/random_number_generator";

const core_url = "https://core.sepris.com/core";
let home = "http://localhost:3000";
let user_info = null;
let cell_phone_A = Cypress.env("CELL_A");
let cell_phone_B = Cypress.env("CELL_B");
describe("بررسی صفحه پروفایل کاربری", () => {
  //   beforeEach(() => {
  //     cy.visit(home);
  //   });
  it("لاگین یورز و ورود به صفحه سفارش ها", () => {
    cy.visit(`${home}/car/1528`)
      .wait(2000)
      .get(".Blue_BTN.localClass.HEAP_Car_Btn_Continue")
      .click()
      .wait(2000)
      .request(
        "GET",
        core_url + `/rental-car/search-for-rent/get?rental_car_id=1528`
      )
      .then(() => {
        cy.get(".Blue_BTN.localClass.HEAP_Checkout_Btn_Book")
          .click()
          .wait(3000)
          .get(".input_surround input")
          .type(cell_phone_B)
          .get(
            ".Blue_BTN.login_submit.HEAP_ModalGetUserCellPhone_Btn_RequestForConfirmCode "
          )
          .click()
          .get(".separated_places .text_input.data-hj-allow")
          .type(9931)
          .get(".Blue_BTN.login_submit.HEAP_ModalConfirmCode_Btn_Login ")
          .click()
          .wait(2000)
          .get(".Blue_BTN.localClass.HEAP_Checkout_Btn_Book")
          .click()
          .wait(2000)
          .url()
          .should("contain", "/request/")
          .get(".first_element_li a")
          .click()
          .wait(3000)
          .get(".Exit")
          .click();
        log_me_in(cell_phone_A)
          .get(".HEAP_Header_Link_MyOrders")
          .click()
          .wait(2000)
          .get(".Request_car:first-child .Button_container button")
          .should("have.length", 2)
          .get(
            ".Request_car:first-child .Button_container .Blue_BTN.request_car_accept"
          )
          .click()
          .get(".toast_div")
          .should("exist")
          .get(".Request_car:first-child .Button_container button")
          .should("have.length", 0)
          .get(".first_element_li a")
          .click()
          .wait(3000)
          .get(".Exit")
          .click();
        log_me_in(cell_phone_B)
          .get(".HEAP_Header_Link_MyOrders")
          .click()
          .wait(2000)
          .get(".Request_car:first-child .Button_container button")
          .should("have.length", 1)
          .should("contain", "پرداخت");
      });
    // log_me_in(cell_phone_B).then(() => {
    //   cy.request({
    //     method: "POST",
    //     url: `${core_url}/device/login`,
    //     form: true,
    //     body: {
    //       cell: cell_phone_B,
    //       code: "9931",
    //     },
    //   }).then(() => {
    //     cy.wait(2000)
    //       .get(".search_box form .search_Btn")
    //       .click()
    //       .wait(1000)
    //       .request(
    //         "GET",
    //         core_url +
    //           `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=-price&page=1&limit=15&body_style_id=6`
    //       ).then(()=>{

    //           .get(".first_element_li")
    //           .click()
    //           .wait(3000)
    //           .get(".carcard:last-child [data-test-id=OUT_OF_SERVICE]")
    //           .click()
    //           .get(".toast_div")
    //           .should("exist");
    //         })
    //   });
    // });
  });
});
