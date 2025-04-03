import * as React from "react";
const SVGComponent = props => (
  <svg
    fill="#000000"
    width="10px"
    height="10px"
    viewBox="0 0 24 24"
    id="down"
    data-name="Flat Color"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-color"
    {...props}
  >
    <path
      id="primary"
      d="M19.71,13.29a1,1,0,0,0-1.42,0L13,18.59V3a1,1,0,0,0-2,0V18.59l-5.29-5.3a1,1,0,0,0-1.42,1.42l7,7a1,1,0,0,0,1.42,0l7-7A1,1,0,0,0,19.71,13.29Z"
      style={{
        fill: "rgb(0, 0, 0)",
      }}
    />
  </svg>
);
export default SVGComponent;
