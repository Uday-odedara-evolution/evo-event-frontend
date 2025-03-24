import * as React from "react";
const SVGComponent = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17 9.5L12 14.5L7 9.5"
      stroke="#060606"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;
