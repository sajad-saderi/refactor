import { set_default_date_for_search } from "../../utils/set_defult_date_for_search";

const date = set_default_date_for_search();
const core_url = "https://core.sepris.com/core";
let unique_id = null;

describe("بررسی صفحه نتایج داینامیک خودرو", () => {
  it("بررسی بخش های مختلف صفحه", () => {
    cy.visit("http://localhost:3000/site-map")
      .request("GET", `${core_url}/landing/list?limit=900`)
      .then((result) => {
        cy
          // .intercept(`/rent/${result.body.items[0].unique_id}`)
          //   .as("go_to_dynamic_page")
          .get(".site_map_page ul")
          .children("li")
          .eq(0)
          .children()
          .click()
          // .wait("@go_to_dynamic_page")
          .then(() => {
            unique_id = result.body.items[0].unique_id;
            cy.url().should(
              "contain",
              `/rent/${result.body.items[0].unique_id}`
            );
          });
      });
  });
  it("بررسی عملکرد صفحه داینامیک", () => {
    cy.visit(`http://localhost:3000/rent/${unique_id | 206}`)
      .get(".landing_dynamic_content")
      .should("exist")
      .request(
        "GET",
        core_url +
          `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=-price&page=1&limit=1`
      )
      .then(() => {
        cy.get(
          ".carCart.HEAP_SearchResult_Card_Car:first-child .card_wrapper .tags_container .location_tag"
        )
          .should("exist")
          .click()
          .url()
          .should("contain", "location_id=1")
          .request(
            "GET",
            core_url +
              `/rental-car/search-for-rent/list?location_id=1&start_date=${date.from_date_form}&end_date=${date.to_date_form}&o=-price&page=1&limit=1&category_id=4`
          )
          .then(() => {
            cy.get(".minimal_filter_tags")
              .click()
              .url()
              .should("not.contain", "location_id=1");
          });
      });
  });
});
