import { ISvg } from "../../../../types";
export const CarOptions = ({ color, height, width }: ISvg) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 14 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M7.25013 9.0546V14.8547H13.0502V9.0546H7.25013ZM0 14.8547H5.8001V9.0546H0V14.8547ZM0 1.80447V7.60457H5.8001V1.80447H0ZM9.90005 0.851074L5.8001 4.95465L9.90005 9.0546L14 4.95465L9.90005 0.851074Z'
      fill={color}
    />
  </svg>
);
