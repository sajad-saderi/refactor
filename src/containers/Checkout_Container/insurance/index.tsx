import { useState } from "react";
import dynamic from "next/dynamic";
import { dynamicString } from '../../../helpers/dynamicString';
import { supportedLanguages } from "../../../../utils/types";
import { numberChanger } from "../../../../utils/numberChanger";

const Radio = dynamic(() => import("../../../components/form/Radio"));
// import Radio from "../../../components/form/Radio";

// import "./insurance.scss";

const Insurance = (props: IInsurance) => {
  const [value, setValue] = useState(2);
  return (
    <Radio
      name='has_insurance'
      SelectHandler={(i) => {
        setValue(i);
        props.hasInsurance(i);
      }}
      defaultCheck={value}
      data={[
        {
          label: numberChanger(dynamicString([props.insurance_price.toLocaleString()], props.language.CHECKOUT.insuranceBooking.option1.label),props.locale),
          // this text will shown under the radio button
          extra_text:
            props.language.CHECKOUT.insuranceBooking.option1.text,
          value: 2,
        },
        {
          label: props.language.CHECKOUT.insuranceBooking.option2.label,
          extra_text: props.language.CHECKOUT.insuranceBooking.option2.text,
          value: 1,
        },
      ]}
    />
  );
};

interface IInsurance {
  // set the insurance status in parent component
  hasInsurance: any;
  insurance_price: number;
  language: any;
  locale:supportedLanguages
}

export default Insurance;
