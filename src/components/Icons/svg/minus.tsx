import { ISvg } from '../../../../types';

export const Minus = ({ color, height, width }: ISvg) => (
  <svg
    fill={color}
    viewBox='0 0 512 512'
    height={height}
    width={width}
    xmlns='http://www.w3.org/2000/svg'>
    <path d='M96 235h320v42H96z'></path>
  </svg>
);
