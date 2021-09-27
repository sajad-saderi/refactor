import language from "../../../public/languages/fa/homepage.json";
import insurance from "../../../public/image/SamanInsurance.png";
import Recommendation_section_owl from "../recommendation_section/recommendation_section_owl";
import Link from "next/link";

const ContentHomePage = ({
  auth,
  differentStyle,
  extraContent,
}: IContentHomePage) => (
  <div className="responsive second_part_container">
    <div
      className={["insuranceBox", differentStyle ? "marginFromTop" : ""].join(
        " "
      )}
    >
      <p>با همکاری بیمه‌های اتومبیل سامان</p>
      <img src={insurance} alt="تصویر بیمه سامان" width="115" height="47" />
    </div>
    <div className="second_container">
      <h2>{language.second_container_full_width_h2}</h2>
      <div className="full_width">
        <p>{language.second_container_full_width_p}</p>
      </div>
      <h2>{language.second_container_h2_2}</h2>
      <div className="three_columns">
        <section>
          <h3>{language.second_container_three_columns_2_h3_1}</h3>
          <p>{language.second_container_three_columns_2_p_1}</p>
        </section>
        <section>
          <h3>{language.second_container_three_columns_2_h3_2}</h3>
          <p>{language.second_container_three_columns_2_p_2}</p>
        </section>
        <section>
          <h3>{language.second_container_three_columns_2_h3_3}</h3>
          <p>{language.second_container_three_columns_2_p_3}</p>
        </section>
      </div>
      <Recommendation_section_owl />
      <h2>{language.second_container_h2_1}</h2>
      <div className="three_columns">
        <section>
          <h3>{language.second_container_three_columns_h3_1}</h3>
          <p>{language.second_container_three_columns_p_1}</p>
        </section>
        <section>
          <h3>{language.second_container_three_columns_h3_2}</h3>
          <p>{language.second_container_three_columns_p_2}</p>
        </section>
        <section>
          <h3>{language.second_container_three_columns_h3_3}</h3>
          <p>{language.second_container_three_columns_p_3}</p>
        </section>
      </div>
      <div
        className="add_car_section"
        onClickCapture={() => {
          if (!auth) {
            localStorage["last_location"] = "/add-car";
          }
        }}
      >
        {/* <Link href={authorize ? "/add-car" : "/login"}>
        <a className='Blue_BTN add_car_custom'>
          {language.second_container_add_car_section_a_1}
        </a>
      </Link> */}
        <Link href="/join-us" prefetch={false}>
          <a className="Blue_BTN add_car_custom">
            {language.second_container_add_car_section_a_2}
          </a>
        </Link>
        <Link href="/add-car" prefetch={false}>
          <a>{language.second_container_add_car_section_a_1}</a>
        </Link>
        {extraContent && extraContent}
      </div>
    </div>
  </div>
);

interface IContentHomePage {
  auth: boolean;
  differentStyle?: boolean;
  extraContent?: any;
}

export default ContentHomePage;
