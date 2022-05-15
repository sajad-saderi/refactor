import { ISvg } from '../../../../types';

export const Plus = ({ color, height, width }: ISvg) => (
  <svg
    fill={color}
    viewBox='0 0 512 512'
    height={height}
    width={width}
    xmlns='http://www.w3.org/2000/svg'>
    <path d='M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z'></path>
  </svg>
);
