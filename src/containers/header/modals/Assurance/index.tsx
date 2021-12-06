import React, { useContext } from "react";
import Button from "../../../../components/form/Button";
import Modal_context from "../../../../context/Modal_context";

const Assurance = ({ language }) => {
  const MODAL_CONTEXT = useContext(Modal_context);

  return (
    <div className='modal_box_div'>
      <h2>{language.CAR_SETTING.requirements}</h2>
      <div className='modal_scroll_section'>
        <p>
          {language.CAR_SETTING.assurance.text1}
        </p>
        <ul>
          <li>
            {language.CAR_SETTING.assurance.text2}
          </li>
          <li>
            {language.CAR_SETTING.assurance.text3}
          </li>
          <li>
            {language.CAR_SETTING.assurance.text4}
          </li>
          <li>
            {language.CAR_SETTING.assurance.text5}
          </li>
          <li>
            {language.CAR_SETTING.assurance.text6}
          </li>
          <li>
            {language.CAR_SETTING.assurance.text7}
          </li>
        </ul>
      </div>
      <Button
        loading={false}
        value='بستن'
        class='Blue_BTN local_Style'
        click={() => MODAL_CONTEXT.modalHandler()}
      />
    </div>
  );
};

export default Assurance;
