import { set_default_date_for_search } from "../utils/set_defult_date_for_search";

// "چک کردن تاریخ در باکس های تاریخ رفت و برگشت، شامل: مقدار تاریخ، فاصله 3 روزه بین انها و نمایش مقدار در در هردو باکس"
const date = set_default_date_for_search();

describe("تست یو-آی صفحه خانه", () => {
  const core_url = "https://core.sepris.com/core";
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("چک کردن متن های مهم صفحه و دو شماره تلفن فوتر", () => {
    // .........................
    // PAGE TITLE
    cy.window()
      .should("have.property", "document")
      .should("have.property", "title", "سپریس | اجاره آسان خودرو");

    // .........................
    // HEADER
    cy.window()
      .should("have.property", "complete_register")
      .then((result) => {
        if (!result) {
          expect(
            cy
              .get(".Nav>ul li")
              .its("length")
              .should("equal", 11)
          );
        }
      });
    cy.get(".HEAP_Header_Btn_Login a")
      .should("have.attr", "href")
      .and("equal", "/login");
    cy.get(".Logo a")
      .invoke("attr", "href")
      .should("contain", "/");

    // .........................
    // SEARCH BOX AND BANNER
    cy.get("h1").contains("سِپریس، اجاره آسان خودرو");
    cy.get(".Homepage .banner h2").contains(
      "ماشینی که دوست دارید را پیدا کنید و با خیال راحت اجاره کنید."
    );
    cy.get(".search_box form .search_box_div .label").contains(
      "خودرو را کجا تحویل میگیرید؟"
    );
    cy.get(
      ".search_box form .Date_picker_container .date_Input_Container .input_container:nth-of-type(2) .label"
    ).contains("از تاریخ");
    cy.get(
      ".search_box form .Date_picker_container .date_Input_Container .input_container:nth-of-type(3) .label"
    ).contains("تا تاریخ");
    cy.get(".search_box form .search_Btn").contains("جستجو");

    // .........................
    // CONTENT SECTION
    cy.get(".second_container .add_car_section .add_car_custom").contains(
      "ماشین‌تان را اضافه کنید"
    );
    cy.get(".second_container .add_car_section a").contains(
      "تخمین درآمد ماهیانه"
    );
    cy.get(".second_container .add_car_section .add_car_custom")
      .should("have.css", "background-color")
      .and("contain", "rgb(192, 109, 170)");
    cy.get(".second_container .add_car_section .add_car_custom")
      .should("have.attr", "href")
      .and("equal", "/add-car");
    cy.get(".second_container .add_car_section a:last-child").should(
      "have.attr",
      "href",
      "/join-us"
    );

    // .........................
    // FOOTER
    cy.get("footer .plus_border .social_container_footer a:first-child")
      .invoke("attr", "href")
      .should("contain", "https://www.instagram.com/sepris.rent/");
    cy.get("footer .plus_border .social_container_footer a:nth-child(2)")
      .invoke("attr", "href")
      .should("contain", "https://twitter.com/Seprisrent");
    cy.get("footer .plus_border .social_container_footer a:last-child")
      .invoke("attr", "href")
      .should("contain", "https://wa.me/message/C3U7RO7ADABWF1");
    cy.get("a.HEAP_Footer_Link_Phone:first-child").contains("02188567759");
    cy.get("a.HEAP_Footer_Link_Phone:last-child").contains("09391414574");
  });

  // .........................
  // CITY INPUT FUNCTIONALITY
  it("چک کردن باکس شهر ها در فرم جستجو، شامل درخواست شهرها، جستجو در نام شهر ها، کلیک بر روی شهر غیر فعال و بررسی پاپ آپ، کلیک بر روی شهر فعال ", () => {
    cy.request("GET", core_url + "/location/list?brief=1&limit=10").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body)
          .to.have.property("items")
          .length(10);
        cy.get(".search_box form .search_box_div input").click();
        cy.get(
          ".DropDown_container .Locations_list_container .search_input_container input"
        )
          .type("سنندج")
          .get(".DropDown_container .Locations_list_container p")
          .click()
          .get(".Modal")
          .should("be.visible")
          .get(".modal_box_div .p3")
          .contains("وقتی در سنندج فعال شدیم خبرتان می‌کنیم.")
          .get(".text_input_container .input_surround .text_input")
          .type("09380158835")
          .intercept("POST", core_url + "/service-request/new")
          .as("serviceRequestNew")
          .get(".modal_box_div .login_submit")
          .click()
          .wait("@serviceRequestNew")
          .then((result) => {
            expect(result.response.body).to.have.property("success").to.true;
          })
          .get(".Modal")
          .should("not.exist");
        cy.get(".search_box form .search_box_div input").click();
        cy.get(
          ".DropDown_container .Locations_list_container .search_input_container input"
        )
          .type("تهران")
          .get(".DropDown_container .Locations_list_container p")
          .click();
      }
    );

    // .........................
    // DATE PICKER FUNCTIONALITY
    cy.get(
      ".search_box form .Date_picker_container .date_Input_Container .input_container:nth-of-type(2) input"
    )
      .invoke("val")
      .then((text) => {
        expect(text).to.be.equal(date.from_text_form);
      });
    cy.get(
      ".search_box form .Date_picker_container .date_Input_Container .input_container:nth-of-type(3) input"
    )
      .invoke("val")
      .then((text) => {
        expect(text).to.be.equal(date.to_text_form);
      });
  });

  // .........................
  // CLICK ON SEARCH BUTTON FUNCTIONALITY
  it(`چک کردن کلیک بر روی دکمه 'جستجو' و رفتن به صفحه نتایج برای شهر تهران در تاریخ  رفت ${date.from_date_form} و برگشت ${date.to_date_form}برای نمایش 15 تکرار، قیمت زیاد به کم`, () => {
    cy.intercept(
      "GET",
      core_url +
        `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=-price&page=1&limit=15`
    )
      .as("rentalCarList")
      .get(".search_box form .search_Btn")
      .click()
      .url()
      .should(
        "contain",
        `http://localhost:3000/search-result?location_id=1&location_name=%D8%AA%D9%87%D8%B1%D8%A7%D9%86&start_date=${date.from_date_form}&end_date=${date.to_date_form}&price_order=-price&page=1&limit=15`
      )
      .wait("@rentalCarList")
      .then((result) => {
        expect(result.response.statusCode).equal(200);
        cy.wait(2000);
        cy.go("back");
      });
  });
});

