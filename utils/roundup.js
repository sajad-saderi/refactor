const roundup = (number) => {
  let coefficient = 1;
  let decimal = -1;
  let divided = 0;

  // removing the decimal part in the number
  if (number % 1 > 0) {
    number = Math.trunc(number);
  }

  // bigger than 10M
  if (number / 10000000 >= 1) {
    coefficient = 1000000;
    divided = number / 1000000;
    if (getDesimal(divided) <= 0.5) {
      number = +`${parseInt(divided)}500000`;
    } else {
      number = +`${parseInt(divided) + 1}000000`;
    }
  }
  // bigger than 1M
  else if (number / 1000000 >= 1) {
    coefficient = 100000;
    divided = number / 1000000;
    if (getDesimal(divided) <= 0.5) {
      number = +`${parseInt(divided)}500000`;
    } else {
      number = +`${parseInt(divided) + 1}000000`;
    }
  }
  // bigger than 100K
  else if (number / 100000 >= 1) {
    coefficient = 1000;
    divided = number / 100000;
    if (getDesimal(divided) <= 0.5) {
      number = +`${parseInt(divided)}50000`;
    } else {
      number = +`${parseInt(divided) + 1}00000`;
    }
  }
  // bigger than 10K
  else if (number / 10000 >= 1) {
    coefficient = 1000;
    divided = number / 10000;
    if (getDesimal(divided) <= 0.5) {
      number = +`${parseInt(divided)}5000`;
    } else {
      number = +`${parseInt(divided) + 1}0000`;
    }
  }
  // less than 10K
  else {
    coefficient = 1000;
    divided = number / 1000;
    if (getDesimal(divided) <= 0.5) {
      number = +`${parseInt(divided)}500`;
    } else {
      number = +`${parseInt(divided) + 1}000`;
    }
  }
  return number;
};

const getDesimal = (floatNumber) => +`0.${`${floatNumber}`.split(".")[1]}`;

export default roundup;
