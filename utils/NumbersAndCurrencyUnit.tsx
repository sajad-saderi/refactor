import { supportedLanguages } from './types';

let initialValue = 0;
let outGoingString = "";
let unit = "";

const NumbersAndCurrencyUnit = (props: IProps) => {
  initialValue = typeof props.value === "string" ? +props.value : props.value;
  if (initialValue === 0) return "";
  outGoingString = "";
  unit = "";
  CheckingTheNumber(initialValue, props.locale);
  let polishTheOutGoing = outGoingString.replace(/(\s)(?!$)/g, props.locale === 'fa' ? " و " : ' and ');

  return polishTheOutGoing.replace(/_/g, " ");
};

const CheckingTheNumber = (value, locale) => {
  let slicedString = null;

  switch (true) {
    case value < 10:
      outGoingString += `${value}`;
      break;
    case value / 10 >= 1 && value / 10 < 10:
      outGoingString += `${value}`;
      break;
    case value / 100 >= 1 && value / 100 < 10:
      slicedString = `${value}`.slice(0, 3);
      outGoingString += `${slicedString}`;
      initialValue = +slicedString;
      break;
    case value / 1000 >= 1 && value / 1000 < 1000:
      slicedString = `${value}`.slice(0, -3);
      outGoingString += locale === 'fa' ? `${slicedString}_هزار ` : `${slicedString}_Thousand `;
      initialValue = +`${value}`.slice(-3);
      if (initialValue > 0) {
        CheckingTheNumber(initialValue, locale);
      }
      break;
    case value / 1000000 >= 1 && value / 1000000 < 1000:
      slicedString = `${value}`.slice(0, -6);
      outGoingString += locale === 'fa' ? `${slicedString}_میلیون ` : `${slicedString}_Million `;
      initialValue = +`${value}`.slice(-6);
      if (initialValue > 0) {
        CheckingTheNumber(initialValue, locale);
      }
      break;
    case value / 1000000000 >= 1 && value / 1000000000 < 1000:
      slicedString = `${value}`.slice(0, -9);
      outGoingString += locale === 'fa' ? `${slicedString}_میلیارد ` : `${slicedString}_Billion `;
      initialValue = +`${value}`.slice(-9);
      if (initialValue > 0) {
        CheckingTheNumber(initialValue, locale);
      }
      break;
    default:
      console.log("Some thing is Wrong!");
      break;
  }
};

interface IProps {
  value: string | number;
  locale: supportedLanguages
}

export default NumbersAndCurrencyUnit;
