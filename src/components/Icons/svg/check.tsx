import { ISvg } from '../../../../types';
export const Check = ({ color, height, width }: ISvg) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 11 9'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M3.84378 7.16366L1.35702 4.67689L0.513184 5.52072L3.84378 8.85132L11 1.69515L10.1561 0.851318L3.84378 7.16366Z'
      fill={color}
    />
  </svg>
);
