const SVGComponent = (props) => (
  <svg
    width={10}
    height={10}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.52832 8.47168L8.47169 1.52832M1.52832 1.52832L8.47169 8.47168"
      stroke="#060606"
      strokeOpacity={0.5}
      strokeWidth={1.25}
      strokeLinecap="round"
    />
  </svg>
);
export default SVGComponent;
