import { ISvg } from '../../../../types';
export const FlashBack = ({ color, height, width }: ISvg) => (
  <svg
    fill={color}
    viewBox='0 0 24 24'
    height={height}
    width={width}
    xmlns='http://www.w3.org/2000/svg'>
    <path d='M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z'></path>
  </svg>
);
