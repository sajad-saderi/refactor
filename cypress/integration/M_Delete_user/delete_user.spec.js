const core_url = "https://core.sepris.com/core";
let home = "http://localhost:3000";
let user_info = null;
let token = null;
let user_id = null;
let cell_phone_A = Cypress.env("CELL_A");
let cell_phone_B = Cypress.env("CELL_B");
describe("پاک کردن یوزر", () => {
  it("", () => {
    cy.visit(home)
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
            user_id = result.body.user_profile.id;
            cy.request({
              method: "POST",
              url: `${core_url}/user/purge`,
              form: true,
              body: {
                id: user_id,
              },
              headers: {
                Authorization: "Bearer " + token,
              },
            }).then(() => {
              cy.log("کاربر 09000000000 پاک شد");
            });
          });
      });
  });
  it("", () => {
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
            user_id = result.body.user_profile.id;
            cy.request({
              method: "POST",
              url: `${core_url}/user/purge`,
              form: true,
              body: {
                id: user_id,
              },
              headers: {
                Authorization: "Bearer " + token,
              },
            }).then(() => {
              cy.log("کاربر 09000000001 پاک شد");
            });
          });
      });
  });
});
