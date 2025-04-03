import * as React from "react";
const SVGComponent = ({ stroke = "#060606" }) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 12H8"
      stroke={stroke}
      strokeOpacity={0.5}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M18 7L6 7"
      stroke={stroke}
      strokeOpacity={0.5}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <path
      d="M10 17L14 17"
      stroke={stroke}
      strokeOpacity={0.5}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);
export default SVGComponent;
