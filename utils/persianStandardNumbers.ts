export const persianNumbers = (str: string) => {
  if (str === '') return '';
  str = str.replace(/[۱]/g, '1');
  str = str.replace(/[۲]/g, '2');
  str = str.replace(/[۳]/g, '3');
  str = str.replace(/[۴]/g, '4');
  str = str.replace(/[۵]/g, '5');
  str = str.replace(/[۶]/g, '6');
  str = str.replace(/[۷]/g, '7');
  str = str.replace(/[۸]/g, '8');
  str = str.replace(/[۹]/g, '9');
  str = str.replace(/[۰]/g, '0');
  return str;
};
