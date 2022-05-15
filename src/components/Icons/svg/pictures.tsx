import { ISvg } from '../../../../types';

export const Pictures = ({ color, height, width }: ISvg) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox='0 0 128  128 '>
    <g
      transform='translate(0.000000,128.000000) scale(0.100000,-0.100000)'
      fill={color}
      stroke='none'>
      <path
        d='M406 1158 c-20 -29 -20 -34 4 -58 19 -19 33 -20 395 -20 l375 0 0
-280 0 -280 25 -16 c23 -15 27 -15 50 0 l25 16 0 311 c0 195 -4 318 -10 330
-10 18 -26 19 -430 19 l-419 0 -15 -22z'
      />
      <path
        d='M222 974 c-24 -17 -29 -53 -10 -72 9 -9 109 -12 390 -12 l378 0 0
-276 c0 -171 4 -283 10 -295 12 -22 59 -26 78 -7 9 9 12 96 12 329 0 317 0
318 -22 333 -34 24 -802 24 -836 0z'
      />
      <path
        d='M17 772 c-15 -16 -17 -54 -17 -330 0 -269 2 -313 16 -326 13 -14 66
-16 429 -16 l414 0 15 22 c24 33 24 613 0 646 l-15 22 -413 0 c-387 0 -414 -1
-429 -18z m773 -327 l0 -245 -345 0 -345 0 0 245 0 245 345 0 345 0 0 -245z'
      />
    </g>
  </svg>
);
