export const Shield = ({ color, height, width }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 11 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.25 0L0 2.33333V5.83333C0 9.07083 2.24 12.0983 5.25 12.8333C8.26 12.0983 10.5 9.07083 10.5 5.83333V2.33333L5.25 0ZM5.25 6.41083H9.33333C9.02417 8.81417 7.42 10.955 5.25 11.6258V6.41667H1.16667V3.09167L5.25 1.2775V6.41083Z"
      fill={color}
    />
  </svg>
);
