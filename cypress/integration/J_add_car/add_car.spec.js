import log_me_in from "../../utils/log_me_in";
import random_number_generator from "../../utils/random_number_generator";
let home = "http://localhost:3000";

describe("ثبت خودرو جدید، ویرایش آن", () => {
  it("ثبت خودرو جدید", () => {
    // cy.setCookie("user_id", `${user_info?.user_profile?.id}`);
    // cy.setCookie("token", user_info?.token);
    // cy.setCookie("first_name", "Cypress_io");
    cy.visit(home);
    log_me_in(Cypress.env("CELL_A"))
      .wait(2000)
      .get(".second_container .add_car_section a:last-child")
      .click();
    click_on_input_and_search(".car_location_district")
      .type("اراک")
      .get(".resultList .Items")
      .eq(0)
      .click()
      .get(".DropDown_container label")
      .should("not.contain", "محله");
    click_on_input_and_search(".car_location_district")
      .type("تهران")
      .get(".resultList .Items")
      .eq(0)
      .click();
    click_on_input_and_search(".car_location_district + .DropDown_container ")
      .type("جیحون")
      .get(".resultList .Items")
      .eq(0)
      .click();
    click_on_input_and_search(
      ".Car_info_step_1 .DropDown_container:nth-of-type(1)"
    )
      .type("ایران")
      .get(".resultList .Items")
      .eq(0)
      .click();
    click_on_input_and_search(
      ".Car_info_step_1 .DropDown_container:nth-of-type(2)"
    )
      .type("تیپ")
      .get(".resultList .Items")
      .eq(0)
      .click();
    cy.get(".radio_father").should("not.exist");
    click_on_input_and_search(
      ".Car_info_step_1 .DropDown_container:nth-of-type(2)"
    )
      .type("وانت")
      .get(".resultList .Items")
      .eq(0)
      .click();
    cy.get(".Car_info_step_1 .DropDown_container:nth-of-type(3)")
      .click()
      .get(".resultList .Items")
      .eq(0)
      .click();
    cy.get(".Car_info_step_1 + .DropDown_container ")
      .click()
      .get(".resultList .Items")
      .eq(0)
      .click();
    cy.get(".value_container input")
      .type(10000000)
      .blur()
      .get(".value_container .input_tail_content")
      .contains("10 میلیون تومان")
      .get(".value_container .input_error_message")
      .should("exist");
    cy.get(".value_container input")
      .clear()
      .type(120000000)
      .blur()
      .get(".value_container .input_tail_content")
      .contains("120 میلیون تومان");

    cy.get(".Fourth_part_pelak input").type(random_number_generator(0, 10, 2));
    cy.get(".Third_part_pelak input").type(random_number_generator(0, 10, 3));
    cy.get(".Second_part_pelak")
      .click()
      .get(".resultList .Items")
      .eq(random_number_generator(0, 15, 1))
      .click();
    cy.get(".First_part_pelak input").type(random_number_generator(0, 10, 2));
    cy.get(".show_more_facilities_button")
      .click()
      .get(".check_box_container .container")
      .eq(12)
      .click()
      .get(".check_box_container .container")
      .eq(2)
      .click()
      .get(".check_box_container .container")
      .eq(20)
      .click();
    cy.get(".colorPicker_container .input_wrapper ")
      .click()
      .get(".resultList .Items")
      .eq(0)
      .click();

    cy.get(".text_area_step_1")
      .type("تست توضیحات اضافه کردن خودرو")
      .get(".Blue_BTN.local_style.HEAP_AddCar_Btn_Submit")
      .click();
    cy.wait(5000)
      .get(".custom_input_container_step_2.daily_price_container input")
      .type("300000")
      .get(
        ".custom_input_container_step_2.daily_price_container .input_tail_content"
      )
      .should("contain", "300 هزار  تومان")
      .get(
        ".custom_input_container_step_2.DropDown_extra_km .DropDown_container "
      )
      .click()
      .get(".resultList .Items")
      .eq(2)
      .click()
      .get(
        " .custom_input_container_step_2.DropDown_extra_km + .custom_input_container_step_2.extra_km_price_container input"
      )
      .clear()
      .type(3000)
      .get("[name=extra_hour_price]")
      .clear()
      .type(30000)
      .get(".counter_container [data-test-id=add]")
      .click()
      .click()
      .get(".counter_container [data-test-id=remove]")
      .click()
      .click()
      .get(".driver_satus .radio_container ")
      .eq(2)
      .click()
      .get(".add_new_one.HEAP_SetCarAndTiming_Btn_AddDiscount")
      .click()

      .get(".Discount_Controller .containers .DropDown_container ")
      .click()
      .get(".resultList .Items")
      .eq(5)
      .click()
      .get(".tail.containers input")
      .type(50)
      .get(".divs.button_box .confirm")
      .click()
      .get(".add_new_one.HEAP_SetCarAndTiming_Btn_AddDiscount")
      .click()

      .get(".Discount_Controller .containers .DropDown_container ")
      .click()
      .get(".resultList .Items")
      .eq(2)
      .click()
      .get(".tail.containers input")
      .type(50)
      .get(".divs.button_box .confirm")
      .click()
      .get(".Discount_list .discount_item_container")
      .should("have.length", 2)
      .get(".cancelation_items_container .container")
      .eq(0)
      .click()
      .get(".cancelation_items_container .container")
      .eq(3)
      .click()
      .get(".anchorTagInStep2")
      .click()
      .get(".Modal")
      .should("exist")
      .get(".back_draw")
      .click({ force: true })
      .get(".Blue_BTN.local_style.HEAP_SetCarTiming_Btn_Submit")
      .click()
      .wait(8000)
      .get(".carcard:first-child .HEAP_Profile_Btn_EditCarDetails")
      .click()
      .wait(3000)
      .url()
      .should("contain", "&mode=edit")
      .get(".car_location_district .input_wrapper")
      .click()
      .get(".resultList .Items")
      .eq(10)
      .click()
      .get(".Blue_BTN.local_style.HEAP_AddCar_Btn_Submit")
      .click()
      .wait(3000)
      .url()
      .should("contain", "/user")
      .get(".carcard:first-child .HEAP_Profile_Btn_ChangeCarTiming ")
      .click()
      .wait(3000)
      .url()
      .should("contain", "/set-car-timing")
      .get("[name=price_per_day]")
      .type(500000)
      .get(".Blue_BTN.local_style.HEAP_SetCarTiming_Btn_Submit")
      .click();
    //   .get(".HEAP_Profile_Btn_Delete")
    //   .click();
    // cy.on("window:confirm", () => true)
    //   .get(".Profile_car_container .carcard")
    //   .should("not.exist");
  });
});

const click_on_input_and_search = (input_name) => {
  return cy
    .get(input_name)
    .click()
    .get(`${input_name} .resultList input`);
};
