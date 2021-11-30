import log_me_in from "../../utils/log_me_in";
import random_number_generator from "../../utils/random_number_generator";

const core_url = "https://core.sepris.com/core";
let home = Cypress.env("DEV_HOME");
let user_info = null;
let token = null;
let order_id = null;
let cell_phone_A = Cypress.env("CELL_A");
let cell_phone_B = Cypress.env("CELL_B");
let car_id = null;
describe("بررسی صفحه پروفایل کاربری", () => {
  //   beforeEach(() => {
  //     cy.visit(home);
  //   });
  it("لاگین یورز و ورود به صفحه سفارش ها", () => {
    cy.visit(home);
    log_me_in(cell_phone_A)
      .get(".first_element_li")
      .click()
      .wait(8000)
      .get(".carcard:last-child")
      .click()
      .wait(3000)
      .then(() => {
        cy.window().then((win) => {
          car_id = win.location.pathname.split("/")[2];
          console.log(win.location.pathname.split("/")[2]);
        });
      });
  });
  it("لاگین یورز و ورود به صفحه سفارش ها", () => {
    cy.visit(`${home}car/${car_id}`)
      .wait(2000)
      .get(".Blue_BTN.localClass.HEAP_Car_Btn_Continue")
      .click()
      .wait(2000)
      .request(
        "GET",
        core_url + `/rental-car/search-for-rent/get?rental_car_id=${car_id}`
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
          .wait(3000)
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
  });
  it("پرداخت کارت", () => {
    cy.visit(home)
      .get(".HEAP_Header_Btn_Login")
      .click()
      .wait(3000)
      .then(() => {
        cy.get(".input_surround input")
          .type(cell_phone_B)
          .get(
            ".Blue_BTN.login_submit.HEAP_ModalGetUserCellPhone_Btn_RequestForConfirmCode "
          )
          .click()
          .get(".separated_places .text_input.data-hj-allow")
          .type(9931)
          .request({
            method: "POST",
            url: `${core_url}/device/login`,
            form: true,
            body: {
              cell: cell_phone_B,
              code: 9931,
            },
          })
          .then((result) => {
            token = result.body.token;
            cy.get(".Blue_BTN.login_submit.HEAP_ModalConfirmCode_Btn_Login ")
              .click()
              .get(".HEAP_Header_Link_MyOrders")
              .click()
              .wait(2000)
              .get(
                ".Blue_BTN.request_car_pay.GO_TO_BANK.HEAP_Request_Btn_GotoBank"
              )
              .request({
                method: "POST",
                url: `${core_url}/rental-car/order/list?page=1&limit=1`,
                form: true,
                body: {
                  cell: cell_phone_B,
                  code: 9931,
                },
                headers: {
                  Authorization: "Bearer " + token,
                },
              })
              .then((result) => {
                order_id = result.body.items[0].id;
                console.log(result.body.items[0].id);
                cy.request({
                  method: "POST",
                  url: `${core_url}/rental-car/order/pay`,
                  form: true,
                  body: {
                    id: order_id,
                    mock_result: "successful",
                  },
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                });
              })
              .then((result) => {
                cy.get(".orders_tabs p:not(.active)")
                  .click()
                  .wait(100)
                  .get(".orders_tabs p:not(.active)")
                  .click()
                  .get(
                    ".Request_car:first-child  .Button_container .pelak_view_container"
                  )
                  .should("exist")
                  .get(".Request_car:first-child  .Role_container .renter_Cell")
                  .should("exist")
                  .get(".rent_status .status_paid")
                  .contains("در انتظار تحویل")
                  .get(
                    ".Request_car:first-child .Blue_BTN.request_car_pay.CAR_DELIVERED.HEAP_Request_Btn_CarDelivered"
                  )
                  .click()
                  .get(".first_element_li a")
                  .click()
                  .wait(3000)
                  .get(".Exit")
                  .click()

                  .get(".HEAP_Header_Btn_Login")
                  .click()
                  .wait(3000)
                  .then(() => {
                    cy.get(".input_surround input")
                      .type(cell_phone_A)
                      .get(
                        ".Blue_BTN.login_submit.HEAP_ModalGetUserCellPhone_Btn_RequestForConfirmCode "
                      )
                      .click()
                      .get(".separated_places .text_input.data-hj-allow")
                      .type(9931)
                      .request({
                        method: "POST",
                        url: `${core_url}/device/login`,
                        form: true,
                        body: {
                          cell: cell_phone_A,
                          code: 9931,
                        },
                      })
                      .then((result) => {
                        token = result.body.token;
                        cy.get(
                          ".Blue_BTN.login_submit.HEAP_ModalConfirmCode_Btn_Login "
                        )
                          .click()
                          .get(".HEAP_Header_Link_MyOrders")
                          .click()
                          .wait(2000)
                          .get(
                            ".Request_car:first-child .Blue_BTN.request_car_pay"
                          )
                          .click()
                          .get(
                            ".Request_car:first-child .Blue_BTN.request_car_pay"
                          )
                          .click()
                          .get(".star-container")
                          .eq(2)
                          .click()
                          .get(".rate_to_owner_car textarea")
                          .type("نظر اجاره دهنده به اجاره گیرنده")
                          .get(".rate_buttons .Blue_BTN.submit_submit")
                          .click()
                          .wait(5000)
                          .get(".first_element_li a")
                          .click()
                          .wait(3000)
                          .get(".Exit")
                          .click();
                        log_me_in(cell_phone_B)
                          .get(".HEAP_Header_Link_MyOrders")
                          .click()
                          .wait(3000)
                          .get(
                            ".Request_car:first-child .Blue_BTN.request_car_pay"
                          )
                          .click()
                          .get(
                            ".modal_box_div .rate_to_owner_car .star-ratings"
                          )
                          .eq(0)
                          .children(".star-container")
                          .eq(2)
                          .click()
                          .get(
                            ".modal_box_div .rate_to_owner_car .star-ratings"
                          )
                          .eq(1)
                          .children(".star-container")
                          .eq(2)
                          .click()
                          .get(".rate_to_owner_car textarea")
                          .type("نظر اجاره گیرنده به اجاره دهنده")
                          .get(".rate_buttons .Blue_BTN.submit_submit")
                          .click();
                      });
                  });
              });
          });
      });
  });
});
