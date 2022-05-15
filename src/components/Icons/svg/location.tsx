import { ISvg } from '../../../../types';

export const Location = ({ color, height, width }: ISvg) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 9 12'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M4.2 0C1.878 0 0 1.878 0 4.2C0 7.35 4.2 12 4.2 12C4.2 12 8.4 7.35 8.4 4.2C8.4 1.878 6.522 0 4.2 0ZM1.2 4.2C1.2 2.544 2.544 1.2 4.2 1.2C5.856 1.2 7.2 2.544 7.2 4.2C7.2 5.928 5.472 8.514 4.2 10.128C2.952 8.526 1.2 5.91 1.2 4.2Z'
      fill={color}
    />
    <path
      d='M4.2 5.7C5.02843 5.7 5.7 5.02843 5.7 4.2C5.7 3.37157 5.02843 2.7 4.2 2.7C3.37157 2.7 2.7 3.37157 2.7 4.2C2.7 5.02843 3.37157 5.7 4.2 5.7Z'
      fill={color}
    />
  </svg>
);
