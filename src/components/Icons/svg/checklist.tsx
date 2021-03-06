export const Checklist = ({ color, height, width }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 12 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.8332 2.08331H6.58317V3.24998H11.8332V2.08331ZM11.8332 6.74998H6.58317V7.91665H11.8332V6.74998ZM2.2315 4.41665L0.166504 2.35165L0.989004 1.52915L2.22567 2.76581L4.699 0.29248L5.5215 1.11498L2.2315 4.41665ZM2.2315 9.08331L0.166504 7.01831L0.989004 6.19581L2.22567 7.43248L4.699 4.95915L5.5215 5.78165L2.2315 9.08331Z"
      fill={color}
    />
  </svg>
);
