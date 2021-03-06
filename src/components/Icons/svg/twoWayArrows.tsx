import { ISvg } from '../../../../types';
export const TwoWayArrows = ({ color, height, width }: ISvg) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 16 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M3.54667 5.96242L0 9.51798L3.54667 13.0735V10.4069H9.77778V8.62909H3.54667V5.96242ZM16 4.18464L12.4533 0.629089V3.29576H6.22222V5.07353H12.4533V7.7402L16 4.18464Z'
      fill={color}
    />
  </svg>
);
