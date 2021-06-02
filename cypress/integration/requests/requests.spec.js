import log_me_in from "../../utils/log_me_in";
import random_number_generator from "../../utils/random_number_generator";

const core_url = "https://core.sepris.com/core";
let home = "http://localhost:3000";
let user_info = null;
let cell_phone = Cypress.env("CELL_A");

describe("بررسی صفحه پروفایل کاربری", () => {
  beforeEach(() => {
    cy.visit(home);
  });
  it("لاگین یورز و ورود به صفحه سفارش ها", () => {
    log_me_in(cell_phone).then(() => {
      cy.request({
        method: "POST",
        url: `${core_url}/device/login`,
        form: true,
        body: {
          cell: cell_phone,
          code: "9931",
        },
      }).then((data) => {
        user_info = data.body;
        cy.get(".HEAP_Header_Link_MyOrders")
          .click()
          .wait(2500)
          .get(".orders_tabs p:first-child")
          .should("have.class", "active")
          .and("contain", "رزروهای اخیر")
          .get(".active + p")
          .click()
          .get(".orders_tabs p:first-child")
          .should("not.have.class", "active")
          .get(".first_element_li")
          .click()
          .wait(3000)
          .get(".HEAP_Profile_Btn_OutOfService")
          .click();
      });
    });
  });
});
