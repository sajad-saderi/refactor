import { ISvg } from '../../../../types';
export const Star = ({ color, height, width }: ISvg) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 13 13'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M6.5 10.4955L10.517 12.8513L9.451 8.41132L13 5.42395L8.3265 5.03869L6.5 0.851318L4.6735 5.03869L0 5.42395L3.549 8.41132L2.483 12.8513L6.5 10.4955Z'
      fill={color}
    />
  </svg>
);
