import log_me_in from "../utils/log_me_in";
import { set_default_date_for_search } from "../utils/set_defult_date_for_search";

const date = set_default_date_for_search();
const core_url = "https://core.sepris.com/core";
let home = "http://localhost:3000";
let search_id = null;
let user_info = 0;
let cell_phone = "09380000000";

describe("بررسی صفحه تکمیل ثبت نام", () => {
  it("لاگین کاربر و تکمیل ثبت نام", () => {
    cy.visit(home);
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
        cy.url()
          .should("contain", "/complete-register")
          .get(".complete_register_form [name=first_name]")
          .type("Cypress")
          .get(".complete_register_form [name=last_name]")
          .type("io")
          .get(".company_part")
          .click()
          .get(".company_part [name=company_name]")
          .type("Cypress_co")
          .get(".Blue_BTN.local_BTN.HEAP_CompleteRegister_Btn_Submit")
          .click()
          .get(".company_part span")
          .click()
          .should("not.exist")
          .get(".Blue_BTN.local_BTN.HEAP_CompleteRegister_Btn_Submit")
          .click()
          .get(".Error_message_text")
          .should("exist")
          .get(".check_box_container label")
          .click()
          .get(".Blue_BTN.local_BTN.HEAP_CompleteRegister_Btn_Submit")
          .click();
      });
    });
  });
  it("ثبت خودرو جدید", () => {
    cy.visit(`${home}/add-car`);
  });
});
