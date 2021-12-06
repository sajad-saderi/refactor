import log_me_in from "../../utils/log_me_in";
import random_number_generator from "../../utils/random_number_generator";

const core_url = "https://core.sepris.com/core";
let home = Cypress.env("DEV_HOME");
let user_info = 0;
let cell_phone = Cypress.env("CELL_A");

describe("بررسی صفحه پروفایل کاربری", () => {
  beforeEach(() => {
    cy.visit(home);
  });
  it("لاگین کاربر و ثبت اطلاعات کاربر", () => {
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
        cy.wait(2000)
          .get(".first_element_li")
          .click()
          .get(".Profile_info_container .user_information p ")
          .click()
          .get(".change_image_container + .text_input_container input")
          .clear()
          .type("form test")
          .get(".Blue_BTN.local_class")
          .click()
          .wait(3000)
          .get(".first_element_li")
          .click()
          .get(".Profile_info_container .user_information p ")
          .click()
          .get(".change_image_container + .text_input_container input")
          .clear()
          .type("Cypress_")
          .get(".Blue_BTN.local_class")
          .click()
          .wait(3000)
          .get(".first_element_li")
          .click()
          // .get(".back_draw")
          // .click({ force: true })
          .get(".carcard:first-child .HEAP_Profile_Btn_EditCarDetails")
          .click()
          .wait(3000)
          .url()
          .should("contain", "/add-car")
          .go("back")
          .wait(2000)
          .get(".carcard:first-child .HEAP_Profile_Btn_ChangeCarTiming ")
          .click()
          .wait(3000)
          .url()
          .should("contain", "/set-car-timing")
          .go("back")
          .get(".Blue_BTN.HEAP_Profile_Btn_AddCar")
          .click()
          .wait(2000)
          .url()
          .should("contain", "/add-car")
          .go("back")
          .wait(3000)
          .get(".carcard:last-child [data-test-id=OUT_OF_SERVICE]")
          .click()
          .get(".toast_div")
          .should("exist")
          // .get(".carcard:first-child .HEAP_Profile_Btn_Delete")
          // .click()
          .get(".HEAP_Profile_Btn_OutOfService")
          .click()
          .wait(2000)
          // cy.on("window:confirm", () => true)
          //   .get(".Profile_car_container .carcard")
          //   .should("not.exist")
          .get(".Exit")
          .click();
      });
    });
  });
});
