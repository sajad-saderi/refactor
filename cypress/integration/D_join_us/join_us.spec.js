describe("تست های صفحه به ما بپیوندید", () => {
  const core_url = "https://core.sepris.com/core";
  beforeEach(() => {
    cy.visit(`${Cypress.env("DEV_HOME")}join-us`);
  });

  it("بررسی متن های صفحه", () => {
    cy.get(".banner h1").contains("سِپریس، برای اوقات فراغت ماشین شما");
    cy.get(".banner> h2").contains(
      "به راحتی خودروتان را در سِپریس کوتاه مدت اجاره بدهید و درآمد کسب کنید"
    );
    cy.get(".calculator_container h2").contains(
      "چقدر می‌توانید از ماشینتان کسب درآمد کنید؟"
    );
    cy.get(".calculator_container .local_Button_joinUs").contains(
      "تخمین درآمد"
    );
    cy.get(".Blue_BTN.add_car_custom.HEAP_joinUs_Btn_AddCar").contains(
      "شروع کسب درآمد"
    );
  });
  it("بررسی باکس ماشین حساب", () => {
    cy.get(
      ".calculator_dropDown .Disable_Container [data-test-id=drop_down_input]"
    )
      .should("be.disabled")
      .get(".Blue_BTN.local_Button_joinUs")
      .click()
      .get(".error_Field")
      .should("contain", "سازنده را انتخاب کنید");
    cy.get(".calculator_container form .calculator_dropDown:first-child ")
      .click()
      .intercept("GET", core_url + "/car/list?limit=800&brand_id=90")
      .as("get-model-list")
      .get("[data-test-id=search_input]")
      .type("ایران")
      .get("[data-test-id=Items]")
      .eq(0)
      .click()
      .wait("@get-model-list")
      .then(() => {
        cy
          // .get(".calculator_container form .calculator_dropDown:first-child + div")
          //   .click()
          //   .get("[data-test-id=Items]")
          //   .eq(0)
          // .click()
          .get(".Blue_BTN.local_Button_joinUs")
          .click()
          .get(".error_Field")
          .should("contain", "نام مدل را انتخاب کنید")
          .get(
            ".calculator_container form .calculator_dropDown:first-child + div"
          )
          .click()
          .get("[data-test-id=Items]")
          .eq(0)
          .click()
          .get(".Blue_BTN.local_Button_joinUs")
          .click()
          .get("[data-test-id=input_error_message]")
          .should("contain", "ارزش خودرو را وارد کنید")
          .get(".value_container  input")
          .type("۱۰۰۰۰۰۰۰۰");
      });
    cy.intercept("POST", core_url + "/rent-price-estimation-request/new")
      .as("rent-price-estimation-request")
      .get(".Blue_BTN.local_Button_joinUs")
      .click()
      .wait("@rent-price-estimation-request")
      .then(() => {
        cy.get(".CalculatorResult")
          .should("exist")
          .get(".CalculatorResult .eachSvgBox .CalcH3")
          .contains("۱.۱")
          .get(".addCar_top_joinus_a")
          .should("exist")
          .should("have.attr", "href")
          .and("eq", "/login")
          .get(".add_car_custom.HEAP_joinUs_Btn_AddCar")
          .should("have.attr", "href")
          .and("eq", "/add-car");
      });
  });
  it("بررسی باکس تخمین در سایز 360 پیکسل", () => {
    cy.viewport(360, 660)
      .get(".calculator_container form .calculator_dropDown:first-child")
      .should("have.css", "width", "289px")
      .get(".value_container")
      .should("have.css", "width", "289px")
      .get(".calculator_container form .calculator_dropDown:first-child + div")
      .should("have.css", "width", "289px")
      .get(".Blue_BTN.local_Button_joinUs")
      .should("have.css", "width", "289px")
      .get(".calculator_container form .calculator_dropDown:first-child")
      .click()
      .intercept("GET", core_url + "/car/list?limit=800&brand_id=90")
      .as("get-model-list-responsive")
      .get("[data-test-id=search_input]")
      .type("ایران")
      .get("[data-test-id=Items]")
      .eq(0)
      .click()
      .wait("@get-model-list-responsive")
      .then(() => {
        cy.get(
          ".calculator_container form .calculator_dropDown:first-child + div"
        )
          .click()
          .get("[data-test-id=Items]")
          .eq(0)
          .click()
          .get(".value_container  input")
          .type("۱۰۰۰۰۰۰۰۰")
          .get(".Blue_BTN.local_Button_joinUs")
          .click()
          .get(".tryAgainCalc")
          .click()
          .get(".CalculatorResult")
          .should("not.exist");
      });
  });
});
