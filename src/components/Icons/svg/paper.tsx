import { ISvg } from "../../../../types";

export const Paper = ({ color, height, width }: ISvg) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 13 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 0H1.6C0.72 0 0.00800018 0.72 0.00800018 1.6L0 14.4C0 15.28 0.712 16 1.592 16H11.2C12.08 16 12.8 15.28 12.8 14.4V4.8L8 0ZM11.2 14.4H1.6V1.6H7.2V5.6H11.2V14.4ZM3.856 8.84L2.72 9.968L5.552 12.8L10.08 8.272L8.952 7.144L5.56 10.536L3.856 8.84Z"
      fill={color}
    />
  </svg>
);