// RESPONSIVE
describe("چک کردن سایت در حالت رسپانسیو", () => {
  const core_url = "https://core.sepris.com/core";
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.viewport("iphone-6");
  });
  it("سایز صفحه 375 پیکسل در 667 پیکسل", () => {
    cy.get(".Logo a .car_logo").should("have.css", "display", "none");
    cy.get(".search_box form .search_box_div").should(
      "have.css",
      "width",
      "302px"
    );
    cy.get(".Date_picker_container")
      .click()
      .get(".DatePicker__calendarContainer")
      .should("exist");

    // .........................
    // EMPTY END DATE
    cy.get(".Date_picker_container")
      .click()
      .get(
        ".Calendar__section.-shown .Calendar__weekRow:nth-child(5) div:last-child"
      )
      .trigger("click")
      .get("h1")
      .click()
      .get(".search_box form .search_Btn")
      .click()
      .get(".input_container span")
      .contains("تاریخ پایان را انتخاب کنید");

    // .........................
    // SEARCH FOR SAME DATES
    cy.get(".Date_picker_container")
      .click()
      .get(
        ".Calendar__section.-shown .Calendar__weekRow:nth-child(5) div:last-child"
      )
      .trigger("click")
      .get(".input_container span")
      .contains("تاریخ شروع و پایان نمی‌تواند یکسان باشد");
  });
});
