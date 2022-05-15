import { ISvg } from '../../../../types';

export const Pencil = ({ color, height, width }: ISvg) => (
  <svg
    fill={color}
    viewBox='0 0 512 512'
    height={height}
    width={width}
    xmlns='http://www.w3.org/2000/svg'>
    <path d='M64 368v80h80l235.727-235.729-79.999-79.998L64 368zm377.602-217.602c8.531-8.531 8.531-21.334 0-29.865l-50.135-50.135c-8.531-8.531-21.334-8.531-29.865 0l-39.468 39.469 79.999 79.998 39.469-39.467z'></path>
  </svg>
);
