const core_url = "https://core.sepris.com/core";

describe("بررسی صفحه نقشه سایت", () => {
  it("بررسی کلیک روی لینک موجود در صفحه و سالم بودن لینک ها", () => {
    cy.visit("http://localhost:3000/site-map")
      .request("GET", `${core_url}/landing/list?limit=900`)
      .then((result) => {
        cy.get(".site_map_page ul")
          .children("li")
          .eq(0)
          .children()
          .should("contain", `${result.body.items[0].title}`)
          .should("have.attr", "href")
          .and("eq", `/rent/${result.body.items[0].unique_id}`);

        cy
          // .intercept(`/rent/${result.body.items[0].unique_id}`)
          // .as("go_to_dynamic_page")
          .get(".site_map_page ul")
          .children("li")
          .eq(0)
          .children()
          .click()
          // .wait("@go_to_dynamic_page")
          .then((intercept) => {
            cy.url().should(
              "contain",
              `/rent/${result.body.items[0].unique_id}`
            );
          });
      });
  });
});
