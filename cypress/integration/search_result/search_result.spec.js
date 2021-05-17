import { get } from "js-cookie";
import { set_default_date_for_search } from "../utils/set_defult_date_for_search";

describe("تست صفحه نتایج جستجو", () => {
  const core_url = "https://core.sepris.com/core";
  const date = set_default_date_for_search();
  let filter_label_value = null;
  beforeEach(() => {
    cy.visit(
      `http://localhost:3000/search-result?location_id=1&location_name=%D8%AA%D9%87%D8%B1%D8%A7%D9%86&start_date=${date.from_date_form}&end_date=${date.to_date_form}&price_order=-price&page=1&limit=15`
    );
  });
  it("تست های نتیجه درخواست های لیست برندها، لیست شهر ها، نتیجه جستجو", () => {
    // .........................
    // بررسی درخواست برای لیست شهر ها
    cy.request("GET", core_url + `/location/list?limit=1&brief=1`).then(
      (response) => {
        expect(response.status).equal(200);
        expect(response.body.items).to.have.length(1);
      }
    );

    // .........................
    // بررسی درخواست برای لیست برندها
    cy.request("GET", core_url + `/brand/list?limit=1`).then((response) => {
      console.log(response.body);
      expect(response.status).equal(200);
      expect(response.body.items).to.have.length(1);
    });

    // .........................
    // نمایش 15 کارت در نتایج جستجو
    cy.wait(7000)
      .get(
        ".search_result_section.minHeight .carCart.HEAP_SearchResult_Card_Car"
      )
      .its("length")
      .should("equal", 15)
      .get(".count_bar_count")
      .and("contain", date.from_date_form.slice(-2))
      .and("contain", date.to_date_form.slice(-2));

    // .........................
    //   نوار بالای صفحه خودرو
    cy.get(".change_search_btn")
      .contains("تغییر جستجو")
      .click()
      .contains("بستن")
      .get(".new_search_in_landing.show_search_section")
      .should("exist")
      .get(".new_search_in_landing.show_search_section .input_wrapper input")
      .should("have.attr", "value")
      .and("equal", "تهران");

    // .........................
    // کلیک بر روی دکمه جستجو در بخش تغییر جستجو
    cy.intercept(
      "GET",
      core_url +
        `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=-price&page=1&limit=15`
    )
      .as("rentalCarList")
      .get(".Blue_BTN.search_Btn.HEAP_Home_Btn_Search")
      .click()
      .url()
      .should(
        "contain",
        `http://localhost:3000/search-result?location_id=1&location_name=%D8%AA%D9%87%D8%B1%D8%A7%D9%86&start_date=${date.from_date_form}&end_date=${date.to_date_form}&price_order=-price&page=1&limit=15`
      )
      .wait("@rentalCarList")
      .then((result) => {
        expect(result.response.statusCode).equal(200);
      });

    // .........................
    //   فیلتر های نوار بالای صفحه، کم به زیاد و برعکس و دکمه جستجو بیشتر
    cy.get(".price_sort_container span")
      .eq(0)
      .should("have.class", "active")
      .intercept(
        "GET",
        core_url +
          `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=price&page=1&limit=15`
      )
      .as("change_the_price_order")
      .get(".price_sort_container span")
      .eq(1)
      .click()
      .wait("@change_the_price_order")
      .then(() => {
        cy.url().should("contain", `&price_order=price&page=1&limit=15`);
      });

    cy.get(".rent-options .check_box_container")
      .eq(0)
      .click()
      .wait(7000)
      .get(".rent-options .check_box_container")
      .eq(1)
      .click()
      .wait(7000)
      .url()
      .should("contain", "&deliver_at_renters_place=1&with_driver=1")
      .then(() => {
        cy.get(".minimal_filter_tags")
          .eq(0)
          .should("exist")
          .contains("تحویل در محل")
          .click()
          .wait(7000)
          .get(".minimal_filter_tags")
          .should("exist")
          .contains("اجاره همراه راننده")
          .click()
          .wait(7000)
          .url()
          .should("not.contain", "&deliver_at_renters_place=1&with_driver=1")
          .get(".minimal_filter_tags")
          .should("not.exist");
      });
    cy.wait(7000)
      .get(".body_style_type_wrapper .check_box_container .container")
      .eq(0)
      .click()
      .wait(7000)
      .get(".body_style_type_wrapper .check_box_container .container")
      .eq(1)
      .click()
      .wait(7000)
      .url()
      .should("contain", "&body_style_id=1%2C8")
      .then(() => {
        cy.get(".minimal_filter_tags")
          .eq(0)
          .should("exist")
          .contains("سواری")
          .click()
          .wait(7000)
          .get(".minimal_filter_tags")
          .should("exist")
          .contains("کراس‌اوور")
          .click()
          .wait(7000)
          .url()
          .should("not.contain", "&body_style_id=1%2C8")
          .get(".minimal_filter_tags")
          .should("not.exist");
      });

    cy.wait(6000)
      .get(".DropDown_container.Disable_Container")
      .should("exist")
      .get(
        ".body_style_type_wrapper + .DropDown_container .input_wrapper.hideInput_wrapper"
      )
      .click()
      .get(
        " .body_style_type_wrapper + .DropDown_container .Locations_list_container .search_input_container input"
      )
      .type("ایران")
      .get(".resultList p")
      .click()
      .wait(7000)
      .url()
      .should(
        "contain",
        "&brand_name=%D8%A7%DB%8C%D8%B1%D8%A7%D9%86-%D8%AE%D9%88%D8%AF%D8%B1%D9%88&brand_id=90"
      )
      .get(".DropDown_container.Disable_Container")
      .should("not.exist")
      .get(".filter_section .DropDown_container:last-child")
      .click()
      .get(
        ".filter_section .DropDown_container:last-child .Locations_list_container .search_input_container input"
      )
      .type("سمند")
      .get(".resultList p")
      .eq(1)
      .click()
      .wait(7000)
      .get(".minimal_filter_tags")
      .should("contain", "سمند")
      .wait(5000)
      .get(".minimal_filter_tags")
      .click()
      .wait(7000)
      .get(".minimal_filter_tags")
      .should("contain", "ایران")
      .click()
      .wait(7000)
      .get(".minimal_filter_tags")
      .should("not.exist")
      .url()
      .should(
        "not.contain",
        "&brand_name=%D8%A7%DB%8C%D8%B1%D8%A7%D9%86-%D8%AE%D9%88%D8%AF%D8%B1%D9%88&brand_id=90"
      );

    // .........................
    //   بررسی فیلتر قیمت
    cy.wait(7000)
      .get(".rc-slider-handle.rc-slider-handle-1")
      .trigger("mousedown", { force: true, button: 0 })
      .trigger("mousemove", { force: true, button: 0, pageX: 900, pageY: 0 })
      .trigger("mouseup", { force: true, button: 0 })
      .window()
      .then((win) => {
        filter_label_value = win.document.querySelector(".minimal_filter_tags")
          .textContent;
        cy.url().should(
          "contain",
          `&min_price=${filter_label_value.split(" ")[2].replace(/,/g, "")}`
        );
        cy.intercept(
          "GET",
          core_url +
            `/rental-car/search-for-rent/list?location_id=1&start_date=${
              date.from_date_form
            }&end_date=${
              date.to_date_form
            }&o=price&page=1&limit=15&min_price=${filter_label_value
              .split(" ")[2]
              .replace(/,/g, "")}&max_price=${filter_label_value
              .split(" ")[0]
              .replace(/,/g, "")}`
        )
          .as("remove_filter_price")
          .get(".minimal_filter_tags")
          .click()
          .then(() => {
            cy.url().should("not.contain", `&min_price=`);
          });
      });
  });
  it("بررسی کارت خودرو", () => {
    let first_card_list =
      ".search_result_section.minHeight .carCart.HEAP_SearchResult_Card_Car:first-child";
    cy.request(
      "GET",
      core_url +
        `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=-price&page=1&limit=1`
    ).then((result) => {
      const car_info = result.body.items[0];
      expect(result.status).equal(200);
      if (car_info.total_discount_percent > 0)
        cy.get(`${first_card_list} .discount_badge`).should("exist");
      if (car_info.is_promoted)
        cy.get(`${first_card_list} .Special`).should("exist");
      if (car_info.deliver_at_renters_place)
        cy.get(`${first_card_list} .tags_container`).contains("تحویل در محل");
      if (car_info.has_media)
        cy.get(`${first_card_list} figure`)
          .should("have.css", "background-image")
          .and("contain", "https://core.sepris.com/");
      else
        cy.get(`${first_card_list} figure`)
          .should("have.css", "background-image")
          .and("not.contain", "https://core.sepris.com/");
    });
  });
  it("بررسی منو در سایز 960 پیکسل", () => {
    cy.viewport(960, 500)
      .get(".show_filter")
      .should("have.css", "display", "block")
      .and("contain", "جستجوی پیشرفته")
      .click()
      .get(".filter_section")
      .should("have.class", "filter_section show_Filter_section")
      .get(".result_count_wrapper")
      .should("exist")
      .get(".Close_filter")
      .click()
      .get(".filter_section")
      .should("not.have.class", "filter_section show_Filter_section")
      .get(".show_filter")
      .click()
      .get(".with_drawer")
      .click()
      .get(".filter_section")
      .should("not.have.class", "filter_section show_Filter_section");
  });
  it("بررسی منو در سایز 320 پیکسل", () => {
    cy.viewport(375, 700);
    cy.wait(7000)
      .get(".quick_access_child_container")
      .should("exist")
      .get(".HEAP_Search_Result_Quick_Access_SUV")
      .click()
      .url()
      .should("contain", "&body_style_id=2")
      .get(".HEAP_Search_Result_Quick_Access_Economy")
      .should("not.exist")
      .get(".minimal_filter_tags")
      .click()
      .reload()
      .wait(7000)
      .get(".HEAP_Search_Result_Quick_Access_Economy")
      .click()
      .wait(7000)
      .url()
      .should("contain", "&max_price=1000000")
      .get(".minimal_filter_tags")
      .click();
  });
  it("دکنه بیشتر در سایز دستکتاپ", () => {
    cy.viewport(1000, 660);
    cy.wait(7000)
      .get(".Load_more_car.HEAP_SearchResult_Btn_ShowMore")
      .click()
      .wait(7000)
      .get(".quick_access_middle_searchResult")
      .should("have.css", "display", "none")
      .get(
        ".search_result_section.minHeight .carCart.HEAP_SearchResult_Card_Car"
      )
      .its("length")
      .should("equal", 30);
  });
});
