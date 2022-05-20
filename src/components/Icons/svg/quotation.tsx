import { ISvg } from "../../../../types";

export const Quotation = ({ color, height, width }: ISvg) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 0 24 24"
    width={width}
  >
    <path
      fill={color}
      d="M5 17h3l2-4V7H4v6h3l-2 4zm10 0h3l2-4V7h-6v6h3l-2 4z"
    />
  </svg>
);
