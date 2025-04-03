import * as React from "react";
const SVGComponent = props => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.50037 12H17.5004M17.5004 12L12.9121 8M17.5004 12L12.9121 16"
      stroke="#060606"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
