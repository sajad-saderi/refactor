import { set_default_date_for_search } from "../../utils/set_defult_date_for_search";

const date = set_default_date_for_search();
const core_url = "https://core.sepris.com/core";
let car_id = null;
let car_information = null;

describe("تست صفحه خودرو", () => {
  it(`شروع از صفحه خانه، کلیک بر روی اولین نتیجه برای شهر تهران در تاریخ رفت ${date.from_date_form} و برگشت ${date.to_date_form} قیمت زیاد به کم در صفحه جستجو و رسیدن به صفحه خودرو`, () => {
    cy.visit("http://localhost:3000/")
      .get(".search_box form .search_Btn")
      .click()
      .wait(2000)
      .request(
        "GET",
        core_url +
          `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=-price&page=1&limit=15`
      )
      .then((result) => {
        cy.url().should(
          "contain",
          `http://localhost:3000/search-result?location_id=1&location_name=%D8%AA%D9%87%D8%B1%D8%A7%D9%86&start_date=${date.from_date_form}&end_date=${date.to_date_form}&price_order=-price&page=1&limit=15`
        );
        expect(result.status).equal(200);
        cy.intercept("GET")
          .get(".carCart.HEAP_SearchResult_Card_Car")
          .eq(0)
          .click()
          .url()
          .should("include", "/car/");
        cy.window().then((win) => {
          car_id = win.location.href.split("/car/")[1].split("?")[0];
          cy.request(
            "GET",
            core_url +
              `/rental-car/search-for-rent/get?rental_car_id=${car_id}&start_date=${date.from_date_form}&end_date=${date.to_date_form}`
          ).then((res) => {
            car_information = res.body;
          });
        });
      });
  });
});
describe("وجود به طور مستقیم به صفحه خودرو", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/car/${car_id}`);
  });

  it("بررسی متن های مهم در صفحه خودرو", () => {
    cy.get(".extra_info")
      .contains(
        "هزینه را بعد از پذیرش درخواست توسط مالک خودرو پرداخت خواهید کرد."
      )
      .get(".Blue_BTN.localClass.HEAP_Car_Btn_Continue")
      .contains("ادامه");
  });
  it("بررسی اسلایدر", () => {
    if (cy.get(".NAVIGA.arrow-right").should("exist")) {
      cy.get(".carousel_container .carousel_FrontImage")
        .eq(0)
        .should("have.class", "carousel_FrontImage false false")
        .get(".NAVIGA.arrow-right")
        .should("exist")
        .click()
        .get(".carousel_container .carousel_FrontImage")
        .eq(0)
        .should("have.class", "TranslateLeft")
        .get(".carousel_container .carousel_FrontImage")
        .eq(1)
        .should("not.have.class", "TranslateRight")
        .get(".NAVIGA.arrow-left")
        .click();
      cy.get(".FullScreen")
        .should("exist")
        .get(".carousel_container .carousel_FrontImage")
        .eq(0)
        .click()
        .get(".Gallery_Container")
        .should("exist")
        .get(".thumbnail_part img")
        .eq(1)
        .click()
        .get(".show_part img")
        .eq(1)
        .should("not.have.class", "TranslateRight")
        .get(".closeButton")
        .click()
        .get(".Gallery_Container")
        .should("not.exist")
        .get(".NavBotton span")
        .eq(1)
        .click()
        .should("have.class", "activeDot")
        .and("have.css", "background-color", "rgb(17, 107, 152)")
        .get(".NAVIGA.arrow-left")
        .click();
    }
  });
  it("بررسی اطلاعات خودرو", () => {
    if (car_information.with_driver) {
      cy.get(".driver_container .tag_class")
        .eq(0)
        .contains("با راننده");
      if (car_information.without_driver) {
        cy.get(".driver_container .tag_class")
          .eq(1)
          .contains("بدون راننده");
      }
    } else if (car_information.without_driver) {
      cy.get(".driver_container .tag_class")
        .eq(0)
        .contains("بدون راننده");
    }
    if (car_information.is_audited) {
      cy.get(".isverified_container ").should("exist");
    }
    if (car_information.deliver_at_renters_place) {
      cy.get(".car_delivery p").should("have.length", 2);
      if (car_information.location.parent_id === 1) {
        cy.get(".car_delivery p")
          .eq(1)
          .contains("تهران");
      }
    }
    if (car_information.discount_percent) {
      cy.get(".discount_part").should("exist");
    }
    if (car_information.extra_hour_price) {
      cy.get(".hour_limitation_penalty ").should("exist");
    }
    if (car_information.rate.avg_rate) {
      cy.get(".rate_container").should("exist");
    }
    if (!car_information.owner.username && !car_information.owner.company_name)
      cy.get(".profile_anchor_tag_container").should(
        "have.attr",
        "href",
        `/user/${car_information.owner.id}`
      );
  });
});

describe("بررسی صفحه خودرو در سایز 360 پیکسل", () => {
  beforeEach(() => {
    car_id = 229;
    cy.visit(`http://localhost:3000/car/${car_id}`);
    cy.viewport(360, 660);
  });
  it("بررسی اجزا صفحه در ریسپانسیو", () => {
    cy.get(".continue_to_checkout").should("have.css", "position", "fixed");
    cy.get(".carousel_container").should("have.css", "width", "343px");
    cy.get(".calender_section_mobile_view").should(
      "have.css",
      "display",
      "block"
    );
    cy.get(".go_to_profile p").should("contain", "مشاهده");
    cy.get(
      ".Car_page_container .carInfo_container .calender_section_mobile_view .Rent_date .change_date_in_car_page"
    )
      .click()
      .get(".calender_section_mobile_view .search_box_div .DatePicker")
      .click()
      .get(
        ".calender_section_mobile_view .Calendar .Calendar__sectionWrapper .-shown .Calendar__weekRow:nth-last-child(2) .Calendar__day:last-child"
      )
      .trigger("click")
      .get(".calender_section_mobile_view .search_box_div .DatePicker")
      .click()
      .get(".Calendar__monthArrowWrapper.-left")
      .trigger("click")
      .wait(1000)
      .get(
        ".calender_section_mobile_view .Calendar .Calendar__sectionWrapper .-shown .Calendar__weekRow:first-child .Calendar__day:last-child"
      )
      .trigger("click")
      .get(".date_Input_Container.PushToRight")
      .should("not.exist");
  });
});
