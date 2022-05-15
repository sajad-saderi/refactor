import { ISvg } from '../../../../types';
export const Reject = ({ color, height, width }: ISvg) => (
  <svg
    fill={color}
    viewBox='0 0 24 24'
    height={height}
    width={width}
    xmlns='http://www.w3.org/2000/svg'>
    <path d='M3 8.41l9 9 7-7V15h2V7h-8v2h4.59L12 14.59 4.41 7 3 8.41z'></path>
  </svg>
);
