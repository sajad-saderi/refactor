import React, { useEffect, useState } from "react";
import insurance from "../../../../public/image/SamanInsurance.png";
import Link from "next/link";
import { guard_controller } from "../../../../utils/guard_controller";

const Join_us_content_AB_test = ({
  AbText,
  language,
}: IJoin_us_content_AB_test) => {
  const [authorize, set_authorize] = useState(true);

  useEffect(() => {
    const guard = guard_controller();
    if (guard !== "auth") {
      set_authorize(false);
    }
  }, []);

  return (
    <>
      <div className='insuranceBox'>
        <p>{language.insuranceBox_p}</p>
        <img src={insurance} alt={language.insuranceBox_image} />
      </div>
      <div className=' responsive second_container'>
        <div className='full_width'>
          <h2>{language.full_width_h2}</h2>
          <p>{language.full_width_p}</p>
        </div>
        <h2>{language.second_container_h2}</h2>
        <div className='three_columns'>
          <section>
            <h3>{language.three_columns_h3_1}</h3>
            <p>{language.three_columns_p_1}</p>
          </section>
          <section>
            <h3>{language.three_columns_h3_2}</h3>
            {/* <p>
              با خیال راحت کسب درآمد کنید. بیمه اجاره خودرو بابت خسارت‌های
              احتمالی به شما اطمینان خاطر خواهد داد.
            </p> */}
            <p>{language.three_columns_p_2}</p>
          </section>
          <section>
            <h3>{language.three_columns_h3_3}</h3>
            <p>{language.three_columns_p_3}</p>
          </section>
        </div>
        <div
          className='add_car_section'
          onClickCapture={() => {
            if (!authorize) {
              localStorage["last_location"] = "/add-car";
            }
          }}
        >
          {/* <Link href={authorize ? "/add-car" : "/login"}>
            <a className='Blue_BTN add_car_custom HEAP_joinUs_Btn_AddCar'>
              {AbText}
            </a>
          </Link> */}
          <Link href={"/add-car"}>
            <a className='Blue_BTN add_car_custom HEAP_joinUs_Btn_AddCar'>
              {AbText}
            </a>
          </Link>
          {/* <p className="call_us">
            سوالی دارید؟ با ما تماس بگیرید:‌{" "}
            <a className="TellPhone" href="tel:02188567759">
              ۰۲۱۸۸۵۶۷۷۵۹{" "}
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
};

interface IJoin_us_content_AB_test {
  AbText: string;
  language: any;
}
export default Join_us_content_AB_test;
