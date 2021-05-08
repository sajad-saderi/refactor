const log_me_in = (cell_phone) =>
  cy
    .get(".HEAP_Header_Btn_Login")
    .click()
    .wait(3000)
    .then(() => {
      expect(localStorage.getItem("last_location")).to.eq("/");
      cy.get(".input_surround input")
        .type(cell_phone)
        .get(
          ".Blue_BTN.login_submit.HEAP_ModalGetUserCellPhone_Btn_RequestForConfirmCode "
        )
        .click()
        .get(".separated_places .text_input.data-hj-allow")
        .type(9931)
        .get(".Blue_BTN.login_submit.HEAP_ModalConfirmCode_Btn_Login ")
        .click();
    });
export default log_me_in;
