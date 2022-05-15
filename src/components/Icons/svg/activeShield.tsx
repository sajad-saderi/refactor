import { ISvg } from '../../../../types';
export const ActiveShield = ({ color, height, width }: ISvg) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 18 22'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9 0L0 4V10C0 15.55 3.84 20.74 9 22C14.16 20.74 18 15.55 18 10V4L9 0ZM16 10C16 14.52 13.02 18.69 9 19.93C4.98 18.69 2 14.52 2 10V5.3L9 2.19L16 5.3V10ZM4.41 10.59L3 12L7 16L15 8L13.59 6.58L7 13.17L4.41 10.59Z'
      fill={color}
    />
  </svg>
);
