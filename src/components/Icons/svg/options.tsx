import { ISvg } from '../../../../types';

export const Options = ({ color, height, width }: ISvg) => (
  <svg
    stroke={color}
    fill={color}
    strokeWidth='0'
    viewBox='0 0 512 512'
    height={height}
    width={width}
    xmlns='http://www.w3.org/2000/svg'>
    <path d='M299.3 376c6.2-14.1 20.3-24 36.7-24s30.5 9.9 36.7 24H448c8.8 0 16 7.2 16 16s-7.2 16-16 16h-75.3c-6.2 14.1-20.3 24-36.7 24s-30.5-9.9-36.7-24H64c-8.8 0-16-7.2-16-16s7.2-16 16-16h235.3zM139.3 240c6.2-14.1 20.3-24 36.7-24s30.5 9.9 36.7 24H448c8.8 0 16 7.2 16 16s-7.2 16-16 16H212.7c-6.2 14.1-20.3 24-36.7 24s-30.5-9.9-36.7-24H64c-8.8 0-16-7.2-16-16s7.2-16 16-16h75.3zM299.3 104c6.2-14.1 20.3-24 36.7-24s30.5 9.9 36.7 24H448c8.8 0 16 7.2 16 16s-7.2 16-16 16h-75.3c-6.2 14.1-20.3 24-36.7 24s-30.5-9.9-36.7-24H64c-8.8 0-16-7.2-16-16s7.2-16 16-16h235.3z'></path>
  </svg>
);
