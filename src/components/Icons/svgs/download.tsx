export const Download = ({
  width,
  height,
  color,
}: {
  width: string;
  height: string;
  color: string;
}) => (
  <svg
    stroke={color}
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height={width}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);
