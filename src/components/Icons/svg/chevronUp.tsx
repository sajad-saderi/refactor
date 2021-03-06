import { ISvg } from "../../../../types";

export const ChevronUp = ({ color, height, width, rotate }:ISvg) => (
  <svg
    strokeWidth={0}
    style={{ transform: `rotate(${rotate | 0}deg)` }}
    viewBox="0 0 512 512"
    height={height}
    width={width}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M147.6 301.3c-7.5-7.5-7.5-19.8 0-27.3l95.7-95.4c7.3-7.3 19.1-7.5 26.6-.6l94.3 94c3.8 3.8 5.7 8.7 5.7 13.7 0 4.9-1.9 9.9-5.6 13.6-7.5 7.5-19.7 7.6-27.3 0l-81-79.8-81.1 81.9c-7.5 7.5-19.7 7.5-27.3-.1z"></path>
  </svg>
);
