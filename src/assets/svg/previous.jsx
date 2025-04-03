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
      d="M17.5002 12L6.50024 12M6.50024 12L11.0885 16M6.50024 12L11.0885 8"
      stroke="#060606"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
