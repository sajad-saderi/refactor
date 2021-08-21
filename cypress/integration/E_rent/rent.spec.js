describe("بررسی صفحه اجاره", () => {
  //   beforeEach("http://localhost:3000/rent");
  it("بررسی بخش های مختلف صفحه", () => {
    cy.visit(`${Cypress.env("DEV_HOME")}rent`)
      .title()
      .should("eq", "اجاره ماشین، اجاره خودرو، لیست قیمت کرایه ماشین | سپریس")
      .get(".banner h1")
      .should("contain", "لیست قیمت اجاره ماشین در سپریس")
      .get(".banner h2")
      .should("contain", "ماشینی که دوست دارید را با خیال راحت اجاره کنید.")
      .get("[data-test-id=QA_schema]")
      .should("have.attr", "itemtype", "https://schema.org/FAQPage")
      .children("div")
      .eq(0)
      .children(".QuestionPart")
      .should("have.class", "activeQA")
      .click()
      .should("not.have.class", "activeQA")
      .get("[data-test-id=QA_schema]")
      .children("div")
      .eq(1)
      .click()
      .children(".QuestionPart")
      .should("have.class", "activeQA");
    cy.get("[data-test-id=rent_add_car]")
      .should("have.attr", "href", "/join-us")
      .get(".second_container .add_car_section a:last-child")
      .should("have.attr", "href", "/add-car")
      .click()
      // .intercept("/login")
      // .as("login")
      // .wait("@login")
      .wait(3000)
      .then(() => {
        cy.url().should("contain", "/login");
        // .go("back")
        // .go("back")
        // .get("[data-test-id=rent_join_us]")
        // .should("have.attr", "href", "/join-us");
      });
  });
});
